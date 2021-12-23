function Stack() {
  this._size = 0;
  this._storage = [];
}

Stack.prototype.length = function () {
  return this._size;
};

Stack.prototype.push = function (element) {
  this._size++;
  this._storage.push(element);
};

Stack.prototype.pop = function () {
  if (this._size > 0) {
    this._size--;
  }
  
  return this._storage.pop();
};

Stack.prototype.peek = function () {
  return this._storage[this._size];
};

Stack.prototype.isNotEmpty = function () {
  return this._size > 0;
  
};

Stack.prototype.isEmpty = function () {
  return this._size === 0;
};

export default Stack;
