import Match from './base/Match';

export default class Quantifier extends Match {

  min;
  max;
  lazy = false;

  constructor(min, max, lazy = false, text) {
    super(text);
    this.min = min;
    this.max = max;
    this.lazy = lazy;
  }

}

export const matchers = {
  priority: 4,
  patterns: {
    '\\?(\\?)?'              : ([text, lazy]) => new Quantifier(0, 1, !!lazy, text),
    '\\*(\\?)?'              : ([text, lazy]) => new Quantifier(0, null, !!lazy, text),
    '\\+(\\?)?'              : ([text, lazy]) => new Quantifier(1, null, !!lazy, text),
    '{(\\d+)}(\\?)?'         : ([text, min, lazy]) => new Quantifier(parseInt(min, 10), parseInt(min, 10), !!lazy, text),
    '{(\\d+),(\\d+)?}(\\?)?' : ([text, min, max = null, lazy]) => new Quantifier(parseInt(min, 10), max && parseInt(max, 10) || null, !!lazy, text)
  }
};
