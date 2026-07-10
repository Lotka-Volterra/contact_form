const { STATUSES, isValidStatus, labelFor } = require('./contactStatus');

describe('STATUSES', () => {
  it('lists the three internal status codes', () => {
    expect(STATUSES).toEqual(['new', 'in_progress', 'resolved']);
  });
});

describe('isValidStatus', () => {
  it('returns true for a known status code', () => {
    expect(isValidStatus('in_progress')).toBe(true);
  });

  it('returns false for an unknown status code', () => {
    expect(isValidStatus('archived')).toBe(false);
  });
});

describe('labelFor', () => {
  it('returns the Japanese label for each known status code', () => {
    expect(labelFor('new')).toBe('新規');
    expect(labelFor('in_progress')).toBe('対応中');
    expect(labelFor('resolved')).toBe('解決済み');
  });
});
