import Meta from './base/Meta';

export default class NonWordChar extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\W' : ([text]) => new NonWordChar(text)
  }
}
