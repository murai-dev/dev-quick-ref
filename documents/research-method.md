# 検索需要の調査方法

ページ候補の選定・優先度付けに使う調査手法をまとめる。

---

## 使用する指標

### 1. Google Suggest count（主指標）

Google のオートコンプリート候補が何件返るかを 0〜10 の整数で記録する。

- **10/10**: Google が「非常に高い検索需要」と判断しているキーワード群を持つ
- **0/10**: クエリ文字列が実際の検索語と一致していない、またはニッチすぎる
- handy-tools-hub での日本語調査（`gl=jp`）と同じ手法を英語向けに転用している

**エンドポイント**

```
https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q={クエリ}
```

レスポンスは `["クエリ", ["候補1", "候補2", ...]]` 形式の JSON。`parsed[1].length` が候補数（0〜10）。

### 2. Stack Overflow top question views（補助指標）

調査クエリを Stack Exchange API の `/search` エンドポイントに投げ、`intitle` マッチした上位1件の `view_count` を取得する。

- SO 閲覧数が多い = **実際に多くの開発者が同じ問題で詰まっている**証拠
- 0 が返った場合は「クエリ文字列が SO の質問タイトルと一致しなかった」ケースを多く含む。需要ゼロとは限らない

**エンドポイント**

```
https://api.stackexchange.com/2.3/search?order=desc&sort=relevance&intitle={クエリ}&site=stackoverflow&pagesize=1
```

- API キーなし: 1日 300リクエストまで
- レスポンスは gzip 圧縮あり（`zlib.createGunzip()` で解凍）

---

## 調査スクリプト

`scripts/research.js` として実装済み。

### 実行方法

```bash
# 全100クエリを調査（約50秒）
node scripts/research.js

# カテゴリを絞って実行
node scripts/research.js --category git
node scripts/research.js --category docker
node scripts/research.js --category bash
node scripts/research.js --category regex
node scripts/research.js --category npm
```

### 出力

- **stdout**: Markdown テーブル形式の結果（`mvp-candidates.md` への貼り付けを想定）
- **stderr**: 進捗ログとサマリー（suggest 平均、高スコア件数等）

### リクエスト間隔

- Google Suggest: 250ms
- Stack Overflow: 250ms
- 合計所要時間: 100クエリ × 500ms ≒ 50秒

---

## 優先度の判定基準

| suggest | SO views | 判定 |
| :---: | :---: | --- |
| 10/10 | 100K+ | **S ティア**：最優先で実装する |
| 10/10 | 1K〜99K | **A ティア**：高優先 |
| 8〜9/10 | 問わず | **B ティア**：実装する |
| 1〜7/10 | 問わず | **C ティア**：クエリ見直し後に判断 |
| 0/10 | 0 | **要見直し**：クエリ文字列を変えて再調査 |

---

## 0/10 だったクエリの対処

0/10 はトピックを捨てるのではなく、**クエリ文字列を変えて再調査**する。

よくある原因と対処:

| 原因 | 対処例 |
| --- | --- |
| 修飾語が多すぎる | `docker port already in use fix` → `docker address already in use` |
| 動詞・形容詞が余分 | `git line ending CRLF LF fix` → `git crlf lf windows` |
| 実際のエラーメッセージと異なる | コマンド実行して実際のエラー文字列を使う |
| コマンドフラグで検索されている | `docker logs follow realtime` → `docker logs -f` |

再調査は `scripts/research.js` のクエリ配列を書き換えて再実行するだけでよい。

---

## 補足：手動で確認できる無料ツール

スクリプトでは取れないデータが必要な場合。

| ツール | 取れるデータ | URL |
| --- | --- | --- |
| Google Trends | 相対的な検索トレンド推移、地域分布 | https://trends.google.com |
| Ubersuggest | 月間検索数（無料枠あり、要ログイン） | https://app.neilpatel.com/en/ubersuggest |
| Stack Overflow 検索 | 質問数・閲覧数・投票数の詳細 | https://stackoverflow.com/search |
| Answer The Public | ロングテールクエリの発掘 | https://answerthepublic.com |

Google Trends は S ティアの数件を手動で比較するだけでも十分な情報が得られる。

---

## 調査履歴

| 日付 | 対象 | クエリ数 | スクリプト |
| --- | --- | :---: | --- |
| 2026-05-29 | MVP candidates 全件 | 100 | `scripts/research.js` |
