import RegExpParser from '../lib/parser';
import tape from 'tape';

tape('handles flat string', t => {
  t.plan(1)
  const expected = {
      content: [
        {
          text: 'a',
          quantifier: {
            min: 1,
            max: 1,
            text: null
          }
        },
        {
          text: 's',
          quantifier: {
            min: 1,
            max: 1,
            text: null
          }
        },
        {
          text: 't',
          quantifier: {
            min: 1,
            max: 1,
            text: null
          }
        }
      ],
      text: 'ast',
      quantifier: {
        min: 1,
        max: 1,
        text: null
      }
    };
  t.deepEqual(new RegExpParser('ast'), expected);
});

tape('handles ? quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 0,
          max: 1,
          text: '?'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'as?t',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('as?t'), expected)
});

tape('handles * quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 0,
          max: null,
          text: '*'
        }
      }
    ],
    text: 'ast*',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('ast*'), expected)
});

tape('handles + quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: null,
          text: '+'
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'a+st',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('a+st'), expected)
});

tape('handles {x} quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 3,
          max: 3,
          text: '{3}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'as{3}t',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('as{3}t'), expected)
});

tape('handles {x,} quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: null,
          text: '{2,}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'as{2,}t',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('as{2,}t'), expected)
});

tape('handles {x,y} quantifier', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: 190,
          text: '{2,190}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'as{2,190}t',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('as{2,190}t'), expected)
});

tape('handles ranges x-y', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 's-w',
        start: 's',
        end: 'w',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: 'as-wt',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('as-wt'), expected)
});

tape('handles ^ token', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: '^'
      },
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ],
    text: '^at',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('^at'), expected)
});

tape('handles $ token', t => {
  t.plan(1);
  const expected = {
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      },
      {
        text: '$'
      }
    ],
    text: 'at$',
    quantifier: {
      min: 1,
      max: 1,
      text: null
    }
  };
  t.deepEqual(new RegExpParser('at$'), expected)
});
