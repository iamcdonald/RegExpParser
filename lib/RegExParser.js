import Match from './models/base/Match';
import Quantifier from './models/Quantifier';
import { matchers as startMatcher} from './models/Start';
import { matchers as endMatcher} from './models/End';
import { matchers as literalMatcher} from './models/Literal';
import { matchers as rangeMatcher} from './models/Range';
import { matchers as quantifierMatcher} from './models/Quantifier';
import { matchers as groupMatcher} from './models/Group';
import { matchers as alternativeMatcher} from './models/Alternative';
import { matchers as characterClassMatcher} from './models/CharacterClass';
import createParser from './utils/parse'

const parse = createParser([
    groupMatcher,
    alternativeMatcher,
    startMatcher,
    endMatcher,
    literalMatcher,
    rangeMatcher,
    quantifierMatcher,
    characterClassMatcher
  ]);

export default class RegExParser extends Match {

  content;

  constructor(text) {
    super(text);
    this.content = parse(text);
  }
}
