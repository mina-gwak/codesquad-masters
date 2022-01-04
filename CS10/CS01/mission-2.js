// Mission 2-1

const dec2bin = (dec) => {
  let answer = [];
  while (dec > 1) {
    answer.push(dec % 2);
    dec = parseInt(dec / 2);
  }
  answer.push(dec);
  return answer;
};

// Mission 2-2

const bin2dec = (bin) => {
  return bin.reduce((prev, curr, idx) => { return prev + curr * 2 ** idx; });
};

// Mission 2-3

const bin2hex = (bin) => {
  const hex = ["A", "B", "C", "D", "E", "F"];
  const result = [];

  while (bin.length % 4 !== 0) bin.push(false);

  bin.reduce((prev, curr, idx) => {
    prev.push(curr);
    if ((idx + 1) % 4 !== 0) return prev;
    else {
      const dec = bin2dec(prev);
      result.push(dec > 9 ? hex[dec - 10] : dec);
      return [];
    }
  }, []);

  return result;
};

const dec2hex = (decA, decB) => {
  const sum = byteAdder(dec2bin(decA), dec2bin(decB));
  return bin2hex(sum);
};