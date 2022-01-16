const Shape = require('./shape');
const Triangle = require('./triangle');

class Polygon extends Shape {

  constructor(points) {
    super(points);
  }

  calculate() {
    const trianglePoints = this.getTrianglePoints();
    return trianglePoints.reduce((prev, cur) => { return prev + new Triangle(cur).calculate(); }, 0);
  }

  print(area) {
    super.print();
    console.log(`다각형의 넓이 : ${area}`);
  }

  getTrianglePoints() {
    let trianglePoints = [];
    const [firstPoint, ...points] = this.points;

    for (let i = 0; i < points.length - 1; i++) {
      trianglePoints.push([firstPoint, points[i], points[i + 1]]);
    }

    return trianglePoints;
  }

}

module.exports = Polygon;