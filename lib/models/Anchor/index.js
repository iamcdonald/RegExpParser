import { matchers as startMatchers } from './Start';
import { matchers as endMatchers } from './End';
import { matchers as wordBoundary } from './WordBoundary';
import { matchers as nonWordBoundary } from './NonWordBoundary';

export const matchers = {
  priority: 3,
  patterns: [
      startMatchers,
      endMatchers,
      wordBoundary,
      nonWordBoundary
    ].reduce((matchers, matcher) => Object.assign(matchers, matcher.patterns), {})
}
