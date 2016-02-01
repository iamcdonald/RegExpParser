export default class MatchError extends Error {

  name = 'MatchError';

  constructor(modelName, text) {
    super();
    this.name = 'MatchError';
    this.message = `${text} is not a match for ${modelName}`;
  }

}
