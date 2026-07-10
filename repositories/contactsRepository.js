function createContactsRepository(db) {
  const insertStmt = db.prepare(
    'INSERT INTO contacts (name, email, subject, body) VALUES (@name, @email, @subject, @body)',
  );
  const findByIdStmt = db.prepare('SELECT * FROM contacts WHERE id = ?');

  return {
    save({ name, email, subject, body }) {
      const { lastInsertRowid } = insertStmt.run({ name, email, subject, body });
      return findByIdStmt.get(lastInsertRowid);
    },
  };
}

module.exports = { createContactsRepository };
