let fs = require('fs');
let [input, min] = fs.readFileSync('input.txt').toString().trim().split(' ');

let prevCarry = 0;
let count = 0; // input의 1 개수 카운트
let addCount = 0; // 더한 물병의 개수

// 2진법으로 변환하는 함수
const dec2bin = (dec) => {
  let answer = [];
  while (dec > 1) {
    if (dec % 2) count++;
    answer.push(dec % 2);
    dec = parseInt(dec / 2);
  }
  if (dec) {
    count++;
    answer.push(dec);
  }
  return answer;
};

const binInput = dec2bin(input);

for (let i = 0; i < binInput.length; i++) {
  const check = (!binInput[i] && prevCarry) || (binInput[i] && !prevCarry);

  if (addCount !== 0 && check) count++;
  if (count <= parseInt(min)) {
    console.log(addCount);
    break;
  }

  if (!binInput[i] && !prevCarry) prevCarry = 0;
  else {
    if (check) addCount += 2 ** i;
    binInput[i] = 0;
    prevCarry = 1;
    count--;
  }
}