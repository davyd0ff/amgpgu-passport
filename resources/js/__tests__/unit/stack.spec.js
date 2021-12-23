import Stack from '@/utils/Stack';

describe('Stack test', () => {
  let stack = null;

  beforeEach(() => {
    stack = new Stack();
  });

  it('after create, stack has length equals 0', () => {
    expect(stack.length()).toBe(0);
  });

  it('can push item and length changed', () => {
    stack.push(1);

    expect(stack.length()).toBe(1);
  });

  it('can pop item', () => {
    const testItem = 'test';
    stack.push(1);
    stack.push(testItem);

    const itemPop = stack.pop();

    expect(stack.length()).toBe(1);
    expect(itemPop).toBe(testItem);
  });

  it('if stack has no item, pop() returns undefined', () => {
    const itemPop = stack.pop();

    expect(itemPop).toBeUndefined();
    expect(stack.length()).toBe(0);
  });

  it('if stack has no item, method isNotEmpty() returns false', () => {
    expect(stack.isNotEmpty()).toBeFalsy();
  });

  it('if stack has items, then method isNotEmpty() returns true', () => {
    stack.push('some value');

    expect(stack.isNotEmpty()).toBeTruthy();
  });
});
