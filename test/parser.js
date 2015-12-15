import RegExpParser from '../lib/RegExParser';
import tape from 'tape';

tape('handles literal string', t => {
  t.plan(1)
  const expected = {
      text: 'ast',
      content: [
        {
          text: 'a',
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        },
        {
          text: 's',
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        },
        {
          text: 't',
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('ast'), expected);
});

tape('handles ? quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'as?t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 0,
          max: 1,
          lazy: false,
          text: '?'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as?t'), expected)
});

tape('handles ?? quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'as??t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 0,
          max: 1,
          lazy: true,
          text: '??'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as??t'), expected)
});

tape('handles * quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'ast*',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 0,
          max: null,
          lazy: false,
          text: '*'
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('ast*'), expected)
});

tape('handles * quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'ast*?',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 0,
          max: null,
          lazy: true,
          text: '*?'
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('ast*?'), expected)
});

tape('handles + quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'a+st',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: null,
          lazy: false,
          text: '+'
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('a+st'), expected)
});

tape('handles + quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'a+?st',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: null,
          lazy: true,
          text: '+?'
        }
      },
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('a+?st'), expected)
});

tape('handles {x} quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'as{3}t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 3,
          max: 3,
          lazy: false,
          text: '{3}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{3}t'), expected)
});

tape('handles {x} quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'as{3}?t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 3,
          max: 3,
          lazy: true,
          text: '{3}?'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{3}?t'), expected)
});

tape('handles {x,} quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,}t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: null,
          lazy: false,
          text: '{2,}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{2,}t'), expected)
});

tape('handles {x,} quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,}?t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: null,
          lazy: true,
          text: '{2,}?'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{2,}?t'), expected)
});

tape('handles {x,y} quantifier - greedy', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,190}t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: 190,
          lazy: false,
          text: '{2,190}'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{2,190}t'), expected)
});

tape('handles {x,y} quantifier - lazy', t => {
  t.plan(1);
  const expected = {
    text: 'as{2,190}?t',
    content: [
      {
        text: 'a',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 's',
        quantifier: {
          min: 2,
          max: 190,
          lazy: true,
          text: '{2,190}?'
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as{2,190}?t'), expected)
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
          lazy: false,
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
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('as-wt'), expected)
});

tape('handles x-y followed by quantifier', t => {
  t.plan(1);
  const expected = {
    text: 's-w?',
    content: [
      {
        text: 's',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: '-',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      },
      {
        text: 'w',
        quantifier: {
          min: 0,
          max: 1,
          lazy: false,
          text: '?'
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('s-w?'), expected)
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
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
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
          lazy: false,
          text: null
        }
      },
      {
        text: 't',
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
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

tape('handles [] character class', t => {
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
              lazy: false,
              text: null
            }
          },
          {
            text: '*',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'f',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          }
        ],
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('[a*f]'), expected)
});

tape('handles [] character class containing range', t => {
  t.plan(1);
  const expected = {
    text: '[aw-zf]',
    content: [
      {
        text: '[aw-zf]',
        negated: false,
        content: [
          {
            text: 'a',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'w-z',
            start: 'w',
            end: 'z',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'f',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          }
        ],
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
          text: null
        }
      }
    ]
  };
  t.deepEqual(new RegExpParser('[aw-zf]'), expected)
});

tape('handles [^] negated character class', t => {
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
              lazy: false,
              text: null
            }
          },
          {
            text: 't',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'f',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          }
        ],
        quantifier: {
          min: 1,
          max: 1,
          lazy: false,
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
                  lazy: false,
                  text: null
                },
              },
              {
                text: 'd',
                quantifier: {
                  min: 0,
                  max: null,
                  lazy: false,
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
                  lazy: false,
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
                  lazy: false,
                  text: null
                }
              },
              {
                text: 'd',
                quantifier: {
                  min: 0,
                  max: null,
                  lazy: false,
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
                  lazy: false,
                  text: null
                }
              },
              {
                text: 'g',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
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
                  lazy: false,
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

tape('handles () group', t => {
  t.plan(1);
  const expected = {
      text: '(ast)',
      content: [
        {
          text: '(ast)',
          negativeLookahead: false,
          positiveLookahead: false,
          nonCapture: false,
          content: [
            {
              text: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ],
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('(ast)'), expected)
});

tape('handles () group when nested', t => {
  t.plan(1);
  const expected = {
      text: '(as(q))',
      content: [
        {
          text: '(as(q))',
          negativeLookahead: false,
          positiveLookahead: false,
          nonCapture: false,
          content: [
            {
              text: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '(q)',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              content: [
                {
                  text: 'q',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                }
              ],
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ],
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('(as(q))'), expected)
});

tape('handles (?!) group - negative lookahead', t => {
  t.plan(1);
  const expected = {
      text: '(?!asq)',
      content: [
        {
          text: '(?!asq)',
          negativeLookahead: true,
          positiveLookahead: false,
          nonCapture: false,
          content: [
            {
              text: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'q',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ],
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('(?!asq)'), expected)
});

tape('handles (?=) group - positive lookahead', t => {
  t.plan(1);
  const expected = {
      text: '(?=asq)',
      content: [
        {
          text: '(?=asq)',
          negativeLookahead: false,
          positiveLookahead: true,
          nonCapture: false,
          content: [
            {
              text: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'q',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ],
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('(?=asq)'), expected)
});

tape('handles (?:) group - non capture', t => {
  t.plan(1);
  const expected = {
      text: '(?:asq)',
      content: [
        {
          text: '(?:asq)',
          negativeLookahead: false,
          positiveLookahead: false,
          nonCapture: true,
          content: [
            {
              text: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'q',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ],
          quantifier: {
            min: 1,
            max: 1,
            lazy: false,
            text: null
          }
        }
      ]
    };
  t.deepEqual(new RegExpParser('(?:asq)'), expected)
});
