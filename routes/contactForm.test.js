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
