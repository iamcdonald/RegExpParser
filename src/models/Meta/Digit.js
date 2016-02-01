import Meta from './base/Meta';

export default class Digit extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\d' : ([text]) => new Digit(text)
  }
}
