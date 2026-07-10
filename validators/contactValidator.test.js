const { validateContact } = require('./contactValidator');

const validInput = {
  name: '山田太郎',
  email: 'taro@example.com',
  subject: 'テスト件名',
  body: 'テスト本文',
};

describe('validateContact', () => {
  it('returns no errors for valid input', () => {
    expect(validateContact(validInput)).toEqual([]);
  });

  it('returns an error when name is empty', () => {
    const errors = validateContact({ ...validInput, name: '' });
    expect(errors).toContain('名前を入力してください');
  });

  it('returns an error when name is whitespace only', () => {
    const errors = validateContact({ ...validInput, name: '   ' });
    expect(errors).toContain('名前を入力してください');
  });

  it('returns an error when email is empty', () => {
    const errors = validateContact({ ...validInput, email: '' });
    expect(errors).toContain('メールアドレスを入力してください');
  });

  it('returns an error when email format is invalid', () => {
    const errors = validateContact({ ...validInput, email: 'invalid-email' });
    expect(errors).toContain('メールアドレスの形式が正しくありません');
  });

  it('returns an error when subject is empty', () => {
    const errors = validateContact({ ...validInput, subject: '' });
    expect(errors).toContain('件名を入力してください');
  });

  it('returns an error when body is empty', () => {
    const errors = validateContact({ ...validInput, body: '' });
    expect(errors).toContain('本文を入力してください');
  });

  it('returns multiple errors when multiple fields are invalid', () => {
    const errors = validateContact({ name: '', email: '', subject: '', body: '' });
    expect(errors).toHaveLength(4);
  });
});
