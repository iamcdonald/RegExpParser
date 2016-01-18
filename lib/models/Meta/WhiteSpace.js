import Meta from './base/Meta';

export default class WhiteSpace extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\s' : ([text]) => new WhiteSpace(text)
  }
}
