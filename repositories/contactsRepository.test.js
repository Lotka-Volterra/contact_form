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

describe('contactsRepository.findAll', () => {
  it('returns all contacts ordered by newest first', () => {
    const db = createConnection(':memory:');
    const contactsRepository = createContactsRepository(db);

    const first = contactsRepository.save({
      name: '一人目',
      email: 'first@example.com',
      subject: '件名1',
      body: '本文1',
    });
    const second = contactsRepository.save({
      name: '二人目',
      email: 'second@example.com',
      subject: '件名2',
      body: '本文2',
    });

    const all = contactsRepository.findAll();

    expect(all).toHaveLength(2);
    expect(all[0].id).toBe(second.id);
    expect(all[1].id).toBe(first.id);
  });
});

describe('contactsRepository.findById', () => {
  it('returns the contact matching the given id', () => {
    const db = createConnection(':memory:');
    const contactsRepository = createContactsRepository(db);

    const saved = contactsRepository.save({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    expect(contactsRepository.findById(saved.id).name).toBe('山田太郎');
  });

  it('returns undefined when no contact matches the given id', () => {
    const db = createConnection(':memory:');
    const contactsRepository = createContactsRepository(db);

    expect(contactsRepository.findById(999)).toBeUndefined();
  });
});

describe('contactsRepository.updateStatus', () => {
  it('updates the status of the contact matching the given id', () => {
    const db = createConnection(':memory:');
    const contactsRepository = createContactsRepository(db);

    const saved = contactsRepository.save({
      name: '山田太郎',
      email: 'taro@example.com',
      subject: 'テスト件名',
      body: 'テスト本文',
    });

    const updated = contactsRepository.updateStatus(saved.id, 'in_progress');

    expect(updated.status).toBe('in_progress');
    expect(contactsRepository.findById(saved.id).status).toBe('in_progress');
  });
});
