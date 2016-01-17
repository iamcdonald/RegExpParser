import Meta from './base/Meta';

export default class WordChar extends Meta {}

export const matchers = {
  '\\\\w' : ([text]) => new WordChar(text)
}
