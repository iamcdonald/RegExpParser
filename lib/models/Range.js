import Match from './base/Match';
import Quantifier, { matchers as quantifierMatchers } from './Quantifier';

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

const quantifierMatchersAsString = Object.keys(quantifierMatchers).reduce((str, matcher) => str ? `${str}|${matcher}` : matcher);

export const matchers = {
  [`(\\w)-(\\w)(?!${quantifierMatchersAsString})`] : ([text, start, end]) => new Range(start, end, text)
}
console.log('quanto', matchers);
