import Match from './base/Match';

export default class AlternativeOption extends Match {

  content;

  constructor(content, text) {
    super(text);
    this.content = content;
  }
}
