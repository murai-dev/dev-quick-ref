# SEO Playbook — dev-quick-ref

このドキュメントは、本番公開後の継続的SEO施策の全体フローをまとめたチェックリスト兼実行手順です。目的は検索流入の安定向上、インデックス品質の改善、主要指標（CTR / Organic sessions / CWV）の継続的改善です。

## 1. 目標とKPI
- 目的: オーガニック流入の増加と検索上位維持
- 主要KPI: オーガニックセッション数、平均掲載順位、CTR、Core Web Vitals (LCP, FID/INP, CLS)、インデックス数（Search Console）
- 測定頻度: 週次（CWV/Lighthouse）、日次（GSCカバレッジ・エラー）

## 2. 必要ツール
- Google Search Console / Bing Webmaster
- Google Analytics 4（GA4）
- Lighthouse（CLIまたはCI）、PageSpeed Insights
- サイトクロール: Screaming Frog / Sitebulb / open-source crawler
- キーワード調査・トレンド: Google Trends / Google Keyword Planner / Ahrefs / SEMrush
- Rank-tracking（Ahrefs/SEMrush/SerpApi等）
- ログ解析ツール（サーバーログ）
- CI: Git + デプロイフロー（現状: Vite ビルド → デプロイ）

## 2.5 サイト立ち上げ前の検討（Pre-launch checklist）
リリース前に検討・実施しておくとローンチ後のトラブルが減り、インデックスや検索結果改善の初動が良くなります。

- ドメイン設計とURL構造の方針（正規化、サブドメイン vs サブディレクトリ）
- 主要キーワード調査とコンテンツマップ（ピラー/クラスタ設計）
   - 検索ボリューム調査: 需要があるテーマを優先するため
   - ロングテール調査: 競合が弱く意図が明確な流入を狙うため
   - 検索意図の確認: 情報収集/比較/実行など意図に合うページ形式にするため
   - キーワード難易度の確認: 短期で勝てるテーマと中長期テーマを分けるため
- サイトマップ（自動生成仕様）と robots.txt の事前確認
- サーバー設定とレスポンスヘッダ（gzip/HTTP/2/キャッシュ、CSP、HSTS）
- アナリティクスと Search Console / Bing のプロパティを事前登録、測定用タグの実装確認（GA4、GTM）
- 事前パフォーマンステスト（代表ページでLighthouse・PageSpeedを測定、目標値設定）
- 構造化データ戦略の策定（どのページに Article/Breadcrumb/FAQ を付与するか）
- E-E-A-T 方針の確認（経験・専門性・権威性・信頼性）
   - 経験: 実際の手順や検証結果を本文に含める
   - 専門性: 用語定義と前提条件を明示し、誤解しやすい条件を補足する
   - 権威性: 公式ドキュメントなど一次情報への参照を含める
   - 信頼性: 更新日、検証環境、変更履歴を明記する
- プレビューとステージングでのスニペット確認（title/description/H1 の表示）
- リダイレクト計画（既存コンテンツがある場合の301ルール）
- セキュリティとプライバシー確認（robotsでのブロック漏れ、個人情報の取り扱い）
- アクセシビリティの基本チェック（キーボード操作、色のコントラスト、ARIA）

## 3. 全体フロー（段階別）
1. 監査（Audit）
   - Search Console のカバレッジとエラー確認（404/500、インデックス拒否）
   - Lighthouse 全ページ/代表ページ実行（LCP, CLS, TTFB）
   - サイトクロールで重複（duplicate）やnoindexミス、canonical欠落の検出
   - ログからクロール頻度とステータス確認
   - 競合調査（主要キーワードのSERP）

2. 優先度付け（Prioritize）
   - P0（緊急）: インデックスできない主要ページ / 5xx / robotsでブロック / 重大なCWV悪化
   - P1（高）: LCP の大きなページ、重要なメタ重複、構造化データ欠落（FAQ/Article）
   - P2（中）: 内部リンク不足・コンテンツの薄さ、被リンク機会

3. 実装（Implement）
   - テクニカル: sitemap.xml、robots.txt、hreflang（多言語なら）、canonicalタグ、適切なレスポンスコード
   - パフォーマンス: 画像最適化（WebP、適切なレスポンシング）、プリロード/プリフェッチ、フォント最適化、JS遅延化
   - メタ/コンテンツ: title/description/H1 の最適化、重複排除、構造化データ(JSON‑LD)の追加
   - 内部リンク: ピラー→クラスタ構造を作り重要ページへ内部リンク集中

