import startMatcher from './start';
import endMatcher from './end';
import literalMatcher from './literal';
import quantifierMatcher from './quantifier';
import rangeMatcher from './range';

export default [
      startMatcher
    , endMatcher
    , literalMatcher
    , quantifierMatcher
    , rangeMatcher
  ].reduce((matchers = {}, matcherGrp) => {
    return Object.assign(matchers, matcherGrp);
  });
