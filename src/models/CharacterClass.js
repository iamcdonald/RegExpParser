import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as literalMatchers } from './Literal';
import { matchersWithoutAnyChar as metaMatchers } from './Meta';
import { matchers as rangeMatchers } from './Range';
import createParserWithMatchers from '../utils/createParserWithMatchers';


const parse = createParserWithMatchers([
    literalMatchers,
    metaMatchers,
    rangeMatchers
  ]);

export default class CharacterClass extends Match {

  negated;
  quantifier = new Quantifier(1, 1);

  constructor(text, content, negated) {
    super(...arguments);
    this.content = parse(this.content);
    this.negated = negated;
  }

}

export const matchers = {
  priority: 4,
  patterns: {
    '\\[(\\^)?((\\\\]|[^\\]])*)\\]' : ([text, negated, content]) => new CharacterClass(text, content, !!negated)
  }
}
