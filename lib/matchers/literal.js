import Literal from '../models/Literal';

export default {
  '[^\\\[(?*+.{^|](?!-)' : ([text]) => new Literal(text)
}
