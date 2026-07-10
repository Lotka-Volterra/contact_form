function createContactsRepository(db) {
  const insertStmt = db.prepare(
    'INSERT INTO contacts (name, email, subject, body) VALUES (@name, @email, @subject, @body)',
  );
  const findByIdStmt = db.prepare('SELECT * FROM contacts WHERE id = ?');
  const findAllStmt = db.prepare('SELECT * FROM contacts ORDER BY id DESC');
  const updateStatusStmt = db.prepare('UPDATE contacts SET status = ? WHERE id = ?');

  return {
    save({ name, email, subject, body }) {
      const { lastInsertRowid } = insertStmt.run({ name, email, subject, body });
      return findByIdStmt.get(lastInsertRowid);
    },

    findAll() {
      return findAllStmt.all();
    },

    findById(id) {
      return findByIdStmt.get(id);
    },

    updateStatus(id, status) {
      updateStatusStmt.run(status, id);
      return findByIdStmt.get(id);
    },
  };
}

module.exports = { createContactsRepository };
