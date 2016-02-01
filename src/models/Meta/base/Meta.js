import Match from '../../base/Match';
import Quantifier from '../../Quantifier';

export default class Meta extends Match {

  quantifier = new Quantifier(1, 1);

  constructor() {
    super(...arguments);
  }
}
