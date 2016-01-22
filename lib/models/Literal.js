import Match from './base/Match';
import Quantifier from './Quantifier';

export default class Literal extends Match {

  quantifier = new Quantifier(1, 1);

}

export const matchers = {
  priority: 5,
  patterns: {
    '(?:\\\\)?(.)' : ([text, content]) => new Literal(text, content)
  }
}
