// Time Conversion
// https://www.hackerrank.com/challenges/time-conversion/problem

function timeConversion(s) {
  let answer;
  let hour = parseInt(s.slice(0, 2));

  if (s.endsWith('AM') && hour === 12)
    answer = '00' + s.slice(2, s.length - 2);
  else if (s.endsWith('PM') && hour !== 12)
    answer = (hour + 12) + s.slice(2, s.length - 2);
  else answer = s.slice(0, s.length - 2);

  return answer;
}