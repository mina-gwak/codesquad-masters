const readline = require('readline');
const ShapeFactory = require('./shapeFactory');

class AreaCalculator {

  constructor() {
    this.readline = null;
  }

  init() {
    this.setReadline();
    this.start();
  }

  setReadline() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.readline.setPrompt('> ');
  }

  start() {
    this.readline.prompt();
    this.readline.on('line', (line) => {
      this.calculateProcess(line.trim());
    }).on('close', () => {
      process.exit();
    });
  }

  calculateProcess(input) {
    const points = this.getPoints(input);
    let shape;

    if (!input) {
      console.log('입력값이 없습니다. 다시 입력해주세요.');
      this.readline.prompt();
      return;
    }

    if ((points.length === 1 && input.split(' ').length !== 2) && !this.checkRange(points)) {
      console.log('입력 범위를 초과했습니다. 다시 입력해주세요.');
      this.readline.prompt();
      return;
    }

    if (points.length === 2) shape = ShapeFactory.create('line', points);

    else if (points.length === 3) shape = ShapeFactory.create('triangle', points);

    // 사각형 - 좌표 입력 시
    else if (points.length === 4) {
      shape = ShapeFactory.create('rectangle', points);

      if (!shape.checkRectangle()) {
        console.log('직사각형이 아닙니다. 다시 입력해주세요.');
        this.readline.prompt();
        return;
      }
    }

    // 사각형 - 너비, 높이 입력 시
    else if (points.length === 1) shape = ShapeFactory.create('rectangle', ...input.split(' '));

    else shape = ShapeFactory.create('polygon', points);

    const area = shape.calculate();
    shape.print(area);

    this.readline.close();
  }

  getPoints(input) {
    return input.split('-').map((item) => {
      return item.slice(1, item.length - 1).split(',');
    });
  }

  checkRange(points) {
    return points.every(([x, y]) => {
      return x >= 0 && x < 25 && y >= 0 && y < 25;
    });
  }

}

const calculator = new AreaCalculator();
calculator.init();