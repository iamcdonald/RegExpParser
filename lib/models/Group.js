import Match from './base/Match';
import Quantifier from './Quantifier';
import parse from '../utils/parse';

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
