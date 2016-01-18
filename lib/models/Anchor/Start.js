import Anchor from './base/Anchor';

export default class Start extends Anchor {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\^' : ([text]) => new Start(text)
  }
}
