const { toJstDisplayString } = require('./dateFormatter');

describe('toJstDisplayString', () => {
  it('converts a UTC SQLite datetime string to JST (UTC+9)', () => {
    expect(toJstDisplayString('2026-07-10 13:07:28')).toBe('2026-07-10 22:07:28 (JST)');
  });

  it('rolls over to the next day when the JST offset crosses midnight', () => {
    expect(toJstDisplayString('2026-07-10 15:30:00')).toBe('2026-07-11 00:30:00 (JST)');
  });

  it('pads single-digit month, day, hour, minute, and second values', () => {
    expect(toJstDisplayString('2026-01-01 00:05:03')).toBe('2026-01-01 09:05:03 (JST)');
  });
});
