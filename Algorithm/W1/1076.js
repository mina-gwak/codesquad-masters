let fs = require('fs');
let input = fs.readFileSync('input.txt').toString().trim().split('\n');

const data = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const num = `${data.indexOf(input[0])}${data.indexOf(input[1])}`;
const exponent = data.indexOf(input[2]);

console.log(parseInt(num)*(10**exponent));