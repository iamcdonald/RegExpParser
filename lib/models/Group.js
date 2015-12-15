import Match from './base/Match';
import Quantifier from './Quantifier';
import { matchers as startMatcher} from './Start';
import { matchers as endMatcher} from './End';
import { matchers as literalMatcher} from './Literal';
import { matchers as rangeMatcher} from './Range';
import { matchers as quantifierMatcher} from './Quantifier';
import { matchers as alternativeMatcher} from './Alternative';
import { matchers as characterClassMatcher} from './CharacterClass';
import createParser from '../utils/parse';

const groupMatcher = {
  '\\(.*' : ([text]) => new Group(text)
}

const parse = createParser([
    groupMatcher,
    alternativeMatcher,
    startMatcher,
    endMatcher,
    literalMatcher,
    rangeMatcher,
    quantifierMatcher,
    characterClassMatcher
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

export const matchers = groupMatcher;
