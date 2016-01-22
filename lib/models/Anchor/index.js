import { matchers as startTokenMatchers } from './StartToken';
import { matchers as endTokenMatchers } from './EndToken';
import { matchers as wordBoundary } from './WordBoundary';
import { matchers as nonWordBoundary } from './NonWordBoundary';

export const matchers = {
  priority: 3,
  patterns: [
      startTokenMatchers,
      endTokenMatchers,
      wordBoundary,
      nonWordBoundary
    ].reduce((matchers, matcher) => Object.assign(matchers, matcher.patterns), {})
}
