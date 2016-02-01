import Meta from './base/Meta';

export default class BackSpace extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\b' : ([text]) => new BackSpace(text)
  }
}
