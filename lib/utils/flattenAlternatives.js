import Alternative from '../models/Alternative';
import AlternativeOption from '../models/AlternativeOption';

const getContentAsText = content => {
  return content.reduce((text, match) => {
      if (match instanceof AlternativeOption && text) {
        text += '|';
      }
      text += match.text;
      if (match.quantifier && match.quantifier.text) {
        return `${text}${match.quantifier.text}`;
      }
      return text;
    }, '');
}

export default (arr) => {
  if (arr[arr.length - 1] instanceof Alternative) {
    let alt = arr[arr.length -1];
    alt.content = [new AlternativeOption(arr.slice(0, -1), getContentAsText(arr.slice(0, -1)))].concat(alt.content);
    alt.text = getContentAsText(alt.content);
    return [alt];
  }
  return arr;
}
