import Anchor from './base/Anchor';

export default class WordBoundary extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\b' : ([text]) => new WordBoundary(text)
  }
}
