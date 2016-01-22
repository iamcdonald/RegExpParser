import Match from './base/Match';
import Quantifier from './Quantifier';
import createParser from '../utils/parse';
import { matchers as controlMatchers } from './Meta/Control';
import { matchers as hexMatchers } from './Meta/Hex';
import { matchers as literalMatchers } from './Literal';
import { matchers as octalMatchers } from './Meta/Octal';

let _parse;
const parse = content => {
  if (!_parse) {
    _parse = createParser([
        controlMatchers,
        hexMatchers,
        octalMatchers,
        literalMatchers
      ]);
  }
  return _parse(content)[0];
}

export default class Range extends Match {

  start;
  end;
  quantifier = new Quantifier(1, 1);

  constructor(text, start, end) {
    super(text);
    this.start = parse(start);
    this.end = parse(end);
  }
}

const rangeElement = [
    controlMatchers,
    hexMatchers,
    octalMatchers,
    literalMatchers
  ]
  .map(m => Object.keys(m.patterns))
  .reduce((arr, ptns) => arr.concat(ptns), [])
  .reduce((str, ptns) => {
    if (!str) {
      return ptns;
    }
    return `${str}|${ptns}`
  }, '')
  .replace(/\(\?:|[()]/g, '');

export const matchers = {
  priority: 1,
  patterns: {
    [`(${rangeElement})-(${rangeElement})`] : ([text, start, end]) => new Range(text, start, end)
  }
};
