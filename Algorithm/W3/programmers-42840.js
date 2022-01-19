// 모의고사
// https://programmers.co.kr/learn/courses/30/lessons/42840

const person = [
  [1, 2, 3, 4, 5],
  [2, 1, 2, 3, 2, 4, 2, 5],
  [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
];

function solution(answers) {
  let answer = [];

  const counts = answers.reduce((prev, cur, index) => {
    for (let i = 0; i < person.length; i++) {
      if (person[i][index % person[i].length] === cur) prev[i] += 1;
    }
    return prev;
  }, [0, 0, 0]);

  const max = Math.max(...counts);

  counts.forEach((count, index) => { count === max && answer.push(index + 1); });

  return answer;
}