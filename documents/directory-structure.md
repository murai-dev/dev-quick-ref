# directory structure

ページ数が多いため、カテゴリ別にディレクトリを分けてページを管理する。

## 目標構成

```text
dev-quick-ref/
├── documents/
│   ├── README.md
│   ├── overview.md
│   ├── mvp-candidates.md
│   ├── tech-stack-and-deploy.md
│   ├── directory-structure.md
│   ├── growth-strategy.md
│   └── access-analytics.md
├── public/
│   └── robots.txt
├── src/
│   ├── components/          # 共通UIパーツ（コピーボタン、Related リンク等）
│   ├── config/              # カテゴリ定義、メタデータ
│   ├── data/                # カテゴリ別JSONデータ（ページ一覧・関連リンク）
│   │   ├── git.json
│   │   ├── docker.json
│   │   ├── bash.json
│   │   ├── regex.json
│   │   └── npm.json
│   ├── entrypoints/         # ページ別エントリポイント
│   │   └── main.ts
│   ├── lib/                 # コピーボタン等の共通ロジック
│   ├── pages/               # 各ページのHTML
│   │   ├── git/
│   │   │   ├── index.html               # カテゴリ索引
│   │   │   ├── detached-head/index.html
│   │   │   ├── undo-last-commit/index.html
│   │   │   └── ...（30ページ）
│   │   ├── docker/
│   │   │   ├── index.html
│   │   │   └── ...（20ページ）
│   │   ├── bash/
│   │   │   ├── index.html
│   │   │   └── ...（20ページ）
│   │   ├── regex/
│   │   │   ├── index.html
│   │   │   └── ...（15ページ）
│   │   └── npm/
│   │       ├── index.html
│   │       └── ...（15ページ）
│   ├── styles/
│   │   ├── base.css
│   │   └── theme.css
│   └── types/
├── tests/
├── index.html               # トップページ（カテゴリ一覧）
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 役割分担

- `src/pages/{category}/{slug}/index.html`: 各問題ページ（1ページ1問題）
- `src/pages/{category}/index.html`: カテゴリ索引ページ（内部リンクのハブ）
- `src/data/{category}.json`: ページ間の関連リンク情報を管理
- `src/components/`: コピーボタン、Related セクション等の共通UI
- `src/lib/`: コピーボタンのロジック等
- `src/config/`: カテゴリ定義・メタデータ

## 各ページのURL構造

```
/                       → トップページ（カテゴリ一覧）
/git/                   → Git カテゴリ索引
/git/detached-head/     → 個別問題ページ
/docker/                → Docker カテゴリ索引
/docker/port-already-in-use/
...
```

## 運用ルール

- `dist` は生成物なので管理対象にしない
- ページ間の関連リンクは `src/data/*.json` で一元管理する
- 各ページのコードサンプルは実際に動作確認してから掲載する
- ページタイトルと description は検索クエリを意識して設定する
