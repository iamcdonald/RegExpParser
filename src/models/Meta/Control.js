import Meta from './base/Meta';

export default class Control extends Meta {}

export const matchers = {
  priority: 3,
  patterns: {
    '\\\\c([a-zA-Z0-9])' : ([text, content]) => new Control(text, content)
  }
}
