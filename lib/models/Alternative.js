import Match from './base/Match';
import AlternativeOption from './AlternativeOption';
import parse from '../utils/parse';

export default class Alternative extends Match {

  content;

  constructor(content, text) {
    super(text);
    const parsed = parse(content);
    if (parsed[0] instanceof Alternative) {
      this.content = parsed[0].content;
      return;
    }
    this.content = [new AlternativeOption(parsed, content)];
  }
}
