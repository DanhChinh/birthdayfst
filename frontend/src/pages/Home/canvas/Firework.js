import { PI2 } from './helpers.js';
export class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings, ctx, birthday) {
    this.ctx = ctx;
    this.birthday = birthday;
    this.dead = false;
    this.offsprings = offsprings;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.shade = shade;
    this.history = [];
  }

  update(delta) {
    if (this.dead) return;
    const xDiff = this.targetX - this.x;
    const yDiff = this.targetY - this.y;
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
      this.x += xDiff * 2 * delta;
      this.y += yDiff * 2 * delta;
      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 20) this.history.shift();
    } else {
      if (this.offsprings && !this.madeChilds) {
        const babies = this.offsprings / 2;
        for (let i = 0; i < babies; i++) {
          const angle = PI2 * i / babies;
          const targetX = this.x + this.offsprings * Math.cos(angle);
          const targetY = this.y + this.offsprings * Math.sin(angle);
          this.birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0, this.ctx, this.birthday));
        }
      }
      this.madeChilds = true;
      this.history.shift();
    }

    if (this.history.length === 0) this.dead = true;
    else if (this.offsprings) {
      this.history.forEach((point, i) => {
        this.ctx.beginPath();
        this.ctx.fillStyle = `hsl(${this.shade},100%,${i}%)`;
        this.ctx.arc(point.x, point.y, 1, 0, PI2);
        this.ctx.fill();
      });
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = `hsl(${this.shade},100%,50%)`;
      this.ctx.arc(this.x, this.y, 1, 0, PI2);
      this.ctx.fill();
    }
  }
}