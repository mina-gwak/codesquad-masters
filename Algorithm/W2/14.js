/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function(strs) {
  const [firstWord = "", ...words] = strs;
  let answer = '';

  if (!firstWord) return "";
  if (!words.length) return firstWord;

  for (let char of firstWord.split('')) {
    for (let word of words) {
      if (!word.startsWith(`${answer}${char}`)) return answer;
    }
    answer += char;
  }

  return answer;
};