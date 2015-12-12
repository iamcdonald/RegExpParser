import Match from './base/Match';
import Quantifier from './Quantifier';
import Literal from './Literal';

export default class CharacterClass extends Match {

  content;
  negated;
  quantifier = new Quantifier(1, 1);

  constructor(content, negated, text) {
    super(text);
    this.content = content.split('').map(char => new Literal(char));
    this.negated = !!negated;
  }

}
