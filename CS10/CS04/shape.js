class Shape {

  constructor(points) {
    this.points = points;
  }

  calculate() {
    throw new Error('calculate() must be implement.');
  }

  print() {
    let graph = '';

    for (let i = 25; i >= 0; i--) {

      // x축 인덱스
      if (i === 0) {
        graph += '  0';
        for (let j = 2; j <= 24; j += 2) {
          graph += (j < 10) ? `     ${j}` : `    ${j}`;
        }
      }

      // x축
      else if (i === 1) {
        graph += '  +' + '-'.repeat(6 * 12);
      }

      else {
        // y축 부분
        let num = i >= 10 ? (i - 1).toString() : ` ${i - 1}`;
        graph += ((i - 1) % 2 === 0) ? `${num}|` : '  |';

        // 출력할 좌표가 있는지 체크
        let drawPoint = [];
        this.points.forEach((point) => { i === parseInt(point[1]) + 1 && drawPoint.push(point); });

        // 출력할 좌표가 있을 경우
        if (drawPoint.length) {
          drawPoint.sort((a, b) => { return a[0] - b[0]; });
          let lastPointX = 0;
          drawPoint.forEach(([pointX]) => {
            graph += ' '.repeat(3 * (pointX - lastPointX) - 1) + '•';
            lastPointX = pointX;
          });
        }
      }
      graph += '\n';
    }

    console.log(graph);
  };

}

module.exports = Shape;