import Anchor from './base/Anchor';

export default class NonWordBoundary extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\B' : ([text]) => new NonWordBoundary(text)
  }
}
