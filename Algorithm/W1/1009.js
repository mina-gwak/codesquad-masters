let fs = require('fs');
let [n, ...arr] = fs.readFileSync('input.txt').toString().trim().split('\n');

for (let i = 0; i < arr.length; i++) {
  let [base, exponent] = arr[i].split(' ');
  let result = 1;

  for (let j = 1; j <= exponent; j++) {
    result = result * base % 10;
  }
  console.log(result === 0 ? 10 : result);
}