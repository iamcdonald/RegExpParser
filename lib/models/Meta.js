import Match from './base/Match';
import Quantifier from './Quantifier';

export const types = {
  WHITE_SPACE: 'WHITE_SPACE',
  NON_WHITE_SPACE: 'NON_WHITE_SPACE'
}

export default class Meta extends Match {

  content;
  type;
  quantifier = new Quantifier(1, 1);

  constructor(type, content, text) {
    super(text);
    this.type = type;
    this.content = content;
  }
}

export const matchers = {
  '\\\\s': ([text]) => new Meta(types.WHITE_SPACE, text, text),
  '\\\\S': ([text]) => new Meta(types.NON_WHITE_SPACE, text, text)
}
