// Redefine Array Functions
const filter = (func, list) => list.filter(func);
const reduceWithInitList = (func, list) => list.reduce(func, list);
const reduce = (func, init, list) => list.reduce(func, init);
const every = (func, list) => list.every(func);
const includes = (list) => (elem) => list.includes(elem);
const join = (separator, list) => list.join(separator);
const concat = (elem, list) => list.concat(elem);

// Calc Functions
const add = (number, a) => a + number;
const minus = (number, a) => a - number;
const divide = (number, a) => number / a;

// Compare Functions
const isEqual = (number, a) => a === number;
const isLess = (number, a) => a < number;
const isGreater = (number, a) => a > number;

// Sub Functions
const getArray = (number, mapFn) => Array.from({ length: number }, mapFn);
const isFactor = (number) => (potentialFactor) => number % potentialFactor === 0;
const calc = (calc, list) => list.reduce(calc);
const addFactor = (number, func) => (list, elem) =>
  isEqual(elem, func(number, elem)) ? list : concat(func(number, elem), list);

// Functions
const factors = (number) =>
  reduceWithInitList(addFactor(number, divide),
    filter(isFactor(number),
      getArray(Math.sqrt(number), (_, idx) => idx + 1)));

const factorSum = (compare, number) =>
  compare(number,
    minus(number,
      calc(add, factors(number))));

const equalArray = (listA, listB) =>
  isEqual(listA.length, listB.length) && every(includes(listB), listA);

// Classifier Functions
const isPerfect = (number) => factorSum(isEqual, number);
const isAbundant = (number) => factorSum(isGreater, number);
const isDeficient = (number) => factorSum(isLess, number);
const isPrime = (number) =>
  number > 1 && equalArray(factors(number), Array.of(1, number));
const isSquared = (number) => Number.isInteger(Math.sqrt(number));

// Print
const checkType = (num) => (list, func) => func(num) ? concat(func.name.slice(2), list) : list;

const getNumberType = (num) =>
  join(', ',
    reduce(checkType(num), [], [isPerfect, isAbundant, isDeficient, isPrime, isSquared]));

const convertedText = (num) => `${num}: ${getNumberType(num)}\n`;
const addText = (prevText, num) => prevText + convertedText(num);

const getString = reduce(addText, '', getArray(99, (_, idx) => idx + 2));

console.log(getString);