# 3アプリ共通Webサイト設計

## 採用構成

Astro + TypeScript + npm workspaces。HTMLをビルド時に生成し、Reactなどのクライアントランタイムを必須にしない。アプリごとにAstroのroot、公開先、ドメインを独立させ、共通UIをソース参照する。

```text
apps/
  simple-fasting-timer/   # 2本目: Home、TimerPreview、theme.css
  simple-cbt-i/
    astro.config.mjs
    public/favicon.svg
    src/
      components/{Home,SleepPreview}.astro
      pages/
        index.astro
        [locale]/index.astro
        404.astro
        sitemap.xml.ts
        robots.txt.ts
packages/
  ui/                 # Header、Footer、Seo、FeatureCard、FAQ、StoreCTA、共通CSS
  i18n/               # Locale型、言語名、RTL判定、16言語辞書
  config/             # AppConfig型、ストアURL、テーマ
scripts/verify.mjs    # 全言語・SEO・リンク検証
```

2本目としてSimple Fasting Timerを追加済み。両サイトは `packages/ui/LandingPage.astro` を使用し、サイト構造そのものを共有する。Fasting固有の本文は `packages/i18n/fasting.ts`、設定は `packages/config/fasting.ts`、画面とテーマはアプリ配下に置く。3本目は名称・仕様の確定後に同じ方式で追加する。Seo、Header、Footer、StoreCTAはブランド情報をpropsで切り替える。

## 多言語

ja、en、zh-CN、zh-TW、ko、de、fr、es、it、pt-BR、nl、sv、pl、ru、ar、hi。日本語が初期表示。`/<locale>/` に独立した静的HTMLを生成。`/` は日本語を表示しcanonicalは `/ja/`。言語選択はHTMLリンクなのでJavaScript無効時も利用できる。アラビア語は `dir=rtl` とCSS論理プロパティで対応。日付・時間はIntlで整形。辞書の不足・空文字はビルドを失敗させ、英語への無言のフォールバックはしない。

翻訳は初稿。医療関連の表現を含むため、本番一般公開前には製品担当者と各言語の校閲者による確認を行う。

## SEOとアクセシビリティ

各言語固有のtitle/description、canonical、相互hreflang、x-default、Open Graph、Twitterメタデータ、WebSite JSON-LD、sitemap.xml、robots.txt。配布先・価格・レビューを未確認のため、SoftwareApplicationの評価や価格を捏造しない。独自ドメイン利用時は `SITE_URL` を設定して再ビルドする。

セマンティックHTML、h1は1つ、本文スキップ、ネイティブdetails/summary、focus-visible、44px以上の主要操作領域、reduced-motion、レスポンシブ。FAQと言語メニューはキーボードで操作可能。本文16px以上。本文以外のサブ情報は12px以上。WCAG 2.2 AAを目標とし、自動検査と目視確認を実施するが、第三者認証を意味しない。

## 運用・追加サイト

1. `apps/simple-cbt-i`を新しいアプリrootへ複製し、固有コンテンツ・ブランド設定を変更する。
2. 共有UIは `packages/ui` を再利用。各appは独立した設定オブジェクトを渡す。
3. ビルド例：`npx astro build --root apps/<app-slug>`。出力先はサイトごとに個別指定する。
4. CIは `apps/<app>/` と共有packagesの変更を検知。共有packages変更時は全サイトをビルドする。
5. 各言語のSEO・リンク・表示を検査し、それぞれのホスティング先へ公開する。

## 現在の製品情報

Simple CBT-Iの正式機能、ロゴ、実画面、ストアURL、運営者情報は未提供。このためサイトにレビュー用であることを明記し、紹介文は確認前の案、画面はサンプルデータと表示している。CTAはダウンロード案内セクションへ移動し、未確認リンクは出さない。正式なURLは `packages/config/app.ts` のstoresへ設定すればストアリンクが表示される。運営者の未確認の個人情報保護方針や利用規約を勝手に作成しない。

技術実装と公式情報の確定を区別する。本番一般公開の完成条件：正式な機能・スクリーンショット・配布リンク・運営者と法務文言の確定、翻訳校閲、レビュー用表示の解除。

参考：Astro公式 i18n https://docs.astro.build/en/guides/internationalization/
