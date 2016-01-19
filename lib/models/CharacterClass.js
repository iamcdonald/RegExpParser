import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as literalMatchers } from './Literal';
import { matchersWithoutAnyChar as metaMatchers } from './Meta';
import { matchers as rangeMatchers } from './Range';
import createParser from '../utils/parse';


const parse = createParser([
    literalMatchers,
    metaMatchers,
    rangeMatchers
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
  priority: 4,
  patterns: {
    '\\[(\\^)?((\\\\]|[^\\]])*)\\]' : ([text, negated, content]) => new CharacterClass(content, !!negated, text)
  }
}
