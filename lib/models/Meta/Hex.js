import Meta from './base/Meta';

export default class Hex extends Meta {

  content;

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

export const matchers = {
  '\\\\u([a-zA-Z0-9]{4})' : ([text, content]) => new Hex(content, text),
  '\\\\x([a-zA-Z0-9]{2})' : ([text, content]) => new Hex(content, text)
}
