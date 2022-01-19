// K번째 수
// https://programmers.co.kr/learn/courses/30/lessons/42748

function solution(array, commands) {
  let answer = [];
  for (let [startIdx, endIdx, order] of commands) {
    answer.push(array.slice(startIdx - 1, endIdx).sort((a, b) => {return a - b;})[order - 1]);
  }
  return answer;
}