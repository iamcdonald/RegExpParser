import Meta from './base/Meta';

export default class Hex extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\u([a-zA-Z0-9]{4})' : ([text, content]) => new Hex(text, content),
    '\\\\x([a-zA-Z0-9]{2})' : ([text, content]) => new Hex(text, content)
  }
}
