const Shape = require('./shape');
const Line = require('./line');

class Triangle extends Shape {

  constructor(points) {
    super(points);
  }

  calculate() {
    const lengthA = new Line([this.points[0], this.points[1]]).calculate();
    const lengthB = new Line([this.points[0], this.points[2]]).calculate();
    const lengthC = new Line([this.points[1], this.points[2]]).calculate();
    const s = (lengthA + lengthB + lengthC) / 2;
    return Math.sqrt(s * (s - lengthA) * (s - lengthB) * (s - lengthC));
  }

  print(area) {
    super.print();
    console.log(`삼각형의 넓이 : ${area}`);
  }

}

module.exports = Triangle;