import Meta from './base/Meta';

export default class NewLine extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\n' : ([text]) => new NewLine(text)
  }
}
