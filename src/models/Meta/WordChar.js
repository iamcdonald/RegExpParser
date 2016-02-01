import Meta from './base/Meta';

export default class WordChar extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\w' : ([text]) => new WordChar(text)
  }
}
