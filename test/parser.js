import RegExpParser from '../lib/RegExParser';
import tape from 'tape';

tape('handles flat string', t => {
  t.plan(1)
  const expected = {
      text: 'ast',
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
      ]
    };
  t.deepEqual(new RegExpParser('ast'), expected);
});

tape('handles ? quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'as?t',
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
    ]
  };
  t.deepEqual(new RegExpParser('as?t'), expected)
});

tape('handles * quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'ast*',
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
    ]
  };
  t.deepEqual(new RegExpParser('ast*'), expected)
});

tape('handles + quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'a+st',
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
    ]
  };
  t.deepEqual(new RegExpParser('a+st'), expected)
});

tape('handles {x} quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'as{3}t',
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
    ]
  };
  t.deepEqual(new RegExpParser('as{3}t'), expected)
});

tape('handles {x,} quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,}t',
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
    ]
  };
  t.deepEqual(new RegExpParser('as{2,}t'), expected)
});

tape('handles {x,y} quantifier', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,190}t',
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
    ]
  };
  t.deepEqual(new RegExpParser('as{2,190}t'), expected)
});

tape('handles ranges x-y', t => {
  t.plan(1);
  const expected = {
    text: 'as-wt',
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
    ]
  };
  t.deepEqual(new RegExpParser('as-wt'), expected)
});

tape('handles ^ token', t => {
  t.plan(1);
  const expected = {
    text: '^at',
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
    ]
  };
  t.deepEqual(new RegExpParser('^at'), expected)
});

tape('handles $ token', t => {
  t.plan(1);
  const expected = {
    text: 'at$',
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
    ]
  };
  t.deepEqual(new RegExpParser('at$'), expected)
});

tape('handles [] charcter class', t => {
  t.plan(1);
  const expected = {
    text: '[a*f]',
    content: [
      {
        text: '[a*f]',
        negated: false,
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
            text: '*',
            quantifier: {
              min: 1,
              max: 1,
              text: null
            }
          },
          {
            text: 'f',
            quantifier: {
              min: 1,
              max: 1,
              text: null
            }
          }
        ],
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('[a*f]'), expected)
});

tape('handles [^] charcter class', t => {
  t.plan(1);
  const expected = {
    text: '[^atf]',
    content: [
      {
        text: '[^atf]',
        negated: true,
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
            text: 'f',
            quantifier: {
              min: 1,
              max: 1,
              text: null
            }
          }
        ],
        quantifier: {
          min: 1,
          max: 1,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('[^atf]'), expected)
});

tape('handles | alternative', t => {
  t.plan(1);
  const expected = {
    text: 'ad*|t',
    content: [
      {
        text: 'ad*|t',
        content: [
          {
            text: 'ad*',
            content: [
              {
                text: 'a',
                quantifier: {
                  min: 1,
                  max: 1,
                  text: null
                },
              },
              {
                text: 'd',
                quantifier: {
                  min: 0,
                  max: null,
                  text: '*'
                }
              }
            ]
          },
          {
            text: 't',
            content: [
              {
                text: 't',
                quantifier: {
                  min: 1,
                  max: 1,
                  text: null
                }
              }
            ]
          }
        ]
      },
    ]
  };
  t.deepEqual(new RegExpParser('ad*|t'), expected)
});

tape('handles | alternative multiple', t => {
  t.plan(1);
  const expected = {
    text: 'ad*|tg|t',
    content: [
      {
        text: 'ad*|tg|t',
        content: [
          {
            text: 'ad*',
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
                text: 'd',
                quantifier: {
                  min: 0,
                  max: null,
                  text: '*'
                }
              }
            ]
          },
          {
            text: 'tg',
            content: [
              {
                text: 't',
                quantifier: {
                  min: 1,
                  max: 1,
                  text: null
                }
              },
              {
                text: 'g',
                quantifier: {
                  min: 1,
                  max: 1,
                  text: null
                }
              }
            ]
          },
          {
            text: 't',
            content: [
              {
                text: 't',
                quantifier: {
                  min: 1,
                  max: 1,
                  text: null
                }
              }
            ]
          }
        ]
      }
    ]
  };
  t.deepEqual(new RegExpParser('ad*|tg|t'), expected)
});
