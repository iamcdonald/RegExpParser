import Meta from './base/Meta';

export default class NonDigit extends Meta {}

export const matchers = {
  '\\\\D' : ([text]) => new NonDigit(text)
}
