const Shape = require('./shape');

class Line extends Shape {

  constructor(points) {
    super(points);
  }

  calculate() {
    const [pointA, pointB] = this.points;
    const differenceXSquared = Math.pow(pointA[0] - pointB[0], 2);
    const differenceYSquared = Math.pow(pointA[1] - pointB[1], 2);
    return Math.sqrt(differenceXSquared + differenceYSquared);
  }

  print(length) {
    super.print();
    console.log(`두 점 사이의 거리 : ${length}`);
  }
}

module.exports = Line;