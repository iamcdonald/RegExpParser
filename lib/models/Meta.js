import Match from './base/Match';
import Quantifier from './Quantifier';

export const types = {
  ANY_CHAR: 'ANY_CHAR',
  WHITE_SPACE: 'WHITE_SPACE',
  NON_WHITE_SPACE: 'NON_WHITE_SPACE',
  WORD_CHAR: 'WORD_CHAR',
  NON_WORD_CHAR: 'NON_WORD_CHAR',
  DIGIT: 'DIGIT',
  NON_DIGIT: 'NON_DIGIT',
  HEX: 'HEX'
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
  '\\.': ([text]) => new Meta(types.ANY_CHAR, text, text),
  '\\\\s': ([text]) => new Meta(types.WHITE_SPACE, text, text),
  '\\\\S': ([text]) => new Meta(types.NON_WHITE_SPACE, text, text),
  '\\\\w': ([text]) => new Meta(types.WORD_CHAR, text, text),
  '\\\\W': ([text]) => new Meta(types.NON_WORD_CHAR, text, text),
  '\\\\d': ([text]) => new Meta(types.DIGIT, text, text),
  '\\\\D': ([text]) => new Meta(types.NON_DIGIT, text, text),
  '\\\\u(\\w{4})': ([text, content]) => new Meta(types.HEX, content, text),
  '\\\\x(\\w{2})': ([text, content]) => new Meta(types.HEX, content, text)
}
