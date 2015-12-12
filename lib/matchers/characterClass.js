import CharacterClass from '../models/CharacterClass';

export default {
  '\\[(\\^)?([^\\[\\]]*)\\]' : ([text, negated, content]) => new CharacterClass(content, negated, text)
}
