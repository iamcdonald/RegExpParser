import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as startMatchers} from './Start';
import { matchers as endMatchers} from './End';
import { matchers as literalMatchers} from './Literal';
import { matchers as rangeMatchers} from './Range';
import { matchers as quantifierMatchers} from './Quantifier';
import { matchers as alternativeMatchers} from './Alternative';
import { matchers as characterClassMatchers} from './CharacterClass';
import { matchers as metaMatchers} from './Meta';
import createParser from '../utils/parse';

const groupMatchers = {
  '\\(.*' : ([text]) => new Group(text)
}

const parse = createParser([
    groupMatchers,
    alternativeMatchers,
    startMatchers,
    endMatchers,
    literalMatchers,
    rangeMatchers,
    quantifierMatchers,
    characterClassMatchers,
    metaMatchers
  ]);

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
    this.content = parse(getContent(text));
    this.negativeLookahead = isNegativeLookahead(text);
    this.positiveLookahead = isPositiveLookahead(text);
    this.nonCapture = isNonCapture(text);
  }
}

export const matchers = groupMatchers;
