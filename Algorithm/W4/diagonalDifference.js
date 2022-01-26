// Diagonal Difference
// https://www.hackerrank.com/challenges/diagonal-difference/problem

function diagonalDifference(arr) {
  const len = arr.length;
  const sums = arr.reduce((prev, cur, idx) => {
    prev[0] += cur[idx];
    prev[1] += cur[len - idx - 1];
    return prev;
  }, [0, 0]);
  return sums[0] > sums[1] ? Math.abs(sums[0] - sums[1]) : Math.abs(sums[1] - sums[0]);
}