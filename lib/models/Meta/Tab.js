import Meta from './base/Meta';

export default class Tab extends Meta {}

export const matchers = {
  '\\\\t' : ([text]) => new Tab(text)
}
