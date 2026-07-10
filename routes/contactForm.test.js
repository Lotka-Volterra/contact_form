const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('renders the contact form with name, email, subject, and body fields', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.text).toContain('name="name"');
    expect(res.text).toContain('name="email"');
    expect(res.text).toContain('name="subject"');
    expect(res.text).toContain('name="body"');
  });
});

describe('POST /confirm', () => {
  it('renders the confirmation screen with the submitted values', async () => {
    const res = await request(app).post('/confirm').type('form').send({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.status).toBe(200);
    expect(res.text).toContain('山田太郎');
    expect(res.text).toContain('taro@example.com');
    expect(res.text).toContain('テスト件名');
    expect(res.text).toContain('テスト本文');
  });

  it('carries the submitted values forward as hidden fields for final submission', async () => {
    const res = await request(app).post('/confirm').type('form').send({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.text).toContain('name="name" value="山田太郎"');
    expect(res.text).toContain('name="email" value="taro@example.com"');
    expect(res.text).toContain('name="subject" value="テスト件名"');
    expect(res.text).toContain('name="body" value="テスト本文"');
  });

  it('re-renders the contact form with errors when required fields are missing', async () => {
    const res = await request(app).post('/confirm').type('form').send({
      name: '',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.status).toBe(400);
    expect(res.text).toContain('名前を入力してください');
    expect(res.text).toContain('name="email" value="taro@example.com"');
  });

  it('re-renders the contact form with an error when the email format is invalid', async () => {
    const res = await request(app).post('/confirm').type('form').send({
      name: '山田太郎',
      email: 'invalid-email',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.status).toBe(400);
    expect(res.text).toContain('メールアドレスの形式が正しくありません');
  });
});

describe('POST /complete', () => {
  it('saves the contact and shows a thank-you message', async () => {
    const res = await request(app).post('/complete').type('form').send({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.status).toBe(200);
    expect(res.text).toContain('お問い合わせありがとうございました');
  });

  it('re-renders the contact form with errors and does not save when required fields are missing', async () => {
    const res = await request(app).post('/complete').type('form').send({
      name: '',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(res.status).toBe(400);
    expect(res.text).toContain('名前を入力してください');
  });
});
