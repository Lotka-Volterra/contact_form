const request = require('supertest');
const app = require('../app');

async function createContact(overrides = {}) {
  const res = await request(app)
    .post('/complete')
    .type('form')
    .send({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
      ...overrides,
    });
  expect(res.status).toBe(200);
}

describe('GET /admin', () => {
  it('lists saved contacts with their subject and status label', async () => {
    await createContact({ subject: '一覧テスト件名' });

    const res = await request(app).get('/admin');

    expect(res.status).toBe(200);
    expect(res.text).toContain('一覧テスト件名');
    expect(res.text).toContain('新規');
  });
});

describe('GET /admin/:id', () => {
  it('shows the contact detail with a status dropdown', async () => {
    await createContact({ subject: '詳細テスト件名' });
    const list = await request(app).get('/admin');
    const [, id] = list.text.match(/\/admin\/(\d+)/);

    const res = await request(app).get(`/admin/${id}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain('詳細テスト件名');
    expect(res.text).toContain('taro@example.com');
    expect(res.text).toContain('<option value="new"');
    expect(res.text).toContain('<option value="in_progress"');
    expect(res.text).toContain('<option value="resolved"');
  });

  it('returns 404 when the contact does not exist', async () => {
    const res = await request(app).get('/admin/999999');

    expect(res.status).toBe(404);
  });
});

describe('POST /admin/:id/status', () => {
  it('updates the status and reflects it on the detail page', async () => {
    await createContact({ subject: 'ステータス更新テスト' });
    const list = await request(app).get('/admin');
    const [, id] = list.text.match(/\/admin\/(\d+)/);

    const postRes = await request(app)
      .post(`/admin/${id}/status`)
      .type('form')
      .send({ status: 'in_progress' });
    expect(postRes.status).toBe(302);

    const detailRes = await request(app).get(`/admin/${id}`);
    expect(detailRes.text).toContain('<option value="in_progress" selected');
  });

  it('rejects an unknown status value', async () => {
    await createContact({ subject: '不正ステータステスト' });
    const list = await request(app).get('/admin');
    const [, id] = list.text.match(/\/admin\/(\d+)/);

    const res = await request(app).post(`/admin/${id}/status`).type('form').send({
      status: 'archived',
    });

    expect(res.status).toBe(400);
  });
});
