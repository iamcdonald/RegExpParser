import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as rangeMatchers } from './Range';
import { matchers as metaMatchers } from './Meta';
import { matchers as literalMatchers } from './Literal';
import createParser from '../utils/parse';


const parse = createParser([
    rangeMatchers,
    metaMatchers,
    literalMatchers
  ]);

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
