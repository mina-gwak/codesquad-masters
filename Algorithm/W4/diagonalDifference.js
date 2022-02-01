// Diagonal Difference
// https://www.hackerrank.com/challenges/diagonal-difference/problem

function diagonalDifference(arr) {
  const sums = arr.reduce((prev, cur, idx) => {
    return [prev[0] + cur[idx], prev[1] + cur[arr.length - idx - 1]];
  }, [0, 0]);
  return Math.abs(sums[0] - sums[1]);
}