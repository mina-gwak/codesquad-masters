// 이상한 문자 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12930

// Solution 1
function solution(s) {
  let answer = s.split(' ').map((word) => {
    return word.split('').map((char, index) => {
      return index % 2 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
  }).join(' ');

  return answer;
}

// Solution 2
function solution(s) {
  let answer = '';
  let count = 0;

  for (let char of s) {
    if (char === ' ') {
      answer += ' ';
      count = 0;
    }
    else {
      answer += count % 2 ? char.toLowerCase() : char.toUpperCase();
      count++;
    }
  }
  return answer;
}