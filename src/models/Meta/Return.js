import Meta from './base/Meta';

export default class Return extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\r' : ([text]) => new Return(text)
  }
}
