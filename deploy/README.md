# EC2 Ubuntu / Nginx 公開・更新

対象は simple-fast.biz / simple-cbt-i.biz / smart-live-assist.biz。EC2への接続・証明書取得・ログの実動作確認はサーバー上で行う。このリポジトリのビルド成功だけではHTTPS設定済みとはならない。

## 公開前の残項目

- `sites.json` の各 `privacyUrl` / `termsUrl` に、運営者が承認した実際のアプリのポリシーURLを設定する。設定後、全言語のフッターとSupportページに表示される。未設定時はリンクを表示しない。規約を捏造した仮ページは生成しない。
- 本文をこのリポジトリでホストする場合は、本文・運営者情報・適用範囲・アプリとWebのデータ取扱いを確定してからページを追加する。アプリのスクリーンショットにある規約の断片だけでは不十分。
- FastのGoogle Playは設定済み。CBT-I / Smart Live Assistはユーザー指示により後回し。`playStoreUrl` を追加して再ビルドすると導線に反映される。
- `node scripts/production.mjs check` は未承認のPrivacy/Termsが残る間、終了コード2を返す。ビルド・技術確認は可能だが、全項目完了を意味しない。

## 初回：既存手順でNode 22・Nginxを導入したEC2

3ドメインのAレコードをEC2のElastic IPに設定。80/443をセキュリティグループで許可。IPv6を構成していない場合はAAAAを置かない。以下はUbuntuのbashで実行。

```bash
cd ~/projects/3lp
git pull --ff-only
bash deploy/update.sh
```

3サイトを正式ドメインでビルド・検証してから公開ファイルを配置する。過去の `/var/www/cbti` などが通常のディレクトリなら保存してシンボリックリンク方式に切り替える。過去リリースは自動削除しない。

### Nginx設定（HTTPS導入前に一度だけ）

```bash
node scripts/production.mjs nginx
sudo install -m 644 deploy/generated/3lp-logging.conf /etc/nginx/conf.d/3lp-logging.conf
sudo install -m 644 deploy/generated/cbti.conf /etc/nginx/sites-available/3lp-cbti
sudo install -m 644 deploy/generated/fast.conf /etc/nginx/sites-available/3lp-fast
sudo install -m 644 deploy/generated/assist.conf /etc/nginx/sites-available/3lp-assist
sudo ln -s /etc/nginx/sites-available/3lp-cbti /etc/nginx/sites-enabled/3lp-cbti
sudo ln -s /etc/nginx/sites-available/3lp-fast /etc/nginx/sites-enabled/3lp-fast
sudo ln -s /etc/nginx/sites-available/3lp-assist /etc/nginx/sites-enabled/3lp-assist
sudo nginx -t && sudo systemctl reload nginx
```

前の手順で `/etc/nginx/sites-enabled/3lp` を作成済みの場合は、この3ファイルを有効化する前にその旧リンクだけを外す。同じserver_nameの設定を重複させない。既にHTTPSを設定済みなら、Certbotが変更した設定を上書きせず、`root`、`access_log`、`error_log` と `log_format` を既存設定へ取り込む。

### HTTPS

DNS反映後、HTTPで3サイトの `/ja/` が表示できることを確認して実行。証明書はサイトごとに分離。

```bash
sudo snap install --classic certbot
sudo /snap/bin/certbot --nginx --redirect -d simple-cbt-i.biz
sudo /snap/bin/certbot --nginx --redirect -d simple-fast.biz
sudo /snap/bin/certbot --nginx --redirect -d smart-live-assist.biz
sudo /snap/bin/certbot renew --dry-run
sudo nginx -t
```

メールアドレスと規約同意はCertbotの対話画面で設定。Certbot導入後に上記HTTPブートストラップを上書きしない。80番ポートはHTTP-01更新に必要。

## 更新

```bash
cd ~/projects/3lp
git pull --ff-only
bash deploy/update.sh
```

Nginx設定の再導入・証明書の再取得は不要。失敗したビルドは公開しない。公開先は `/var/www/3lp-releases/日時-コミット/{cbti,fast,assist}` で、各 `/var/www/{cbti,fast,assist}` を切り替える。古いリリースへのリンク差し替えでロールバック可能。通常ディレクトリからの初回移行時のみ短い切替時間がある。

## サイト別ログ

| サイト | アクセスログ | エラーログ |
|---|---|---|
| Fast | `/var/log/nginx/fast.access.log` | `/var/log/nginx/fast.error.log` |
| CBT-I | `/var/log/nginx/cbti.access.log` | `/var/log/nginx/cbti.error.log` |
| Smart Live Assist | `/var/log/nginx/assist.access.log` | `/var/log/nginx/assist.error.log` |

```bash
sudo tail -f /var/log/nginx/fast.access.log
sudo tail -f /var/log/nginx/cbti.access.log
sudo tail -f /var/log/nginx/assist.access.log
sudo cat /etc/logrotate.d/nginx
sudo logrotate --debug /etc/logrotate.d/nginx
```

UbuntuのNginx既存ローテーションが `/var/log/nginx/*.log` を対象としていることを確認する。独自設定を追加して二重ローテーションしない。アクセスログはIP・時刻・パス・User-Agent等を含む。クエリ文字列とRefererは独自形式で省いているが、エラーログにはリクエスト情報が含まれる場合がある。保持期間と取扱いは確定するPrivacy本文に反映する。

## 本番検証

```bash
for domain in simple-fast.biz simple-cbt-i.biz smart-live-assist.biz; do
  curl -I "http://$domain/ja/"
  curl -I "https://$domain/ja/"
  curl -I "https://$domain/en/support/"
  curl -I "https://$domain/og.png"
  curl -I "https://$domain/favicon.png"
  curl -I "https://$domain/this-page-does-not-exist/"
  curl -fsS "https://$domain/robots.txt"
done
```

期待値：HTTPはHTTPSへ301/308、HTTPS通常ページは200、存在しないページは404。証明書エラーがないこと、上記リクエストが対応するサイトのログへ書き込まれることを確認。ブラウザで16言語の切替と問い合わせフォームへの遷移も確認する。

## 実スクリーンショットの差し替え（7〜14日後）

既存ファイルを同名・同形式で置き換え、GitHubへpush後に更新コマンドを実行。新しいページやCSSは不要。OGPは独立したブランド画像なのでスクショ待ちには依存しない。

| アプリ内 public/screenshots/ | ファイル | 現在の寸法 |
|---|---|---|
| simple-cbt-i | main.jpg / history.jpg / stats.jpg | 720×1560 |
| simple-fasting-timer | timer.png | 876×1800 |
| simple-fasting-timer | history.jpg / stats.jpg / detail.jpg | 720×1560 |
| smart-live-assist | reader.jpg / auto-tap.jpg / guide.jpg / upgrade.jpg | 892×1834 |

寸法比を維持すれば差し替えだけで完了。異なる比率の画像に変える場合は各プレビュー／ギャラリーの `width` / `height` も実寸へ更新し、表示を確認する。画像の配信キャッシュは1時間。差し替え直後の確認にはブラウザの強制再読み込みを使う。

参考： https://nginx.org/en/docs/http/ngx_http_log_module.html ・ https://certbot.eff.org/instructions?os=snap&ws=nginx
