import Anchor from './base/Anchor';

export default class End extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\$' : ([text]) => new End(text)
  }
}
