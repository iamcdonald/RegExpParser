import Anchor from './base/Anchor';

export default class Start extends Anchor {}

export const matchers = {
  '\\^' : ([text]) => new Start(text)
}
