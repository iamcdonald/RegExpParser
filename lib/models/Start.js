import Match from './base/Match';

export default class Start extends Match {
  constructor() {
    super('^');
  }
}

export const matchers = {
  '\\^' : () => new Start()
}
