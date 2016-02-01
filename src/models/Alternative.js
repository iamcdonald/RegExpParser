import Match from './base/Match';
import AlternativeOption from './AlternativeOption';
import { matchers as anchorMatchers } from './Anchor';
import { matchers as characterClassMatchers } from './CharacterClass';
import { matchers as groupMatchers } from './Group';
import { matchers as groupRefMatchers } from './GroupRef';
import { matchers as literalMatchers } from './Literal';
import { matchersWithoutBackSpace as metaMatchers } from './Meta';
import { matchers as quantifierMatchers } from './Quantifier';
import createParserWithMatchers from '../utils/createParserWithMatchers';


const alternativeMatchers = {
  priority: 4,
  patterns: {
    '\\|(.*)' : ([text, content]) => new Alternative(text, content)
  }
};

let _parse;
const parse = content => {
  if (!_parse) {
    _parse = createParserWithMatchers([
        alternativeMatchers,
        anchorMatchers,
        characterClassMatchers,
        groupMatchers,
        groupRefMatchers,
        literalMatchers,
        metaMatchers,
        quantifierMatchers
      ]);
  }
  return _parse(content);
}

export default class Alternative extends Match {

  content;

  constructor(text, content) {
    super(...arguments);
    const parsed = parse(content);
    if (parsed[0] instanceof Alternative) {
      this.content = parsed[0].content;
      return;
    }
    this.content = [new AlternativeOption(content, parsed)];
  }

}

export const matchers = alternativeMatchers;
