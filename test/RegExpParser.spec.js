import tape from 'tape';
import RegExpParser from '../lib/RegExpParser';
import { types } from '../lib/models/Meta';

const convertToClassHierarchy = (parsed) => {
  let { content = [] } = parsed;
  if (Array.isArray(content)) {
    content = content.map(convertToClassHierarchy)
  } else {
    content = convertToClassHierarchy(content);
  }
  return {
    [parsed.constructor.name]: content
  };
}

tape('RegExpParser', t => {

  t.test('setup', t => {

    t.test('handles being passed RegExp object', t => {
      t.plan(2)
      const expected = {
          text: 'ast',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser(/ast/);
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('throws error if passed bad RegExp', t => {
      t.plan(2)
      t.throws(() => new RegExpParser('as('), SyntaxError);
      t.throws(() => new RegExpParser('as(fgh[s]])?*'), SyntaxError);
    });

  });

  t.test('literal', t => {
    t.test('handles literal string', t => {
      t.plan(2)
      const expected = {
          text: 'ast',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('ast');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\\\ making any character literal', t => {
      t.plan(2);
      const expected = {
          text: 'a\\?',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\?',
              content: '?',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\?');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

  });

  t.test('meta', t => {

    t.test('handles . meta character - anything', t => {
      t.plan(2);
      const expected = {
          text: 'a.s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '.',
              content: '.',
              type: types.ANY_CHAR,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a.s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\s meta character - white-space', t => {
      t.plan(2);
      const expected = {
          text: 'a\\ss',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\s',
              content: '\\s',
              type: types.WHITE_SPACE,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\ss');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\S meta character - non-white-space', t => {
      t.plan(2);
      const expected = {
          text: 'a\\S*s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\S',
              content: '\\S',
              type: types.NON_WHITE_SPACE,
              quantifier: {
                min: 0,
                max: null,
                lazy: false,
                text: '*'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\S*s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\w meta character - word-char', t => {
      t.plan(2);
      const expected = {
          text: 'a\\ws',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\w',
              content: '\\w',
              type: types.WORD_CHAR,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\ws');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\W meta character - non-word-char', t => {
      t.plan(2);
      const expected = {
          text: 'a\\W*s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\W',
              content: '\\W',
              type: types.NON_WORD_CHAR,
              quantifier: {
                min: 0,
                max: null,
                lazy: false,
                text: '*'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\W*s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\d meta character - digit', t => {
      t.plan(2);
      const expected = {
          text: 'a\\ds',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\d',
              content: '\\d',
              type: types.DIGIT,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\ds');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\D meta character - non-digit', t => {
      t.plan(2);
      const expected = {
          text: 'a\\D*s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\D',
              content: '\\D',
              type: types.NON_DIGIT,
              quantifier: {
                min: 0,
                max: null,
                lazy: false,
                text: '*'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\D*s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\uYYYY meta character - hex (YYYY)', t => {
      t.plan(2);
      const expected = {
          text: 'a\\u1923?s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\u1923',
              content: '1923',
              type: types.HEX,
              quantifier: {
                min: 0,
                max: 1,
                lazy: false,
                text: '?'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\u1923?s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\xYY meta character - hex (YY)', t => {
      t.plan(2);
      const expected = {
          text: 'a\\x3as',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\x3a',
              content: '3a',
              type: types.HEX,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\x3as');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\cY meta character - control', t => {
      t.plan(2);
      const expected = {
          text: 'a\\c3as',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\c3',
              content: '3',
              type: types.CONTROL,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\c3as');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\ddd meta character - octal', t => {
      t.plan(2);
      const expected = {
          text: 'a\\010s',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\010',
              content: '010',
              type: types.OCTAL,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\010s');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\n meta character - new line', t => {
      t.plan(2);
      const expected = {
          text: 'a\\ns',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\n',
              content: '\\n',
              type: types.NEW_LINE,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\ns');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\r meta character - return', t => {
      t.plan(2);
      const expected = {
          text: 'a\\rg',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\r',
              content: '\\r',
              type: types.RETURN,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'g',
              content: 'g',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\rg');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\t meta character - tab', t => {
      t.plan(2);
      const expected = {
          text: 'a\\tg',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\t',
              content: '\\t',
              type: types.TAB,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'g',
              content: 'g',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\tg');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\b meta character - word-boundary', t => {
      t.plan(2);
      const expected = {
          text: 'a\\bg',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\b',
              content: '\\b',
              type: types.WORD_BOUNDARY,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'g',
              content: 'g',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\bg');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\B meta character - non-word-boundary', t => {
      t.plan(2);
      const expected = {
          text: 'a\\Bg',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\B',
              content: '\\B',
              type: types.NON_WORD_BOUNDARY,
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 'g',
              content: 'g',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a\\Bg');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Meta': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

  });

  t.test('quantifier', t => {

    t.test('handles ? quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'as?t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 0,
                max: 1,
                lazy: false,
                text: '?'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as?t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles ?? quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'as??t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 0,
                max: 1,
                lazy: true,
                text: '??'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as??t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles * quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'ast*',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 0,
                max: null,
                lazy: false,
                text: '*'
              }
            }
          ]
        },
        parsed = new RegExpParser('ast*');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles * quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'ast*?',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 0,
                max: null,
                lazy: true,
                text: '*?'
              }
            }
          ]
        },
        parsed = new RegExpParser('ast*?');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles + quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'a+st',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: null,
                lazy: false,
                text: '+'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a+st');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles + quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'a+?st',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: null,
                lazy: true,
                text: '+?'
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('a+?st');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x} quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'as{3}t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 3,
                max: 3,
                lazy: false,
                text: '{3}'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{3}t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x} quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'as{3}?t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 3,
                max: 3,
                lazy: true,
                text: '{3}?'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{3}?t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x,} quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'as{2,}t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 2,
                max: null,
                lazy: false,
                text: '{2,}'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{2,}t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x,} quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'as{2,}?t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 2,
                max: null,
                lazy: true,
                text: '{2,}?'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{2,}?t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x,y} quantifier - greedy', t => {
      t.plan(2);
      const expected = {
          text: 'as{2,190}t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 2,
                max: 190,
                lazy: false,
                text: '{2,190}'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{2,190}t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles {x,y} quantifier - lazy', t => {
      t.plan(2);
      const expected = {
          text: 'as{2,190}?t',
          content: [
            {
              text: 'a',
              content: 'a',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: 's',
              content: 's',
              quantifier: {
                min: 2,
                max: 190,
                lazy: true,
                text: '{2,190}?'
              }
            },
            {
              text: 't',
              content: 't',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('as{2,190}?t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

  });

  t.test('handles ^ token', t => {
    t.plan(2);
    const expected = {
        text: '^at',
        content: [
          {
            text: '^'
          },
          {
            text: 'a',
            content: 'a',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 't',
            content: 't',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          }
        ]
      },
      parsed = new RegExpParser('^at');
    t.deepEqual(parsed, expected);
    t.deepEqual(convertToClassHierarchy(parsed), {
      'RegExpParser': [
        { 'Start': [] },
        { 'Literal': { 'String': [] } },
        { 'Literal': { 'String': [] } }
      ]
    });
  });

  t.test('handles $ token', t => {
    t.plan(2);
    const expected = {
        text: 'at$',
        content: [
          {
            text: 'a',
            content: 'a',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 't',
            content: 't',
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
      },
      parsed = new RegExpParser('at$');
    t.deepEqual(parsed, expected);
    t.deepEqual(convertToClassHierarchy(parsed), {
      'RegExpParser': [
        { 'Literal': { 'String': [] } },
        { 'Literal': { 'String': [] } },
        { 'End': [] }
      ]
    });
  });

  t.test('character class', t => {

    t.test('handles [] character class', t => {
      t.plan(2);
      const expected = {
          text: '[a*f]',
          content: [
            {
              text: '[a*f]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '*',
                  content: '*',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
        },
        parsed = new RegExpParser('[a*f]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles [] character class - terminates earliest', t => {
      t.plan(2);
      const expected = {
          text: '[a*f]j]',
          content: [
            {
              text: '[a*f]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '*',
                  content: '*',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
            },
            {
              text: 'j',
              content: 'j',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: ']',
              content: ']',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }

          ]
        },
        parsed = new RegExpParser('[a*f]j]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          },
          { 'Literal': { 'String': [] } },
          { 'Literal': { 'String': [] } }
        ]
      });
    });

    t.test('handles [] character class - terminates earliest unless escaped', t => {
      t.plan(2);
      const expected = {
          text: '[a*f\\]j]',
          content: [
            {
              text: '[a*f\\]j]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '*',
                  content: '*',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '\\]',
                  content: ']',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'j',
                  content: 'j',
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
        },
        parsed = new RegExpParser('[a*f\\]j]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles [] character class containing range', t => {
      t.plan(2);
      const expected = {
          text: '[aw-z?f]',
          content: [
            {
              text: '[aw-z?f]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
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
                  text: '?',
                  content: '?',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
        },
        parsed = new RegExpParser('[aw-z?f]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Range': [] },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles [] character class containing backspace', t => {
      t.plan(2);
      const expected = {
          text: '[a\\bf]',
          content: [
            {
              text: '[a\\bf]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '\\b',
                  content: '\\b',
                  type: types.BACK_SPACE,
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
        },
        parsed = new RegExpParser('[a\\bf]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Meta': { 'String' : [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles [] character class containing forced literal', t => {
      t.plan(2);
      const expected = {
          text: '[a\\?f]',
          content: [
            {
              text: '[a\\?f]',
              negated: false,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '\\?',
                  content: '?',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
        },
        parsed = new RegExpParser('[a\\?f]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles [^] negated character class', t => {
      t.plan(2);
      const expected = {
          text: '[^atf]',
          content: [
            {
              text: '[^atf]',
              negated: true,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 't',
                  content: 't',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'f',
                  content: 'f',
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
        },
        parsed = new RegExpParser('[^atf]');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'CharacterClass': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

  });

  t.test('alternative', t => {
    t.test('handles | alternative', t => {
      t.plan(2);
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
                      content: 'a',
                      quantifier: {
                        min: 1,
                        max: 1,
                        lazy: false,
                        text: null
                      },
                    },
                    {
                      text: 'd',
                      content: 'd',
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
                      content: 't',
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
        },
        parsed = new RegExpParser('ad*|t')
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Alternative': [
              { 'AlternativeOption': [
                  { 'Literal': { 'String': [] } },
                  { 'Literal': { 'String': [] } }
                ]
              },
              { 'AlternativeOption': [
                  { 'Literal': { 'String': [] } }
                ]
              }
            ]
          }
        ]
      });
    });

    t.test('handles | alternative multiple', t => {
      t.plan(2);
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
                      content: 'a',
                      quantifier: {
                        min: 1,
                        max: 1,
                        lazy: false,
                        text: null
                      }
                    },
                    {
                      text: 'd',
                      content: 'd',
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
                      content: 't',
                      quantifier: {
                        min: 1,
                        max: 1,
                        lazy: false,
                        text: null
                      }
                    },
                    {
                      text: 'g',
                      content: 'g',
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
                      content: 't',
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
        },
        parsed = new RegExpParser('ad*|tg|t');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Alternative': [
              { 'AlternativeOption': [
                  { 'Literal': { 'String': [] } },
                  { 'Literal': { 'String': [] } }
                ]
              },
              { 'AlternativeOption': [
                  { 'Literal': { 'String': [] } },
                  { 'Literal': { 'String': [] } }
                ]
              },
              { 'AlternativeOption': [
                  { 'Literal': { 'String': [] } }
                ]
              }
            ]
          }
        ]
      });
    });

  });

  t.test('group', t => {
    t.test('handles () group', t => {
      t.plan(2);
      const expected = {
          text: '(ast)',
          content: [
            {
              text: '(ast)',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              groupId: 1,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 's',
                  content: 's',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 't',
                  content: 't',
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
        },
        parsed = new RegExpParser('(ast)');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles () group when nested', t => {
      t.plan(2);
      const expected = {
          text: '(as(q))',
          content: [
            {
              text: '(as(q))',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              groupId: 1,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 's',
                  content: 's',
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
                  groupId: 2,
                  content: [
                    {
                      text: 'q',
                      content: 'q',
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
        },
        parsed = new RegExpParser('(as(q))');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              {
                'Group': [
                  { 'Literal': { 'String': [] } }
                ]
              }
            ]
          }
        ]
      });
    });

    t.test('handles (?!) group - negative lookahead', t => {
      t.plan(2);
      const expected = {
          text: '(?!asq)',
          content: [
            {
              text: '(?!asq)',
              negativeLookahead: true,
              positiveLookahead: false,
              nonCapture: false,
              groupId: null,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 's',
                  content: 's',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'q',
                  content: 'q',
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
        },
        parsed = new RegExpParser('(?!asq)');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles (?=) group - positive lookahead', t => {
      t.plan(2);
      const expected = {
          text: '(?=asq)',
          content: [
            {
              text: '(?=asq)',
              negativeLookahead: false,
              positiveLookahead: true,
              nonCapture: false,
              groupId: null,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 's',
                  content: 's',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'q',
                  content: 'q',
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
        },
        parsed = new RegExpParser('(?=asq)');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

    t.test('handles (?:) group - non capture', t => {
      t.plan(2);
      const expected = {
          text: '(?:asq)',
          content: [
            {
              text: '(?:asq)',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: true,
              groupId: null,
              content: [
                {
                  text: 'a',
                  content: 'a',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 's',
                  content: 's',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'q',
                  content: 'q',
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
        },
        parsed = new RegExpParser('(?:asq)');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          }
        ]
      });
    });

  });

  t.test('group reference', t => {

    t.test('handles \\n group reference', t => {
      t.plan(2);
      const expected = {
          text: '(ptn)-\\1{3,6}',
          content: [
            {
              text: '(ptn)',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              groupId: 1,
              content: [
                {
                  text: 'p',
                  content: 'p',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 't',
                  content: 't',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: 'n',
                  content: 'n',
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
            },
            {
              text: '-',
              content: '-',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\1',
              content: '1',
              quantifier: {
                min: 3,
                max: 6,
                lazy: false,
                text: '{3,6}'
              }
            }
          ]
        },
        parsed = new RegExpParser('(ptn)-\\1{3,6}');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } },
              { 'Literal': { 'String': [] } }
            ]
          },
          { 'Literal': { 'String': [] } },
          { 'GroupRef': { 'String': [] } }
        ]
      });
    });

    t.test('handles \\n group reference - multiple figures', t => {
      t.plan(2);
      const expected = {
          text: '(p((t)(n)))((w)((h)(a))(t(!)))-\\11',
          content: [
            {
              text: '(p((t)(n)))',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              groupId: 1,
              content: [
                {
                  text: 'p',
                  content: 'p',
                  quantifier: {
                    min: 1,
                    max: 1,
                    lazy: false,
                    text: null
                  }
                },
                {
                  text: '((t)(n))',
                  negativeLookahead: false,
                  positiveLookahead: false,
                  nonCapture: false,
                  groupId: 2,
                  content: [
                    {
                      text: '(t)',
                      negativeLookahead: false,
                      positiveLookahead: false,
                      nonCapture: false,
                      groupId: 3,
                      content: [
                        {
                          text: 't',
                          content: 't',
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
                    },
                    {
                      text: '(n)',
                      negativeLookahead: false,
                      positiveLookahead: false,
                      nonCapture: false,
                      groupId: 4,
                      content: [
                        {
                          text: 'n',
                          content: 'n',
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
              ],
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '((w)((h)(a))(t(!)))',
              negativeLookahead: false,
              positiveLookahead: false,
              nonCapture: false,
              groupId: 5,
              content: [
                {
                  text: '(w)',
                  negativeLookahead: false,
                  positiveLookahead: false,
                  nonCapture: false,
                  groupId: 6,
                  content: [
                    {
                      text: 'w',
                      content: 'w',
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
                },
                {
                  text: '((h)(a))',
                  negativeLookahead: false,
                  positiveLookahead: false,
                  nonCapture: false,
                  groupId: 7,
                  content: [
                    {
                      text: '(h)',
                      negativeLookahead: false,
                      positiveLookahead: false,
                      nonCapture: false,
                      groupId: 8,
                      content: [
                        {
                          text: 'h',
                          content: 'h',
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
                    },
                    {
                      text: '(a)',
                      negativeLookahead: false,
                      positiveLookahead: false,
                      nonCapture: false,
                      groupId: 9,
                      content: [
                        {
                          text: 'a',
                          content: 'a',
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
                },
                {
                  text: '(t(!))',
                  negativeLookahead: false,
                  positiveLookahead: false,
                  nonCapture: false,
                  groupId: 10,
                  content: [
                    {
                      text: 't',
                      content: 't',
                      quantifier: {
                        min: 1,
                        max: 1,
                        lazy: false,
                        text: null
                      }
                    },
                    {
                      text: '(!)',
                      negativeLookahead: false,
                      positiveLookahead: false,
                      nonCapture: false,
                      groupId: 11,
                      content: [
                        {
                          text: '!',
                          content: '!',
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
              ],
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '-',
              content: '-',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            },
            {
              text: '\\11',
              content: '11',
              quantifier: {
                min: 1,
                max: 1,
                lazy: false,
                text: null
              }
            }
          ]
        },
        parsed = new RegExpParser('(p((t)(n)))((w)((h)(a))(t(!)))-\\11');
      t.deepEqual(parsed, expected);
      t.deepEqual(convertToClassHierarchy(parsed), {
        'RegExpParser': [
          {
            'Group': [
              { 'Literal': { 'String': [] } },
              {
                'Group': [
                  {
                    'Group': [
                      { 'Literal': { 'String': [] } }
                    ]
                  },
                  {
                    'Group': [
                      { 'Literal': { 'String': [] } }
                    ]
                  }
                ]
              }
            ]
          },
          {
            'Group': [
              {
                'Group': [
                  { 'Literal': { 'String': [] } }
                ]
              },
              {
                'Group': [
                  {
                    'Group': [
                      { 'Literal': { 'String': [] } }
                    ]
                  },
                  {
                    'Group': [
                      { 'Literal': { 'String': [] } }
                    ]
                  }
                ]
              },
              {
                'Group': [
                  { 'Literal': { 'String': [] } },
                  {
                    'Group': [
                      { 'Literal': { 'String': [] } }
                    ]
                  },
                ]
              },
            ]
          },
          { 'Literal': { 'String': [] } },
          { 'GroupRef': { 'String': [] } }
        ]
      });
    });

  });

  t.test('complex example', t => {
    t.plan(2);
    const expected = {
        text: 'hel{2}?[o0O]+\\s(wor{1,}l(d)*?)(?!\\?)!',
        content: [
          {
            text: 'h',
            content: 'h',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'e',
            content: 'e',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: 'l',
            content: 'l',
            quantifier: {
              min: 2,
              max: 2,
              lazy: true,
              text: '{2}?'
            }
          },
          {
            text: '[o0O]',
            negated: false,
            content: [
              {
                text: 'o',
                content: 'o',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
                  text: null
                }
              },
              {
                text: '0',
                content: '0',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
                  text: null
                }
              },
              {
                text: 'O',
                content: 'O',
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
              max: null,
              lazy: false,
              text: '+'
            }
          },
          {
            text: '\\s',
            content: '\\s',
            type: types.WHITE_SPACE,
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          },
          {
            text: '(wor{1,}l(d)*?)',
            negativeLookahead: false,
            positiveLookahead: false,
            nonCapture: false,
            groupId: 1,
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            },
            content: [
              {
                text: 'w',
                content: 'w',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
                  text: null
                }
              },
              {
                text: 'o',
                content: 'o',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
                  text: null
                }
              },
              {
                text: 'r',
                content: 'r',
                quantifier: {
                  min: 1,
                  max: null,
                  lazy: false,
                  text: '{1,}'
                }
              },
              {
                text: 'l',
                content: 'l',
                quantifier: {
                  min: 1,
                  max: 1,
                  lazy: false,
                  text: null
                }
              },
              {
                text: '(d)',
                negativeLookahead: false,
                positiveLookahead: false,
                nonCapture: false,
                groupId: 2,
                content: [
                  {
                    text: 'd',
                    content: 'd',
                    quantifier: {
                      min: 1,
                      max: 1,
                      lazy: false,
                      text: null
                    }
                  }
                ],
                quantifier: {
                  min: 0,
                  max: null,
                  lazy: true,
                  text: '*?'
                }
              }
            ]
          },
          {
            text: '(?!\\?)',
            negativeLookahead: true,
            positiveLookahead: false,
            nonCapture: false,
            groupId: null,
            content: [
              {
                text: '\\?',
                content: '?',
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
          },
          {
            text: '!',
            content: '!',
            quantifier: {
              min: 1,
              max: 1,
              lazy: false,
              text: null
            }
          }
        ]
      },
      parsed = new RegExpParser('hel{2}?[o0O]+\\s(wor{1,}l(d)*?)(?!\\?)!');
    t.deepEqual(parsed, expected);
    t.deepEqual(convertToClassHierarchy(parsed), {
      'RegExpParser': [
        { 'Literal': { 'String': [] } },
        { 'Literal': { 'String': [] } },
        { 'Literal': { 'String': [] } },
        {
          'CharacterClass': [
            { 'Literal': { 'String': [] } },
            { 'Literal': { 'String': [] } },
            { 'Literal': { 'String': [] } },
          ]
        },
        { 'Meta': { 'String': [] } },
        {
          'Group': [
            { 'Literal': { 'String': [] } },
            { 'Literal': { 'String': [] } },
            { 'Literal': { 'String': [] } },
            { 'Literal': { 'String': [] } },
            {
              'Group': [
                { 'Literal': { 'String': [] } }
              ]
            }
          ]
        },
        {
          'Group': [
            { 'Literal': { 'String': [] } },
          ]
        },
        { 'Literal': { 'String': [] } }
      ]
    });
  });

});
