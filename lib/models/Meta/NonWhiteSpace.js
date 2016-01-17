import Meta from './base/Meta';

export default class NonWhiteSpace extends Meta {}

export const matchers = {
  '\\\\S' : ([text]) => new NonWhiteSpace(text),
}
