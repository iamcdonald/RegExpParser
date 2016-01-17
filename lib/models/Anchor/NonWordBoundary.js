import Anchor from './base/Anchor';

export default class NonWordBoundary extends Anchor {}

export const matchers = {
  '\\\\B' : ([text]) => new NonWordBoundary(text)
}
