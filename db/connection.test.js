const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createConnection } = require('./connection');

describe('createConnection', () => {
  it('creates the parent directory when it does not exist yet', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'contact-form-db-'));
    const dbPath = path.join(tmpDir, 'nested', 'contacts.sqlite');

    expect(() => createConnection(dbPath)).not.toThrow();
    expect(fs.existsSync(dbPath)).toBe(true);

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
