export default class Match {

  text;

  constructor(text = null, content = null) {
    this.text = text;
    if (content) {
      this.content = content
    }
  }

}
