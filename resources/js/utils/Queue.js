class Queue {
  constructor() {
    this._size = 0;
    this._storage = [];
  }
  length() {
    return this._size;
  }
  push(element) {
    this._size++;
    this._storage.push(element);
  }
  pop() {
    if (this._size > 0) {
      this._size--;
    }

    return this._storage.shift();
  }
  peek() {
    return this._storage[this._size];
  }
  isNotEmpty() {
    return this._size > 0;
  }
  isEmpty() {
    return this._size === 0;
  }
}

export default Queue;
