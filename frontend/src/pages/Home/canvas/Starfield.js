import { Star } from './Star.js';
export class Starfield {
  constructor(numStars, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.numStars = numStars;
    this.resize();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.stars = Array.from({ length: this.numStars }, () => new Star(this.width, this.height));
  }

  update(delta) {
    this.stars.forEach(star => star.update(delta));
  }

  draw() {
    this.stars.forEach(star => star.draw(this.ctx));
  }
}
