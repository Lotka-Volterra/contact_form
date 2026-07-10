# お問い合わせフォーム

お問い合わせフォームと、問い合わせ内容を管理する管理ページを持つWebアプリケーションです。

## 技術スタック

- Node.js + Express + EJS
- SQLite（better-sqlite3）
- テスト: Jest + supertest

## セットアップ

```bash
npm install
```

## 起動

```bash
npm start
```

- `http://localhost:3000/`: お問い合わせフォーム
- `http://localhost:3000/admin`: 管理ページ（一覧・詳細・ステータス変更）

## テスト

```bash
npm test
```

## Lint / Format

```bash
npm run lint
npm run format
```

## 詳細仕様

開発方針・コーディング規約は[CLAUDE.md](./CLAUDE.md)、機能ごとの詳細仕様や設計判断の理由は[docs/](./docs)を参照してください。
