import Meta from './base/Meta';

export default class Octal extends Meta {

  content;

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\([0-3]?[0-7]{1,2})' : ([text, content]) => new Octal(content, text)
  }
}
