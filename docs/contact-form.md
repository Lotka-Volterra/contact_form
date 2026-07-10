# お問い合わせフォーム 詳細仕様

CLAUDE.mdの概要をもとに、実装済みの詳細仕様をまとめる。

## 画面遷移

```
GET /            入力フォーム（views/contact-form.ejs）
  ↓ POST /confirm
POST /confirm     確認画面（views/confirm.ejs）
  ↓ POST /complete
POST /complete    保存 + 完了画面（views/complete.ejs）
```

- 確認画面の「修正する」ボタンは`GET /`に戻る（入力し直し。値は引き継がない）
- 確認画面の「送信する」ボタンは、入力値をhiddenフィールドとして保持した状態で`POST /complete`に送信する

## 入力項目

| 項目名   | フォームのname属性 | 型                |
| -------- | ------------------- | ----------------- |
| 名前     | `name`               | text               |
| メールアドレス | `email`        | email              |
| 件名     | `subject`            | text               |
| 本文     | `body`               | textarea           |

## バリデーション

サーバー側バリデーションは`validators/contactValidator.js`の`validateContact()`が担う。`POST /confirm`・`POST /complete`の両方で実行する（`/complete`は`/confirm`を経由しない直接アクセスも技術的に可能なため、DB保存前の最終防衛ラインとして両方で検証する）。

- 4項目（名前・メールアドレス・件名・本文）はすべて必須（空文字・空白のみはエラー）
- メールアドレスは簡易的な形式チェック（`xxx@yyy.zzz`相当の正規表現）

エラー時の挙動:
- HTTPステータス`400`を返す
- `views/contact-form.ejs`を再表示し、エラーメッセージ一覧（`<ul class="errors">`）と、入力済みの値（`values.name`など）を保持する

## データの持ち回し方法

確認画面から完了画面までの間、サーバー側にセッションとして状態を保持することはしていない。確認画面（`views/confirm.ejs`）のフォームに、入力値をそのままhiddenフィールドとして埋め込み、「送信する」ボタン押下時に`POST /complete`へ再送信する方式を採用している（`express-session`は導入していない）。

## データベース

`contacts`テーブル（`db/connection.js`で`CREATE TABLE IF NOT EXISTS`により作成）。

| 列名        | 型      | 備考                                   |
| ----------- | ------- | -------------------------------------- |
| id          | INTEGER | PRIMARY KEY AUTOINCREMENT              |
| name        | TEXT    | NOT NULL                               |
| email       | TEXT    | NOT NULL                               |
| subject     | TEXT    | NOT NULL                               |
| body        | TEXT    | NOT NULL                               |
| status      | TEXT    | NOT NULL DEFAULT `'new'`（英語コードで保持。表示ラベルとの対応は[docs/admin.md](./admin.md)を参照） |
| created_at  | TEXT    | NOT NULL DEFAULT `datetime('now')`（SQLiteの仕様によりUTC。表示時にJSTへ変換する。詳細は[docs/admin.md](./admin.md)参照） |

DB接続先は`app.js`で環境ごとに切り替えている。
- `NODE_ENV=test`（Jest実行時に自動設定される）: `:memory:`
- それ以外（本番/開発）: `data/contacts.sqlite`（親ディレクトリが存在しない場合は自動作成する）

## 関連ファイル対応表

| 役割                       | ファイル                              |
| -------------------------- | ------------------------------------- |
| ルーティング               | `routes/contactForm.js`               |
| バリデーション             | `validators/contactValidator.js`      |
| DB接続・スキーマ           | `db/connection.js`                    |
| DBアクセス（保存）         | `repositories/contactsRepository.js`  |
| 入力フォーム画面           | `views/contact-form.ejs`              |
| 確認画面                   | `views/confirm.ejs`                   |
| 完了画面                   | `views/complete.ejs`                  |
