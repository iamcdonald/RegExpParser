import Alternative from '../models/Alternative';

export default {
  '\\|(.*)' : ([text, content]) => new Alternative(content, text)
}
