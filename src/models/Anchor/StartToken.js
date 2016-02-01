import Anchor from './base/Anchor';

export default class StartToken extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\^' : ([text]) => new StartToken(text)
  }
}
