# Simple CBT-I + Simple Fasting Timer / Shared app websites

Astroで作成した16言語のサイトと、3アプリで再利用する共通基盤。

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify
```

Node.js 22推奨。プレビューは起動時に表示されるURLを開く。静的出力はルートのdist。SITE_URLを指定するとcanonical、hreflang、sitemapがそのドメインで生成される。

設計・追加サイト手順・正式公開までの確認事項はARCHITECTURE.mdを参照。CBT-IのQA結果はQA.mdに記載。

Simple Fasting Timerの起動は `npm run dev:fast`、ビルドは `npm run build:fast`、型検査は `npm run check:fast`、静的検証は `npm run verify:fast`。Fastingの出力はbuild/で、CBT-Iのdist/と分離している。

両アプリはpackages/ui/LandingPage.astroを共有。ブランド・本文・画面イメージだけを各アプリから渡す。Fastingの仕様・公開手順はFASTING.md、検証結果はQA-FASTING.mdを参照。
