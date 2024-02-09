import { ArrayJoinPipe } from './array-join.pipe';

describe('ArrayJoinPipe', () => {
  let pipe: ArrayJoinPipe;

  beforeEach(() => {
    pipe = new ArrayJoinPipe();
  });

  it('create an instance', () => {
    const pipe = new ArrayJoinPipe();
    expect(pipe).toBeTruthy();
  });

  it('should join the strings inside array', () => {
    const transformedString = pipe.transform(['sub', 'neet']);
    expect(transformedString).toEqual('sub,neet');
  });
});
