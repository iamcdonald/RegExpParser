import Meta from './base/Meta';

export default class NonWhiteSpace extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\S' : ([text]) => new NonWhiteSpace(text)
  }
}
