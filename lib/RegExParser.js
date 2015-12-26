import Match from './models/base/Match';
import Quantifier from './models/Quantifier';
import { matchers as startMatchers } from './models/Start';
import { matchers as endMatchers } from './models/End';
import { matchers as literalMatchers } from './models/Literal';
import { matchers as rangeMatchers } from './models/Range';
import { matchers as quantifierMatchers } from './models/Quantifier';
import { matchers as groupMatchers } from './models/Group';
import { matchers as groupRefMatchers } from './models/GroupRef';
import { matchers as alternativeMatchers } from './models/Alternative';
import { matchers as characterClassMatchers } from './models/CharacterClass';
import { matchers as metaMatchers } from './models/Meta';
import createParser from './utils/parse';
import * as groupIdGenerator from './utils/groupIdGenerator';

const parse = createParser([
    groupMatchers,
    groupRefMatchers,
    alternativeMatchers,
    startMatchers,
    endMatchers,
    literalMatchers,
    rangeMatchers,
    quantifierMatchers,
    characterClassMatchers,
    metaMatchers
  ]);

export default class RegExParser extends Match {

  content;

  constructor(text) {
    groupIdGenerator.reset();
    if (text instanceof RegExp) {
      text = text.toString().slice(1, -1);
    }
    super(text);
    this.content = parse(text);
  }
}
