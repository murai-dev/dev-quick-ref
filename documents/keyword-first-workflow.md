# Keyword-First Workflow

キーワード起点で流入機会を探し、既存ページに統合するか、新規ページを作るかを判断するための運用手順。

このドキュメントは「まず需要のある語を見つけ、その後で URL を決める」進め方を前提にする。

---

## 目的

- 実際に検索されている語から着手する
- 既存ページで拾える需要を先に回収する
- 検索意図が違う場合だけ新規ページを増やす
- 1ページ1問題1答えの原則を守ったままページ数を拡張する

---

## 基本方針

判断の出発点はページではなくキーワードに置く。ただし、最終判断は検索意図と既存ページの適合度で行う。

1. 需要があるキーワード候補を集める
2. 検索意図を確認する
3. 既存ページで答えられるかを判定する
4. 既存統合または新規作成に振り分ける
5. Search Console の実績で毎月見直す

---

## 使うデータソース

優先度は次の順で扱う。

1. Google Search Console
既に表示されているクエリを確認する。最優先の一次データ。

2. Google Suggest
候補の広がりを見る。`documents/research-method.md` の方法を使う。

3. Google Trends
似た語の相対需要、季節性、地域差を見る。

4. Stack Overflow
実務上の詰まりやすさを補助的に確認する。

5. SERP の目視確認
上位ページの形式が既存ページと同じかどうかを確認する。

---

## 実行フロー

### Step 1. 種キーワードを集める

現状の主要カテゴリは `git`、`docker`、`bash`、`regex`、`npm` の5つ。

各カテゴリについて、次の軸で候補を出す。

- 実際のエラーメッセージ
- コマンド名
- 別表現
- 初心者が使いがちな言い換え
- 目的語付きの表現
- OS / 環境付きの表現

例:

- `git push rejected`
- `failed to push some refs`
- `updates were rejected`
- `non fast forward`
- `git push rejected github`

### Step 2. 需要を確認する

まずは既存の調査スクリプトを使う。

```bash
node scripts/research.js --category git
node scripts/research.js --category docker
node scripts/research.js --category bash
node scripts/research.js --category regex
node scripts/research.js --category npm
```

追加の候補は `scripts/research.js` のクエリ配列に足して再調査する。

判断の目安:

- Google Suggest が 8 以上: 優先度高
- Google Suggest が 1 から 7: 語尾や言い換えを見直す
- Google Suggest が 0: クエリ文字列を変えて再調査する
- SO view が高い: 実務課題として強い

### Step 3. 検索意図を分類する

キーワードごとに、次のどれかへ分類する。

- エラー解決
- コマンドの使い方
- 比較 / 違い
- 状態確認
- 後始末 / cleanup

同じカテゴリでも、意図が違えばページは分ける。

### Step 4. 既存統合か新規作成かを判定する

次のルールで決める。

#### 既存ページに統合する条件

- 検索意図が既存ページと同じ
- Quick Answer の主手順がほぼ同じ
- 補足説明の追加だけで満足させられる
- タイトルと導入文を少し調整すれば対応できる

#### 新規ページにする条件

- 解決手順が別物
- 前提条件や環境が違う
- 比較記事とトラブル解決記事のようにページ形式が違う
- 既存ページへ詰め込むと 1ページ1問題1答え が崩れる

#### 見送る条件

- 需要根拠が弱い
- SERP 上位の意図が広すぎて、このサイト形式と合わない
- 既存のカテゴリや内部リンクから孤立する

---

## 判定シートの列

スプレッドシートまたは Markdown 表では、次の列を持たせる。

| keyword | category | intent | demand evidence | existing page | action | priority | note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| failed to push some refs | git | error-fix | Suggest / SO / GSC | /git/push-rejected/ | merge | High | title と導入文に追加 |

`action` は `merge` `new` `hold` の3値で十分。

---

## 既存ページへ統合するときの編集箇所

既存統合にした場合は、単に語を追加するのではなく、ページの答えをその語彙へ寄せる。

更新候補:

- `title`
- `description`
- `when.error` または `when.pre`
- Quick Answer の前後にある説明文
- `details` の補足
- `related`

1つのページに別意図を混ぜないこと。

---

## 既存ページに寄せやすい候補例

以下は、現在のページ構成から見て、追加調査後に既存統合しやすい候補群。

### Git

- `/git/push-rejected/`
  - `failed to push some refs`
  - `updates were rejected because the tip of your current branch is behind`
  - `git non fast forward`

- `/git/permission-denied-publickey/`
  - `github permission denied publickey`
  - `git ssh key not working`
  - `permission denied publickey fatal could not read from remote repository`

- `/git/untrack-file/`
  - `git stop tracking file`
  - `git remove file from tracking keep local`

### Docker

- `/docker/copy-files/`
  - `docker copy file from container`
  - `docker cp container to host`
  - `docker copy folder from container`

- `/docker/view-logs/`
  - `docker logs follow`
  - `docker logs realtime`
  - `docker logs tail`

- `/docker/permission-denied-docker-socket/`
  - `docker permission denied /var/run/docker.sock`
  - `got permission denied while trying to connect to the docker daemon socket`

### Bash

- `/bash/check-if-file-exists/`
  - `shell script check file exists`
  - `bash if file exists`
  - `bash test file exists`

- `/bash/kill-process-by-port/`
  - `kill process running on port`
  - `bash find pid by port`

### Regex

- `/regex/url-pattern/`
  - `regex match url`
  - `regex validate url`

- `/regex/email-pattern/`
  - `regex email address`
  - `regex validate email`

### npm

- `/npm/module-not-found/`
  - `node cannot find module`
  - `cannot find module express`
  - `npm module not found`

- `/npm/eresolve-peer-deps/`
  - `npm peer dependency conflict`
  - `unable to resolve dependency tree`

---

## 新規ページ候補に回しやすい例

需要が確認できれば、次はこのあたりを新規候補として扱いやすい。

### Git

- `git reflog recover branch`
- `git force pull overwrite local changes`
- `git revert merge commit`

### Docker

- `docker pull rate limit exceeded`
- `docker compose wait for service`
- `docker remove dangling images`

### Bash

- `bash string contains substring`
- `bash default value if variable is empty`
- `bash split string by delimiter`

### Regex

- `regex remove html tags`
- `regex match file extension`
- `regex match between brackets`

### npm

- `npm run script not found`
- `node heap out of memory`
- `npm eacces permission denied`

---

## 週次と月次の運用

### 週次

- Search Console の新規表示クエリを確認する
- 既存ページへ統合できる語を 5 から 10 件拾う
- title と description の改善余地を確認する

### 月次

- カテゴリ別にクエリ群を見直す
- `merge` と `new` の判定を更新する
- 高表示 / 低CTR ページの文言を修正する
- 内部リンクの不足を埋める

---

## 優先順位の付け方

最初は次の条件を同時に満たすものから着手する。

1. 需要の証拠がある
2. 既存ページと意図が近い
3. 少ない編集で統合できる
4. 関連ページから内部リンクしやすい

この条件を満たすものは、新規ページより先に取りにいく。

---

## 初回バッチの進め方

最初の1サイクルはこの順で進める。

1. 既存5カテゴリの主要ページごとに言い換え候補を3件ずつ出す
2. Google Suggest と Search Console で需要を確認する
3. `merge` 判定のものから 10 ページ分だけ更新する
4. 更新後 2 から 4 週間で表示クエリと CTR を確認する
5. 反応が良いカテゴリだけ新規ページを増やす

いきなり新規ページを増やしすぎないこと。まずは既存資産で取れる需要を回収する。