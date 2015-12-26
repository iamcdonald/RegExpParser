import Match from './base/Match';
import AlternativeOption from './AlternativeOption';
import { matchers as startMatchers } from './Start';
import { matchers as endMatchers } from './End';
import { matchers as literalMatchers } from './Literal';
import { matchers as rangeMatchers } from './Range';
import { matchers as quantifierMatchers } from './Quantifier';
import { matchers as groupMatchers } from './Group';
import { matchers as groupRefMatchers } from './GroupRef';
import { matchers as characterClassMatchers } from './CharacterClass';
import { matchers as metaMatchers } from './Meta';
import createParser from '../utils/parse';


const alternativeMatchers = {
  '\\|(.*)' : ([text, content]) => new Alternative(content, text)
};

const parse = createParser([
    alternativeMatchers,
    startMatchers,
    endMatchers,
    literalMatchers,
    rangeMatchers,
    quantifierMatchers,
    groupMatchers,
    groupRefMatchers,
    characterClassMatchers,
    metaMatchers
  ]);

export default class Alternative extends Match {

  content;

  constructor(content, text) {
    super(text);
    const parsed = parse(content);
    if (parsed[0] instanceof Alternative) {
      this.content = parsed[0].content;
      return;
    }
    this.content = [new AlternativeOption(parsed, content)];
  }
}

export const matchers = alternativeMatchers;
