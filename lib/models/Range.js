import Match from './base/Match';
import Quantifier from './Quantifier';
import createParser from '../utils/parse';
import { matchers as literalMatchers } from './Literal';
import { matchers as controlMatchers } from './Meta/Control';
import { matchers as hexMatchers } from './Meta/Hex';
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

  constructor(start, end, text) {
    super(text);
    this.start = parse(start);
    this.end = parse(end);
  }
}

const controlMatch = Object.keys(controlMatchers)[0],
    hexMatch = Object.keys(hexMatchers)[0],
    hexMatchII = Object.keys(hexMatchers)[1],
    octalMatch = Object.keys(octalMatchers)[0],
    rangeElement = `${controlMatch}|${hexMatch}|${hexMatchII}|${octalMatch}|.`.replace(/[()]/g, '');

export const matchers = {
  [`(${rangeElement})-(${rangeElement})`] : ([text, start, end]) => new Range(start, end, text)
};
