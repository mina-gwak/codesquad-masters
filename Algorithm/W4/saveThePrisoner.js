// Save The Prisoner
// https://www.hackerrank.com/challenges/save-the-prisoner/problem

function saveThePrisoner(n, m, s) {
  return ((s - 1) + m) % n || n;
}