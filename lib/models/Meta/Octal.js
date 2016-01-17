import Meta from './base/Meta';

export default class Octal extends Meta {

  content;

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

export const matchers = {
  '\\\\(\\d{3})' : ([text, content]) => new Octal(content, text),
}
