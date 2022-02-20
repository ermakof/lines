import { delay } from '@src/utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

it('delay', () => {
  delay(100);
  expect(setTimeout).toHaveBeenCalledTimes(1);
});
