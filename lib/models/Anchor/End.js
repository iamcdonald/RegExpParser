import Anchor from './base/Anchor';

export default class End extends Anchor {}

export const matchers = {
  '\\$' : ([text]) => new End(text)
}