4. QA / Pre-release チェック
   - Lighthouse（CI）で閾値クリア
   - Search Console の「URL検査」で主要ページを検査
   - robots.txt / sitemap が正しく公開
   - スキーマテスト（Rich Results Test）で構造化データを検証

5. ロールアウト（Deploy）
   - 小さなバッチで段階的にデプロイし、GSC・CWVの変化を監視
   - 重大な問題が出れば即ロールバック手順

6. 継続的改善（Monitor & Iterate）
   - 毎週: GSC の新しいエラー・インデックス数、Lighthouseレポート
   - 毎月: ランク追跡、被リンクの確認、コンテンツギャップ分析

## 4. 具体的チェックリスト（初回監査〜30日でやること）
- [ ] Search Console の所有権とメール通知確認
- [ ] sitemap.xml と robots.txt を再確認（sitemapは自動生成を確認）
- [ ] 代表ページで Lighthouse（モバイル・デスクトップ）を測定し、LCP/CLS の改善案を列挙
- [ ] 主要ページの title / meta description をレビュー（重複、長さ、キーワード）
- [ ] 重複コンテンツの一覧化（canonical で統制する）
- [ ] JSON‑LD の優先導入（Article / Breadcrumb / FAQ）を3ページで試験導入
- [ ] 画像とフォントの最適化（必要なら CDN or next-gen 画像形式）
- [ ] モバイル UX の簡易検査（タップ領域・ビュー幅・読み込み順）

## 5. 推奨出力（Deliverables）
- 監査レポート（CSV/Google Sheet）: 問題一覧、優先度、担当者、推定工数
- 実装パッチ（PR）: 1PRにつき1カテゴリ（例: JSON‑LD導入PR）
- CIでの自動Lighthouseチェック（PRチェック）

## 6. 役割と周期
- オーナー: プロダクト責任者／SEO担当
- 実装: エンジニア（フロントエンド中心）
- コンテンツ: 編集者/ライター
- 周期: 週次の監視、月次の施策レビュー

## 7. 重要ファイルと実行コマンド（dev-quick-ref リポジトリ基準）
- `vite.config.ts` — ビルドエントリ
- `scripts/generate-sitemap.js` — sitemap 自動生成
- サイトルートの `index.html` / 各ページテンプレート

例: Lighthouse CI をローカルで回す（任意）

```bash
# 単体ページを測定
npx lighthouse https://your-site.example/ --only-categories=performance,accessibility,seo --output=json --output-path=./lhr.json

# CLIで複数ページを繰るなら簡易スクリプトでループ
```

## 8. リスクと注意点
- 構造化データを誤ってマークアップするとリッチ結果非表示やペナルティのリスクがあるため、検証を必ず行うこと。
- 大規模なURL構造変更（パス名変更など）はリダイレクト計画を含め慎重に行う。

## 9. Skill の使い分け
この4つの Skill は、案件固有の説明書ではなく、どのサイトでも使い回せる作業プロトコルとして扱う。

| Skill | 使う場面 | 主な出力 |
|---|---|---|
| seo-audit | サイト全体の問題を洗い出したいとき、順位低下やインデックス不調を調べたいとき | 問題の優先順位つき監査、根拠、修正案 |
| schema | JSON-LD を入れたいとき、リッチリザルト対象を確認したいとき | ページ種別に合う schema、実装箇所、検証手順 |
| keyword-research | 新規テーマを広げたいとき、種キーワードから候補を出したいとき | 候補一覧、意図分類、優先度の高い群 |
| keyword-strategy | 調査結果をページ計画や運用計画に落としたいとき | 優先クラスター、既存/新規ページ判断、KPI |

### 使い分けの基準
- まず調べる: seo-audit
- まず整える: schema
- まず広げる: keyword-research
- まず計画に落とす: keyword-strategy

### 運用メモ
- プロジェクト固有の URL、商材、制約、優先テーマは Skill に埋め込まず、各案件のメモや依頼文に置く
- Skill は毎回の判断基準を揃えるために使う
- 迷ったら、検索意図とページ種別を先に確認してから Skill を選ぶ

---
