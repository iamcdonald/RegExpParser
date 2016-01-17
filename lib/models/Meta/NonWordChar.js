import Meta from './base/Meta';

export default class NonWordChar extends Meta {}

export const matchers = {
  '\\\\W' : ([text]) => new NonWordChar(text)
}
