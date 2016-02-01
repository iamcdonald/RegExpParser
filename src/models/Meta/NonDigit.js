import Meta from './base/Meta';

export default class NonDigit extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\D' : ([text]) => new NonDigit(text)
  }
}
