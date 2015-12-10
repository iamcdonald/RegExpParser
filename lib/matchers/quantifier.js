import Quantifier from '../models/Quantifier';

export default {
  '\\?'                  : () => new Quantifier(0, 1, '?'),
  '\\*'                  : () => new Quantifier(0, null, '*'),
  '\\+'                  : () => new Quantifier(1, null, '+'),
  '{([0-9]+)}'           : ([text, min]) => new Quantifier(parseInt(min, 10), parseInt(min, 10), text),
  '{([0-9]+),([0-9]+)?}' : ([text, min, max = null]) => new Quantifier(parseInt(min, 10), max && parseInt(max, 10) || null, text)
}
