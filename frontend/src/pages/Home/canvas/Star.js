import { PI2 } from './helpers.js';
export class Star {
    constructor(width, height) {
      this.reset(width, height);
    }
  
    reset(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.2 + 0.1;
      this.alpha = Math.random();
      this.speed = Math.random() * 0.001 + 0.0002;
    }
  
    update(delta) {
      this.alpha += this.speed * delta * 1000;
      if (this.alpha > 1 || this.alpha < 0) this.speed *= -1;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = 'white';
      ctx.arc(this.x, this.y, this.size, 0, PI2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }