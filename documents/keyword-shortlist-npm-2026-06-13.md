# Keyword Shortlist — npm — 2026-06-13

`npm` カテゴリについて、需要データを元に次のアクションを決めたメモ。

- `merge`: 既存ページに寄せて拾う
- `new`: 新規ページ候補として追加する
- `rewrite`: クエリ文字列を見直して再調査する

データソース:

- `node scripts/research.js --category npm`
- `node scripts/research.js --compare-trends ...`

---

## 結論

最初の着手対象は以下。

1. 既存ページの強化
   - `/npm/module-not-found/`
   - `/npm/link-local-package/`
   - `/npm/eresolve-peer-deps/`

2. 新規ページ候補の優先バッチ
   - `missing script`
   - `node heap out of memory`

3. 再調査してから判断する候補
   - `npm EACCES permission denied fix`
   - `npm package-lock.json merge conflict`
   - `npm cache clean when to use`

---

## 1. 既存ページに統合するキーワード

| keyword | target page | evidence | action | note |
| --- | --- | --- | --- | --- |
| cannot find module | `/npm/module-not-found/` | Trends winner avg 16.3, suggest 10/10, SO 43K | merge | `title` と `description` を一般形に寄せる |
| node cannot find module error | `/npm/module-not-found/` | suggest 10/10 | merge | Node.js 文脈を補助語として維持 |
| npm link | `/npm/link-local-package/` | Trends winner avg 11.7, suggest 10/10 | merge | `npm link` をタイトル前方へ寄せる |
| npm peer dependency conflict | `/npm/eresolve-peer-deps/` | Trends winner, suggest 3/10 | merge | `peer dependency conflict` をタイトルと導入に反映 |

---

## 2. 新規ページ候補

| keyword | intent | reason | priority |
| --- | --- | --- | --- |
| missing script | error-fix | `/npm/run-scripts/` は使い方ページで、エラー解決意図とは別 | High |
| node heap out of memory | error-fix | 既存ページに近いものがなく、suggest 10/10 | High |

---

## 3. 再調査が必要な候補

| current query | suspected issue | retry direction |
| --- | --- | --- |
| npm EACCES permission denied fix | 実エラー文字列に寄っていない | `npm ERR! code EACCES`, `npm permission denied` |
| npm package-lock.json merge conflict | 語が説明調 | `package-lock merge conflict`, `npm merge conflict package-lock.json` |
| npm cache clean when to use | 意図はあるが長い | `npm cache clean`, `npm cache verify` |

---

## 4. 優先順位

### 今すぐやるべき更新

1. `/npm/module-not-found/` に `cannot find module` を主軸語として統合
2. `/npm/link-local-package/` に `npm link` を主軸語として統合
3. `/npm/eresolve-peer-deps/` に `npm peer dependency conflict` を統合
4. `missing script` の新規ページを追加

### その次に作る新規ページ

1. `node heap out of memory`

---

## 5. 補足

- `missing script` は比較セット内で最も強い語だったが、npm 文脈を明示するためページタイトルでは `npm ERR! missing script` を使う
- Google Trends は比較セット内の相対値なので、別バッチ同士は直接比較しない