import { CurrencyFormatterPipe } from './currency-formatter.pipe';

describe('CurrencyFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
