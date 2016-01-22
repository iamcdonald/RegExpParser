import Anchor from './base/Anchor';

export default class EndToken extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\$' : ([text]) => new EndToken(text)
  }
}
