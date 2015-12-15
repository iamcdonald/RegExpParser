import Match from './base/Match';
import Quantifier, { matchers as quantifierMatchers } from './Quantifier';

export default class Literal extends Match {

  content;
  quantifier = new Quantifier(1, 1);

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

const quantifierMatchersAsString = Object.keys(quantifierMatchers).reduce((str, matcher) => str ? `${str}|${matcher}` : matcher);

export const matchers = {
  [`[^?*\\\\+|[({.](?!-\w(?!${quantifierMatchersAsString}))`]  : ([text]) => new Literal(text, text),
  '\\\\([^sSdDwW.])'                                           : ([text, content]) => new Literal(content, text)
}
