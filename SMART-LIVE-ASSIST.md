# Smart Live Assist

3本目のAstroサイト。共通LandingPage、ナビゲーション、FAQ、SEOを再利用し、紫のブランドテーマと実画面を使用。

参照: ユーザー指定の会話「サブスク売上予測」と今回の画像。訴求はAndroidのみ・PC/OBS不要、コメントTTS、対応言語の自動翻訳、IRIAM Auto Tap。Liteは買い切り、Globalは月額。画像と参照会話で価格・試用期間が異なるため固定の価格と日数は掲載せずアプリ内を案内。

Webサイトは共通の16言語。アプリの対応16言語は英語、日本語、韓国語、簡体字、繁体字、スペイン語、ブラジルポルトガル語、フランス語、ドイツ語、イタリア語、タイ語、ベトナム語、インドネシア語、ヒンディー語、アラビア語、ロシア語であり、Webの言語セットとは異なる。

Google Play URLはユーザー回答により未定。packages/config/sla.ts の stores.google で接続可能。現在は募集や仮URLを表示しない。既存のGooglePlayBadgeコンポーネントを利用する場合は、公式16言語バッジをこのアプリのpublicにも配置しgoogleBadgeを有効化する。

実画面はReaderをヒーロー、Auto Tap・Guide・Upgradeを機能紹介に使用。Terms/Legal画面は条文の全体が写っておらず、法務ページの代用にはしない。画面中の価格やトライアルは撮影時点と明記。スクリーンショットは無加工。

npm run dev:sla / check:sla / build:sla / verify:sla

出力: build-sla。サイト専用設定: sites/smart-live-assist/hosting.json。公開用コピー: node scripts/prepare-sla-publish.mjs 新しいディレクトリ。

翻訳は初稿。実アプリの動作確認やストア配布の確認は行っていない。
