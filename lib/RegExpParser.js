import Match from './models/base/Match';
import { matchers as startMatchers } from './models/Start';
import { matchers as endMatchers } from './models/End';
import { matchers as literalMatchers } from './models/Literal';
import Quantifier, { matchers as quantifierMatchers } from './models/Quantifier';
import { matchers as groupMatchers } from './models/Group';
import { matchers as groupRefMatchers } from './models/GroupRef';
import { matchers as alternativeMatchers } from './models/Alternative';
import { matchers as characterClassMatchers } from './models/CharacterClass';
import { matchers as metaMatchers } from './models/Meta';
import createParser from './utils/parse';
import * as groupIdGenerator from './utils/groupIdGenerator';

let _parse;
const parse = content => {
  if (!_parse) {
    _parse = createParser([
        groupMatchers,
        groupRefMatchers,
        alternativeMatchers,
        startMatchers,
        endMatchers,
        literalMatchers,
        quantifierMatchers,
        characterClassMatchers,
        metaMatchers
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
