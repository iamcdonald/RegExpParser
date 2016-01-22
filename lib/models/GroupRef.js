import Match from './base/Match';
import Quantifier from './Quantifier';
import * as groupIdGenerator from '../utils/groupIdGenerator';
import Null from './util/Null';

export default class GroupRef extends Match {

  quantifier = new Quantifier(1, 1);

  constructor(text, content) {
    let tempContent = content,
      currentGroupCount = groupIdGenerator.getId();
    if (!currentGroupCount) {
      super();
      return new Null();
    }
    while (tempContent && (currentGroupCount < parseInt(tempContent, 10))) {
      tempContent = tempContent.slice(0, -1);
    }
    if (!tempContent) {
      super();
      return new Null();
    }
    text.replace(content, tempContent);
    content = tempContent;
    super(text, content);
  }

}

export const matchers = {
  priority: 2,
  patterns: {
    '\\\\(\\d+)': ([text, content]) => new GroupRef(text, content)
  }
}
