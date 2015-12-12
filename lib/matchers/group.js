import Group from '../models/Group';

export default {
  '\\(.*' : ([text]) => new Group(text)
}
