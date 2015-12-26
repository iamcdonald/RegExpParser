import Match from './base/Match';
import Quantifier from './Quantifier';
import Range from './Range';
import Literal from './Literal';
import Meta, { types } from './Meta';
import createParser from '../utils/parse';

const parse = createParser([{
      '(\\w)-(\\w)'  : ([text, start, end]) => new Range(start, end, text),
      '[^\\\\](?!-)' : ([char]) => new Literal(char, char),
      '\\\\([^b])'   : ([text, char]) =>  new Literal(char, text),
      '\\\\b'        : ([text]) => new Meta(types.BACK_SPACE, text, text)
    }]);

export default class CharacterClass extends Match {

  content;
  negated;
  quantifier = new Quantifier(1, 1);

  constructor(content, negated, text) {
    super(text);
    this.content = parse(content);
    this.negated = negated;
  }

}

export const matchers = {
  '\\[(\\^)?((\\\\]|[^\\]])*)\\]' : ([text, negated, content]) => new CharacterClass(content, !!negated, text)
}
