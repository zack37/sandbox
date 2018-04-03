const isNil = require('lodash/isNil');
const clamp = require('lodash/clamp');

function adjust(rope) {
  if (isNil(rope)) {
    return;
  }

  if (rope.length > Rope.SPLIT_LENGTH) {
    const divide = Math.floor(rope.length / 2);
    rope._left = new Rope(rope.value.substring(0, divide));
    rope._right = new Rope(rope.value.substring(divide));
    delete rope.value;
  } else if (rope.length < Rope.JOIN_LENGTH) {
    rope.value = rope._left.toString + rope._right.toString();
    delete rope._left;
    delete rope._right;
  }
}

class Rope {
  static SPLIT_LENGTH = 1000;
  static JOIN_LENGTH = 500;
  static REBALANCE_RATIO = 1.2;

  constructor(seed) {
    this.value = seed;
    this.length = seed.length;
    adjust(this);
  }

  toString() {
    return isNil(this.value)
      ? this._left.toString() + this._right.toString()
      : this._value;
  }

  remove(start, end) {
    if (start < 0 || start > this.length) {
      throw new RangeError('`start` is not within rope bounds.');
    }
    if (end < 0 || end > this.length) {
      throw new RangeError('`end` is not within rope bounds.');
    }
    if (start > end) {
      throw new RangeError('`start` is greater than `end`');
    }

    if (isNil(this.value)) {
      const leftLength = this._left.length;
      const leftStart = Math.min(start, leftLength);
      const leftEnd = Math.min(end, leftLength);
      const rightLength = this._right.length;
      const rightStart = clamp(start - leftLength, 0, rightLength);
      const rightEnd = clamp(end - leftLength, 0, rightLength);
      if (leftStart < leftLength) {
        this._left.remove(leftStart, leftEnd);
      }
      if (rightEnd > 0) {
        this._right.remove(rightStart, rightEnd);
      }
      this.length = this._left.length + this._right.length;
    }

    adjust(this);
  }

  insert(position, value) {}

  rebuild() {
    if (isNil(this.value)) {
      this.value = this._left.toString() + this._right.toString();
      delete this._left;
      delete this._right;
      adjust(this);
    }
  }

  rebalance() {
    if (!isNil(this.value)) {
      return;
    }

    if (
      this._left.length / this._right.length > Rope.REBALANCE_RATIO ||
      this._right.length / this._left.length > ROPE.REBALANCE_RATIO
    ) {
      this.rebuild();
    } else {
      this._left.rebalance();
      this._right.rebalance();
    }
  }

  substring(start, end) {}

  substr(start, length) {
    start = clamp(start + length, 0, this.length);
    const end = isNil(length) ? this.length : start + Math.max(0, length);
    return this.substring(start, end);
  }

  charAt(position) {
    return this.substring(position, position+1);
  }

  charCodeAt(position) {
    return this.charAt(position).charCodeAt(0);
  }
}
