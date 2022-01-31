// Kangaroo
// https://www.hackerrank.com/challenges/kangaroo/problem

function kangaroo(x1, v1, x2, v2) {
  let calc = (x2 - x1) / (v1 - v2);
  return calc < 0 || !Number.isInteger(calc) ? 'NO' : 'YES';
}

function kangaroo2(x1, v1, x2, v2) {
  if (v2 > v1) return 'NO';
  else return (x2 - x1) % (v1 - v2) === 0 ? 'YES' : 'NO';
}