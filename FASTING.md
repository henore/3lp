# Simple Fasting Timer

2本目のAstroサイト。共通の `packages/ui/LandingPage.astro` を両アプリが利用し、セクション順・余白・タイポグラフィ・カード・FAQ・言語切替を共有する。

## 固有の設定

- `packages/config/fasting.ts`: 名前、ブランドカラー、アイコン、Google Play
- `packages/i18n/fasting.ts`: 16言語の製品コピー。共通のナビゲーション等は既存辞書を再利用
- `apps/simple-fasting-timer/src/styles/theme.css`: チャコールとアンバーのテーマ。既存CBT-Iに影響しないブランド固有スタイル
- `apps/simple-fasting-timer/src/components/TimerPreview.astro`: ユーザー提供の実タイマー画面
- `apps/simple-fasting-timer/public/icon.png`: 参照会話に添付された実際のアイコン
- `sites/simple-fasting-timer/hosting.json`: Fasting専用Sites ID。ルートのCBT-IのIDを置換しない

```sh
npm run dev:fast
npm run check:fast
npm run build:fast
npm run verify:fast
node scripts/browser-qa.mjs http://127.0.0.1:4322 fast
```

Fastingの出力は `build/`、CBT-Iは `dist/`。相互に出力を削除しない。両アプリは独立したドメインとサイト情報を使う。

## 反映した製品情報

ユーザー指定の参照会話「断食ダイエットアプリ市場」と、今回提供された参加条件・ストアURLに基づく。

- 食事を長押しで記録し、最後の食事時刻から自動計測
- ゴール到達後もタイマーは継続
- 基本タイマー・通常のゴール通知は無料
- 買い切りPro: カスタムゴール、全履歴・統計、最大3件のゴール前リマインダー、Strong Alert
- 広告なし
- Google Playへ直接案内（テスター募集・参加条件は撤去済み）
- [Google Play](https://play.google.com/store/apps/details?id=com.ohesoft.fast)

参照内で旧価格と新価格が混在していたため、金額は固定表示せずアプリ内価格へ案内。未公開のiOS版の配布リンクは掲載しない。通知の到達保証や減量効果、時間ごとの身体変化は断定しない。

ユーザー提供の実スクリーンショット4枚を加工せず掲載。タイマーをヒーローに、履歴・統計・記録詳細を機能紹介に配置。英語版・撮影時点の表示と価格であることを16言語で明記。画像内のボタンは操作要素ではなく、ギャラリー画像は元画像へのリンク。

## 公開スナップショット

`scripts/prepare-fasting-publish.mjs <new-directory>` は追跡済みソースを公開専用ディレクトリへコピーし、ルートのホスティング設定とbuild/dev/checkの選択だけをFasting用に切り替える。共有コンポーネントの編集元はこのモノレポ1か所。公開用コピーを直接編集して開発しない。

そのコピーから同じアプリをビルド・コミット・pushし、保存したバージョンを非公開で公開する。CBT-Iの既存公開サイトは変更しない。

## 未検証の範囲

ストアからの実インストールは実行していない。ストアURLはユーザー提供値を採用。翻訳は初稿のため、一般公開前の各言語校閲を推奨する。


Google PlayバッジはGoogle Partner Marketing Hubの公式素材を無加工で16言語分保存。出典: https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/?folder=86718
