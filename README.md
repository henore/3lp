# Simple CBT-I / Shared app websites

Astroで作成した16言語のサイトと、3アプリで再利用する共通基盤。

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
```

Node.js 22推奨。プレビューは起動時に表示されるURLを開く。静的出力はルートのdist。SITE_URLを指定するとcanonical、hreflang、sitemapがそのドメインで生成される。

設計・追加サイト手順・正式公開までの確認事項はARCHITECTURE.mdを参照。QA結果はQA.mdに記載。
