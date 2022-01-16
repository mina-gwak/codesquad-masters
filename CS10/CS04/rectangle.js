const Shape = require('./shape');
const Line = require('./Line');

class Rectangle extends Shape {

  constructor(...args) {
    super(args.length === 2 ? [] : args[0]);
    this.width = args.length === 2 ? args[0] : null;
    this.height = args.length === 2 ? args[1] : null;
  }

  calculate() {
    if (this.width) return this.width * this.height;

    else {
      let lengthA, lengthB, firstPoint = this.points[0];

      for (let i = 1; i < 4; i++) {
        if (firstPoint[0] === this.points[i][0]) lengthA = new Line([firstPoint, this.points[i]]).calculate();
        else if (firstPoint[1] === this.points[i][1]) lengthB = new Line([firstPoint, this.points[i]]).calculate();
      }

      return lengthA * lengthB;
    }
  }

  print(area) {
    if (!this.width) super.print();
    console.log(`사각형의 넓이 : ${area}`);
  }

  checkRectangle() {
    let pointXs = new Set(), pointYs = new Set();

    this.points.forEach(([pointX, pointY]) => {
      pointXs.add(pointX);
      pointYs.add(pointY);
    });

    return pointXs.size === 2 && pointYs.size === 2;
  }
}

module.exports = Rectangle;