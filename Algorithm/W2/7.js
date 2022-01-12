/**
 * @param {number} x
 * @return {number}
 */

var reverse = function(x) {
  let num = x.toString().split('').reverse();
  if (num[num.length - 1] === '-') {
    let minus = num.pop();
    num.unshift(minus);
  }
  num = parseInt(num.join(''));
  return (num >> 0) !== num ? 0 : num;
};