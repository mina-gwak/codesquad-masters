let fs = require('fs');
let [color, value, times] = fs.readFileSync('input.txt').toString().trim().split('\n');

const data = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const num = `${data.indexOf(color)}${data.indexOf(value)}`;
const exponent = data.indexOf(times);

console.log(parseInt(num) * (10 ** exponent));