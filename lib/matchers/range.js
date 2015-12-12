import Range from '../models/Range';

export default {
  '([^\\[(?*+.{^])-([^\\[(?*+.{^])' : ([text, start, end]) => new Range(start, end, text)
}
