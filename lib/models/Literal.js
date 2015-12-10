import Match from './base/Match';
import Quantifier from './Quantifier';

export default class Literal extends Match {
  quantifier = new Quantifier(1, 1);
}
