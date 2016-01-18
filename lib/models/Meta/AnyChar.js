import Meta from './base/Meta';

export default class AnyChar extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\.' : ([text]) => new AnyChar(text)
  }
}
