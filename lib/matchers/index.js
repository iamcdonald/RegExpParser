import startMatcher from './start';
import endMatcher from './end';
import literalMatcher from './literal';
import quantifierMatcher from './quantifier';
import rangeMatcher from './range';
import characterClassMatcher from './characterClass';
import alternativeMatcher from './alternative';

export default [
      startMatcher
    , endMatcher
    , literalMatcher
    , quantifierMatcher
    , rangeMatcher
    , characterClassMatcher
    , alternativeMatcher
  ].reduce((matchers = {}, matcherGrp) => {
    return Object.assign(matchers, matcherGrp);
  });
