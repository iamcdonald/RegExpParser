import Quantifier from '../models/Quantifier';
import flattenAlternatives from './flattenAlternatives';
import Null from '../models/util/Null';

const take = (content, matcherObjs) => {
  let i,
    match;
  for (i = 0; i < matcherObjs.length; i++) {
    match = content.match(new RegExp(`^${matcherObjs[i].pattern}`));
    if (match) {
      match = matcherObjs[i].action(match);
      if (!(match instanceof Null)) {
        content = content.replace(match.text, '');
        return {
          match,
          content
        };
      }
    }
  }
}

const amalgamateMatchers = matchers =>  {
    return matchers
      .sort((a, b) => a.priority - b.priority)
      .reduce((all, matcher) => {
        let matcherObjs = Object.keys(matcher.patterns)
              .reduce((arr, key) => {
                  return arr.concat({
                      pattern: key,
                      action: matcher.patterns[key]
                    });
                  }, []);
        return all.concat(matcherObjs);
      }, []);
  };

export default (matchers) => {
  matchers = amalgamateMatchers(matchers);
  return content => {
    let arr = [];
    while (content) {
      const { content: c, match } = take(content, matchers);
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
}
