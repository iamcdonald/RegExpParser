import Match from './base/Match';

export default class Quantifier extends Match {

  min;
  max;

  constructor(min, max, text) {
    super(text);
    this.min = min;
    this.max = max;
  }

}
