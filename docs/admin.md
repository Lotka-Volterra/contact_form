# 管理ページ 詳細仕様

CLAUDE.mdの概要をもとに、実装済みの詳細仕様をまとめる。

## 画面構成

- 一覧画面（`GET /admin`）: `contacts`テーブルの内容を新しい順に一覧表示する
- 詳細画面（`GET /admin/:id`）: 一覧の項目をクリックすると、その問い合わせの詳細（名前・メールアドレス・件名・本文・ステータス・受付日時）を表示する。存在しないIDの場合は404を返す
- ステータス変更（`POST /admin/:id/status`）: 詳細画面のドロップダウンリストから3段階のステータスを変更できる。未知のステータス値が送られた場合は400を返す

## ルーティング方針

管理ページのルートはすべて`/admin`配下にまとめている。

理由: 認証（ログイン）は今回のスコープ外だが、将来追加する際に`/admin`配下のルーター全体へ認証ミドルウェアを1箇所差し込むだけで済むようにするため。詳細は[docs/decisions.md](./decisions.md)を参照。

## ステータスの内部コードと表示ラベル

DBの`status`列は英語コードで保持する（[docs/contact-form.md](./contact-form.md)参照）。管理ページの表示・ドロップダウンでは、以下の対応で日本語ラベルに変換する。

| 内部コード（DB上の値） | 表示ラベル（画面上） |
| ----------------------- | --------------------- |
| `new`                    | 新規                   |
| `in_progress`            | 対応中                 |
| `resolved`               | 解決済み               |

この対応表は`services/contactStatus.js`に1箇所にまとめている。

## 受付日時の表示（JST変換）

`contacts.created_at`はSQLiteの仕様によりUTCで保存されている（[docs/contact-form.md](./contact-form.md)参照）。DB自体はUTCのまま保持し、画面表示のタイミングでJST（UTC+9、`services/dateFormatter.js`の`toJstDisplayString()`）に変換する方針とした。サーバーのOSタイムゾーン設定に依存させないための判断。詳細は[docs/decisions.md](./decisions.md)を参照。表示フォーマットは`YYYY-MM-DD HH:MM:SS (JST)`。

## 認証

今回のスコープ外。管理ページは誰でもアクセスできる状態のまま実装している。将来の追加方針は[docs/decisions.md](./decisions.md)を参照。

## 関連ファイル対応表

| 役割                             | ファイル                              |
| -------------------------------- | ------------------------------------- |
| ルーティング                     | `routes/admin.js`                     |
| ステータスの対応・検証           | `services/contactStatus.js`           |
| 受付日時のJST変換                | `services/dateFormatter.js`           |
| DBアクセス（一覧・詳細・更新）   | `repositories/contactsRepository.js`  |
| 一覧画面                         | `views/admin/list.ejs`                |
| 詳細画面                         | `views/admin/detail.ejs`              |
| 404画面                          | `views/admin/not-found.ejs`           |
