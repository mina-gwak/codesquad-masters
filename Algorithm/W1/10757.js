let fs = require('fs');
let input = fs.readFileSync('input.txt').toString().trim().split(' ');

const [numA, numB] = input.map((item) => {
  return item.split('').reverse();
});

let prevCarry = 0;
let result = [];
let maxLength = Math.max(numA.length, numB.length);

const decAdder = (numA = 0, numB = 0) => {
  const sum = parseInt(numA) + parseInt(numB) + prevCarry;
  prevCarry = sum >= 10 ? 1 : 0;
  result.push(sum >= 10 ? sum - 10 : sum);
};

for (let i = 0; i < maxLength; i++) {
  decAdder(numA[i], numB[i]);
}

prevCarry && result.push(prevCarry);

console.log(result.reverse().join(''));