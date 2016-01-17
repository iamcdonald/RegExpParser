import Meta from './base/Meta';

export default class BackSpace extends Meta {}

export const matchers = {
  '\\\\b' : ([text]) => new BackSpace(text)
}
