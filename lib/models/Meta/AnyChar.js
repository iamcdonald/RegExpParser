import Meta from './base/Meta';

export default class AnyChar extends Meta {}

export const matchers = {
  '\\.' : ([text]) => new AnyChar(text)
}
