import Match from './base/Match';

export default class End extends Match {
  constructor() {
    super('$');
  }
}

export const matchers = {
  '\\$' : () => new End()
}
