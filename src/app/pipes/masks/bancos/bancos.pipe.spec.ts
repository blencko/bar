import { BancosPipe } from './bancos.pipe';

describe('BancosPipe', () => {
  it('create an instance', () => {
    const pipe = new BancosPipe();
    expect(pipe).toBeTruthy();
  });
});
