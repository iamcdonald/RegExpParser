import Match from './models/base/Match';
import Quantifier from './models/Quantifier';
import parse from './utils/parse'

export default class RegExParser extends Match {

  content;

  constructor(text) {
    super(text);
    this.content = parse(text);
  }
}
