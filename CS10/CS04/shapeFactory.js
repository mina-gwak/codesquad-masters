const Line = require('./line');
const Triangle = require('./triangle');
const Rectangle = require('./rectangle');
const Polygon = require('./polygon');

class ShapeFactory {
  static create(type, ...args) {
    if (type === 'line') return new Line(...args);
    else if (type === 'triangle') return new Triangle(...args);
    else if (type === 'rectangle') return new Rectangle(...args);
    else if (type === 'polygon') return new Polygon(...args);
  }
}

module.exports = ShapeFactory;