import { WordcasePipe } from './wordcase.pipe';

describe('WordcasePipe', () => {
  it('create an instance', () => {
    const pipe = new WordcasePipe();
    expect(pipe).toBeTruthy();
  });
});
