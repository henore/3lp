# 検証結果

- Astro 5.18.2 / Node.js 22.12.0で静的ビルド成功。16言語、ルート日本語、404の計18 HTMLページを生成。
- Astro check: エラー0、警告0（アプリ内のAstroファイル）。
- 全16言語のlang/dir、h1、hreflang、title/description、canonical、OG、JSON-LD、内部アンカー、ローカルアセット、サイトマップ、robotsを検証。
- Chrome/Playwright: 全16言語を375pxと1440pxで確認し、横はみ出しなし。
- 日本語・英語・アラビア語 × 2画面幅: axe-coreのWCAG A/AA検査で違反0。
- FAQのEnter開閉、言語切り替え、Escapeで言語メニューを閉じる操作、アラビア語RTL、CTAの移動を確認。
- 日本語375px幅でルート文字サイズ200%に拡大し、横はみ出しなし。
- ブラウザー実行エラー0。日本語のPC/モバイル画面を目視確認。

自動検査はアクセシビリティ適合認証ではない。実機Safari、スクリーンリーダー、翻訳ネイティブ校閲は未実施。

## このWindows環境の再実行

この環境ではesbuildの親フォルダー探索にOS権限制限があったため、作業フォルダーだけを一時的に空いているドライブ文字へ割り当ててビルドした。通常環境ではREADMEのnpmコマンドを使う。

Astroの匿名テレメトリーは実行時に `ASTRO_TELEMETRY_DISABLED=1` として停止。Google Fontsへの外部リクエストを使用するため、配信ポリシーに応じてフォントを自己ホストに変更可能。Windowsのプレビュー環境でスタイルの取り込みを安定させるため、共有CSSをHTMLのstyleへビルド時に埋め込んでいる。

Sitesのbuild-site.mjsはこのWindows環境でnpm実行パスの解決に失敗したため、同じbuildスクリプトをnpm run buildで直接実行した。
