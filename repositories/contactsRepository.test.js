const { createConnection } = require('../db/connection');
const { createContactsRepository } = require('./contactsRepository');

describe('contactsRepository.save', () => {
  it('persists a contact and returns it with an id, default status, and created_at', () => {
    const db = createConnection(':memory:');
    const contactsRepository = createContactsRepository(db);

    const saved = contactsRepository.save({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(saved.id).toBeGreaterThan(0);
    expect(saved.name).toBe('山田太郎');
    expect(saved.email).toBe('taro@example.com');
    expect(saved.subject).toBe('テスト件名');
    expect(saved.body).toBe('テスト本文');
    expect(saved.status).toBe('new');
    expect(saved.created_at).toEqual(expect.any(String));
  });
});
