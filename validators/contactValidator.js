const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact({ name, email, subject, body }) {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push('名前を入力してください');
  }

  if (!email || !email.trim()) {
    errors.push('メールアドレスを入力してください');
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.push('メールアドレスの形式が正しくありません');
  }

  if (!subject || !subject.trim()) {
    errors.push('件名を入力してください');
  }

  if (!body || !body.trim()) {
    errors.push('本文を入力してください');
  }

  return errors;
}

module.exports = { validateContact };
