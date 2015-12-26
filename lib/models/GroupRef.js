import Match from './base/Match';
import Quantifier from './Quantifier';

export default class GroupRef extends Match {

  content;
  quantifier = new Quantifier(1, 1);

  constructor(content, text) {
    super(text);
    this.content = content;
  }

}

export const matchers = {
  '\\\\(\\d{1,2})(?!\\d)': ([text, content]) => new GroupRef(content, text)
}
