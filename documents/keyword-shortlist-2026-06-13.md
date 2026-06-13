# Keyword Shortlist — 2026-06-13

`git` と `docker` の2カテゴリについて、需要データを元に次のアクションを決めたメモ。

- `merge`: 既存ページに寄せて拾う
- `new`: 新規ページ候補として追加する
- `rewrite`: クエリ文字列を見直して再調査する

データソース:

- `node scripts/research.js --category git`
- `node scripts/research.js --category docker`
- `node scripts/research.js --compare-trends ...`

---

## 結論

最初の着手対象は以下。

1. 既存ページの強化
   - `/git/push-rejected/`
   - `/git/permission-denied-publickey/`
   - `/docker/copy-files/`
   - `/docker/permission-denied-docker-socket/`
   - `/docker/container-exits-immediately/`

2. 新規ページ候補の優先バッチ
   - `git force pull overwrite local changes`
   - `git revert merge commit`
   - `git reflog recover branch`
   - `docker pull rate limit exceeded`
   - `docker remove dangling images`

3. 再調査してから判断する候補
   - `git line ending CRLF LF fix`
   - `git large file rejected fix`
   - `docker logs follow realtime`
   - `docker compose depends_on wait for service ready`

---

## 1. 既存ページに統合するキーワード

### Git

| keyword | target page | evidence | action | note |
| --- | --- | --- | --- | --- |
| failed to push some refs | `/git/push-rejected/` | Trends winner, existing query suggest 10/10, SO 687K | merge | `title` と `when.error` に反映 |
| updates were rejected because the tip of your current branch is behind | `/git/push-rejected/` | Trends avg 2.8, error message match | merge | 本文にエラーメッセージとして追記 |
| github permission denied publickey | `/git/permission-denied-publickey/` | Trends winner, existing query suggest 10/10, SO 931K | merge | `GitHub` 表記を見出しと導入に追加 |
| git permission denied publickey | `/git/permission-denied-publickey/` | suggest 10/10, SO 931K | merge | 主軸キーワードとして維持 |
| git ignore already tracked file | `/git/untrack-file/` | suggest 7/10 | merge | `stop tracking` 系の補助語を追加 |

### Docker

| keyword | target page | evidence | action | note |
| --- | --- | --- | --- | --- |
| docker cp | `/docker/copy-files/` | Trends winner avg 4.4 | merge | `docker cp` をタイトル前方へ寄せる |
| docker copy file from container | `/docker/copy-files/` | suggest 10/10 | merge | 現在の説明文と完全一致 |
| docker permission denied socket | `/docker/permission-denied-docker-socket/` | suggest 10/10, Trends winner | merge | タイトル短縮候補として有力 |
| docker container exits immediately | `/docker/container-exits-immediately/` | suggest 10/10, SO 738K | merge | 既存ページの優先更新対象 |
| docker no space left on device | `/docker/no-space-left/` | suggest 10/10, SO 75K | merge | 高需要なので導入文の精度を上げる |

---

## 2. 新規ページ候補

現在のサイト構造と既存ページの意図を見たうえで、別ページに分ける価値があるもの。

### Git

| keyword | intent | reason | priority |
| --- | --- | --- | --- |
| git force pull overwrite local changes | error-fix | `/git/pull-rebase-vs-merge/` では代替できず、検索意図が強い | High |
| git revert merge commit | error-fix | 既存の `undo-last-commit` とは手順も前提も異なる | High |
| git reflog recover branch | recovery | `recover-deleted-branch` 近縁だが、reflog 起点の意図が独立している | High |

### Docker

| keyword | intent | reason | priority |
| --- | --- | --- | --- |
| docker remove dangling images | cleanup | `/docker/prune-images/` に近いが、dangling images 指定は別意図として成立 | High |
| docker pull rate limit exceeded | error-fix | 既存ページに近いものがなく、実務検索として成立しやすい | High |
| docker compose wait for service ready | compose / orchestration | `depends_on` と readiness は意図が具体的で独立している | Medium |

---

## 3. 再調査が必要な候補

Suggest 0/10 または低スコアで、クエリ表現の見直しが必要なもの。

| current query | suspected issue | retry direction |
| --- | --- | --- |
| git line ending CRLF LF fix | 語が長く不自然 | `git crlf lf windows`, `git warning lf will be replaced by crlf` |
| git large file rejected fix | 実際のエラー文に寄っていない | `remote: file is too large`, `git large files detected` |
| docker logs follow realtime | `realtime` が不自然 | `docker logs -f`, `docker logs follow` |
| docker compose depends_on wait for service ready | 修飾が多すぎる | `docker compose wait for service`, `depends_on healthcheck` |
| docker multi-stage build reduce image size | 意図はあるが検索句が説明調 | `docker multi stage build`, `docker reduce image size` |

---

## 4. 優先順位

### 今すぐやるべき更新

1. `/git/push-rejected/` に `failed to push some refs` を統合
2. `/git/permission-denied-publickey/` に `github permission denied publickey` を統合
3. `/docker/copy-files/` に `docker cp` を主軸語として統合
4. `/docker/permission-denied-docker-socket/` を短い検索語に寄せる
5. `/docker/container-exits-immediately/` のタイトルと導入文を見直す

### その次に作る新規ページ

1. `git force pull overwrite local changes`
2. `git revert merge commit`
3. `docker pull rate limit exceeded`
4. `docker remove dangling images`

---

## 5. 補足

- Google Trends は比較セット内の相対値なので、別バッチ同士は直接比較しない
- SO view は補助指標であり、0 でも需要ゼロとは限らない
- 既存ページに統合するときは、単に語を追加するのではなく `title`、`description`、`when.error` まで寄せる