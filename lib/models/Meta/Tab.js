import Meta from './base/Meta';

export default class Tab extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\t' : ([text]) => new Tab(text)
  }
}
