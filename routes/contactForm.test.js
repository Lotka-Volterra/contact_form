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
});
