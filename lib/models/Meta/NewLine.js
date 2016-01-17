import Meta from './base/Meta';

export default class NewLine extends Meta {}

export const matchers = {
  '\\\\n' : ([text]) => new NewLine(text)
}
