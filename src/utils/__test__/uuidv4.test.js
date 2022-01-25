import { uuidv4 } from '@src/utils';
import crypto from 'crypto';

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr = []) => crypto.randomBytes(arr.length),
  },
});

describe('uuidv4', () => {
  it('check format', () => {
    const guid = uuidv4();
    expect(guid.length).toBe(36);
    const arr = guid.split('-');
    expect(arr.length).toBe(5);
    expect(arr[0].length).toBe(8);
    expect(arr[1].length).toBe(4);
    expect(arr[2].length).toBe(4);
    expect(arr[3].length).toBe(4);
    expect(arr[4].length).toBe(12);
  });
});
