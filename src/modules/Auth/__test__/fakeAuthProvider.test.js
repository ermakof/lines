import { signIn, signOut } from '@src/modules/Auth/fakeAuthProvider';

Object.defineProperty(window, 'crypto', {
  value: { getRandomValues: () => '123-123-123-123' },
});

describe('fakeAuthProvider', () => {
  it('success signIn => user profile', () => {
    const userInfo = { login: 'user', password: '123' };
    return signIn(userInfo).then((data) => {
      expect(data.login).toEqual('user');
      expect(data.password).toEqual('123');
      expect(data.token.length).toEqual(36);
    });
  });

  it('fail signIn => error message', () => {
    expect.assertions(1);
    // eslint-disable-next-line jest/no-conditional-expect
    return signIn(undefined).catch((data) => expect(data).toEqual('Нет данных о пользователе!'));
  });

  it('success signOut', () => {
    return signOut().then((data) => {
      expect(data).toEqual(true);
    });
  });
});
