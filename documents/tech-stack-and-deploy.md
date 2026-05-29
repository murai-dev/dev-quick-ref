# 技術選定とデプロイ

## 方針

- 最終成果物は静的HTML、CSS、JavaScriptにする
- 実装はVite + TypeScriptを基本にする
- UIはブラウザ内の軽いDOM操作で完結させる
- サーバー側の実行処理は持たない
- 本番配信はCloudflare Pagesを第一候補にする

## この構成を選ぶ理由

- ランニングコストを抑えやすい
- サーバー保守が不要で運用が軽い
- GitHubの更新だけで本番反映しやすい
- ページ数が増えても静的配信のまま拡張できる

## 構成要素

- **GitHub**: ソースコードの保管場所
- **Vite**: 開発サーバーと本番ビルド
- **TypeScript**: 実装の安全性と保守性を上げる
- **Cloudflare Pages**: 静的ホスティングと自動デプロイ

## デプロイ手順

1. GitHubにソースコードをpushする
2. Cloudflare PagesがmainブランチをCIしてビルドする（`npm run build` を実行）
3. 生成された静的ファイルをそのまま配信する
4. 問題があればCloudflare Pagesのビルドログを確認する

## ローカル開発の流れ

1. 依存関係をインストールする（`npm install`）
2. 開発サーバーで動作確認する（`npm run dev`）
3. 変更をコミットしてGitHubへpushする
4. Pagesの自動デプロイ結果を確認する

## アクセス解析

- Cloudflare Web Analyticsを採用する
- Cloudflare PagesのMetricsから有効化する
- まずはページビュー、参照元、流入キーワードを確認する
- ローカル開発のアクセスは集計対象から外す

## Cloudflare Pages デプロイ手順

1. Cloudflareアカウントを作成する
2. GitHubリポジトリをCloudflare Pagesに連携する
3. ビルドコマンドを `npm run build`、出力ディレクトリを `dist` に設定する
4. mainブランチへのpushで自動デプロイが走ることを確認する
5. 初回デプロイ成功後、PagesのMetricsからWeb Analyticsを有効化する
6. 独自ドメインを取得した場合はPagesに割り当てる

## 多言語展開（将来）

Phase 1 は英語のみ。将来的に多言語展開が必要になった場合は handy-tools-hub の `generate-i18n.js` アプローチを参考にする。
