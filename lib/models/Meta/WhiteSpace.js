import Meta from './base/Meta';

export default class WhiteSpace extends Meta {}

export const matchers = {
  '\\\\s' : ([text]) => new WhiteSpace(text)
}
