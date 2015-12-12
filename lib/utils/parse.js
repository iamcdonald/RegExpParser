import matchers from '../matchers';
import Quantifier from '../models/Quantifier';
import flattenAlternatives from './flattenAlternatives';

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

export default (content) => {
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
  arr = flattenAlternatives(arr);
  return arr;
}
