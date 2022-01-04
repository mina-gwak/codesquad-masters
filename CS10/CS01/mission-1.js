// Mission 1-1

const andGate = (bitA, bitB) => {
  return bitA && bitB;
};

const orGate = (bitA, bitB) => {
  return bitA || bitB;
};

const nandGate = (bitA, bitB) => {
  return !(bitA && bitB);
};

const xorGate = (bitA, bitB) => {
  return (!bitA && bitB) || (bitA && !bitB);
};

// Mission 1-2

const halfAdder = (bitA, bitB) => {

  const sum = xorGate(bitA, bitB);
  const carry = andGate(bitA, bitB);

  return [sum, carry];
};

const fullAdder = (bitA = false, bitB = false, prevCarry) => {

  const [firstSum, firstCarry] = halfAdder(bitA, bitB);
  const [secondSum, secondCarry] = halfAdder(firstSum, prevCarry);
  const carry = firstCarry || secondCarry;

  return [secondSum, carry];
};

// Mission 1-3

const byteA = [true, true, false, true, true, false, true, false];
const byteB = [true, false, true, true, false, false, true, true];

const byteC = [true, false, true, true];
const byteD = [true, true];

const addByte = (largeByte, smallByte) => {
  let prevCarry = false;
  let result = [];

  for (let idx = 0; idx < largeByte.length; idx++) {

    if (idx === smallByte.length && !prevCarry) {
      result.push(...largeByte.slice(idx));
      return result;
    }

    const [sum, carry] = fullAdder(largeByte[idx], smallByte[idx], prevCarry);
    prevCarry = carry;
    result.push(sum);
  }
  prevCarry && result.push(prevCarry);

  return result;
}

const byteAdder = (byteA, byteB) => {
  if (byteA.length > byteB.length) return addByte(byteA, byteB);
  else return addByte(byteB, byteA);
};