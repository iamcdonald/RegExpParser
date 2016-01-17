import Match from './models/base/Match';
import Quantifier, { matchers as quantifierMatchers } from './models/Quantifier';
import { matchers as anchorMatchers } from './models/Anchor';
import { matchers as literalMatchers } from './models/Literal';
import { matchers as groupMatchers } from './models/Group';
import { matchers as groupRefMatchers } from './models/GroupRef';
import { matchers as alternativeMatchers } from './models/Alternative';
import { matchers as characterClassMatchers } from './models/CharacterClass';
import { matchersWithoutBackSpace as metaMatchers } from './models/Meta';
import createParser from './utils/parse';
import * as groupIdGenerator from './utils/groupIdGenerator';

export { types as metaTypes } from './models/Meta';

let _parse;
const parse = content => {
  if (!_parse) {
    _parse = createParser([
        alternativeMatchers,
        metaMatchers,
        anchorMatchers,
        groupMatchers,
        groupRefMatchers,
        characterClassMatchers,
        quantifierMatchers,
        literalMatchers
      ]);
  }
  return _parse(content);
}

const verify = regex => {
  if (typeof regex === 'string') {
    regex  = new RegExp(regex);
  }
}

const convert = regex => {
  if (regex instanceof RegExp) {
    return regex.toString().slice(1, -1);
  }
  return regex;
}

export default class RegExpParser extends Match {

  content;

  constructor(input) {
    groupIdGenerator.reset();
    verify(input);
    const text = convert(input);
    super(text);
    this.content = parse(text);
  }
}
