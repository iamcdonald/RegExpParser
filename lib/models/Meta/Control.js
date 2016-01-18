import Meta from './base/Meta';

export default class Control extends Meta {

  content;

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\c([a-zA-Z0-9])' : ([text, content]) => new Control(content, text)
  }
}
