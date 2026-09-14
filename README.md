# Simple CBT-I / Simple Fasting Timer / Smart Live Assist

Astroで作成した16言語のサイトと、3アプリで再利用する共通基盤。

EC2 Ubuntu / Nginxへの公開・HTTPS・サイト別ログ・画像差し替えは [deploy/README.md](deploy/README.md) を参照。本番ドメイン、Privacy/Terms、Google Play URLは [deploy/sites.json](deploy/sites.json) で管理する。公開前の未設定項目は `node scripts/production.mjs check` で確認する。

Smart Live Assistの開発は `npm run dev:sla`、ビルドは `npm run build:sla`、出力は `build-sla/`。各アプリに16言語のLPとSupportページを生成する。

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
