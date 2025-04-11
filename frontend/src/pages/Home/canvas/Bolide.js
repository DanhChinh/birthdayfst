
export class Bolide {
  constructor(width, height) {
    this.reset(width, height);
  }

  reset(width, height) {
    this.x = Math.random() * -width;
    this.y = Math.random() * height * 0.45;
    this.length = Math.random() * 80 + 45;
    this.speedX = Math.random() * 0.4 + 0.4;
    this.speedY = this.speedX * (Math.random() * 0.2 + 0.05);
    this.opacity = Math.random() * 0.5 + 0.5;
  }

  update(delta, width, height) {
    this.x += this.speedX * delta * 60;
    this.y += this.speedY * delta * 60;
    if (this.x > width || this.y > height) this.reset(width, height);
  }

  draw(ctx) {
    const angle = Math.atan2(this.speedY, this.speedX);
    const tailX = this.x - this.length * Math.cos(angle);
    const tailY = this.y - this.length * Math.sin(angle);
    const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    grad.addColorStop(1, `rgba(255,255,255,0)`);
    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
  }
}