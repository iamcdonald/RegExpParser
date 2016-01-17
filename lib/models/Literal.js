import Match from './base/Match';
import Quantifier from './Quantifier';

export default class Literal extends Match {

  content;
  quantifier = new Quantifier(1, 1);

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

export const matchers = {
  '(?:\\\\)?(.)' : ([text, content]) => new Literal(content, text)
}
