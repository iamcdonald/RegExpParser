import Meta from './base/Meta';

export default class Digit extends Meta {}

export const matchers = {
  '\\\\d' : ([text]) => new Digit(text)
}
