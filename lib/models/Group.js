import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as alternativeMatchers } from './Alternative';
import { matchers as anchorMatchers } from './Anchor';
import { matchers as characterClassMatchers } from './CharacterClass';
import { matchers as groupRefMatchers } from './GroupRef';
import { matchers as literalMatchers } from './Literal';
import { matchersWithoutBackSpace as metaMatchers } from './Meta';
import { matchers as quantifierMatchers } from './Quantifier';
import createParser from '../utils/parse';
import * as groupIdGenerator from '../utils/groupIdGenerator';

const groupMatchers = {
  priority: 4,
  patterns: {
    '\\(.*' : ([text]) => new Group(text)
  }
}

let _parse;
const parse = content => {
  if (!_parse) {
    _parse = createParser([
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

const selectGroup = str => {
  str = str.split('');
  let map = {
      '(': 1,
      ')': -1
    },
    group = str.shift(),
    count = 1,
    char;
  while(str && count !== 0) {
    char = str.shift();
    if (map[char]) {
      count += map[char];
    }
    group += char;
  }
  return group;
}

const isNegativeLookahead = str => {
  return /\?!/.test(str);
}

const isPositiveLookahead = str => {
  return /\?=/.test(str);
}

const isNonCapture = str => {
  return /\?:/.test(str);
}

const getContent = str => {
  return str.match(/\((?:\?!|\?=|\?:)?(.*)\)/)[1];
}

export default class Group extends Match {

  content;
  negativeLookahead = false;
  positiveLookahead = false;
  nonCapture = false;
  quantifier = new Quantifier(1, 1);

  constructor(text) {
    text = selectGroup(text);
    super(text)
    this.negativeLookahead = isNegativeLookahead(text);
    this.positiveLookahead = isPositiveLookahead(text);
    this.nonCapture = isNonCapture(text);
    if (!this.nonCapture && !this.negativeLookahead && !this.positiveLookahead) {
      this.groupId = groupIdGenerator.getNextId();
    }
    this.content = parse(getContent(text));
  }
}

export const matchers = groupMatchers;
