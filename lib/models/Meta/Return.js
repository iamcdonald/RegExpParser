import Meta from './base/Meta';

export default class Return extends Meta {}

export const matchers = {
  '\\\\r' : ([text]) => new Return(text),
}
