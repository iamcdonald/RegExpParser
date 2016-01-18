import { matchers as anyCharMatchers } from './AnyChar';
import { matchers as whiteSpaceMatchers } from './WhiteSpace';
import { matchers as nonWhiteSpaceMatchers } from './NonWhiteSpace';
import { matchers as wordCharMatchers } from './WordChar';
import { matchers as nonWordCharMatchers } from './NonWordChar';
import { matchers as digitMatchers } from './Digit';
import { matchers as nonDigitMatchers } from './NonDigit';
import { matchers as hexMatchers } from './Hex';
import { matchers as controlMatchers } from './Control';
import { matchers as octalMatchers } from './Octal';
import { matchers as returnMatchers } from './Return';
import { matchers as newLineMatchers } from './NewLine';
import { matchers as tabMatchers } from './Tab';
import { matchers as backSpaceMatchers } from './BackSpace';

export const matchersWithoutBackSpace = [
    anyCharMatchers,
    whiteSpaceMatchers,
    nonWhiteSpaceMatchers,
    wordCharMatchers,
    nonWordCharMatchers,
    digitMatchers,
    nonDigitMatchers,
    hexMatchers,
    controlMatchers,
    octalMatchers,
    returnMatchers,
    newLineMatchers,
    tabMatchers
  ].reduce((matchers, matcher) => Object.assign(matchers, matcher), {});

export const matchers = Object.assign({}, matchersWithoutBackSpace, backSpaceMatchers);
