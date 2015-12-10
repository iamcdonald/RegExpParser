import Match from './Match';
import Quantifier from '../Quantifier';
import matchers from '../../matchers';

const take = content => {
  const types = Object.keys(matchers);
  let i,
    match;
  for (i = 0; i < types.length; i++) {
    match = content.match(new RegExp(`^${types[i]}`));
    if (match) {
      match = matchers[types[i]](match);
      content = content.replace(match.text, '');
      return {
        match,
        content
      };
    }
  }
}

const parse = content => {
  let arr = [];
  while (content) {
    const { content: c, match } = take(content);
    content = c;
    if (match instanceof Quantifier) {
      arr[arr.length - 1].quantifier = match;
      continue;
    }
    arr.push(match);
  }
  return arr;
}

export default class Expr extends Match {

  content;
  quantifier = new Quantifier(1, 1);

  constructor(text) {
    super(text);
    this.content = parse(text);
  }

}
