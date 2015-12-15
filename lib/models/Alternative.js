import Match from './base/Match';
import AlternativeOption from './AlternativeOption';
import { matchers as startMatcher} from './Start';
import { matchers as endMatcher} from './End';
import { matchers as literalMatcher} from './Literal';
import { matchers as rangeMatcher} from './Range';
import { matchers as quantifierMatcher} from './Quantifier';
import { matchers as groupMatcher} from './Group';
import { matchers as characterClassMatcher} from './CharacterClass';
import createParser from '../utils/parse';


const alternativeMatcher = {
  '\\|(.*)' : ([text, content]) => new Alternative(content, text)
};

const parse = createParser([
    alternativeMatcher,
    startMatcher,
    endMatcher,
    literalMatcher,
    rangeMatcher,
    quantifierMatcher,
    groupMatcher,
    characterClassMatcher
  ]);

export default class Alternative extends Match {

  content;

  constructor(content, text) {
    super(text);
    const parsed = parse(content);
    if (parsed[0] instanceof Alternative) {
      this.content = parsed[0].content;
      return;
    }
    this.content = [new AlternativeOption(parsed, content)];
  }
}

export const matchers = alternativeMatcher;
