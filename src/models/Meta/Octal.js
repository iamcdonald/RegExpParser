import Meta from './base/Meta';

export default class Octal extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\([0-3]?[0-7]{1,2})' : ([text, content]) => new Octal(text, content)
  }
}
