import Match from './base/Match';
import Quantifier from './Quantifier';

export default class Range extends Match {

  start;
  end;
  quantifier = new Quantifier(1, 1);

  constructor(start, end, text) {
    super(text)
    this.start = start;
    this.end = end;
  }
}
