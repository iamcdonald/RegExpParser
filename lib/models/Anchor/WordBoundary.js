import Anchor from './base/Anchor';

export default class WordBoundary extends Anchor {}

export const matchers = {
  '\\\\b' : ([text]) => new WordBoundary(text)
}
