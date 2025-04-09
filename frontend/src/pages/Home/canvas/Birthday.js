import { random, timestamp } from './helpers.js';
import { Starfield } from './Starfield.js';
import { Firework } from './Firework.js';
import { Comet } from './Comet.js';

export class Birthday {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fireworks = [];
    this.counter = 0;
    this.startTime = timestamp();
    this.comets = [];
    this.stars = new Starfield(100, canvas);
    this.resize();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    const center = this.width / 2 | 0;
    this.spawnA = center - center / 4 | 0;
    this.spawnB = center + center / 4 | 0;
    this.spawnC = this.height * 0.1;
    this.spawnD = this.height * 0.5;
    this.stars.resize();
  }

  onClick(evt) {
    const x = evt.clientX || (evt.touches && evt.touches[0].pageX);
    const y = evt.clientY || (evt.touches && evt.touches[0].pageY);
    const count = random(3, 5);
    for (let i = 0; i < count; i++) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110),
        this.ctx,
        this
      ));
    }
    this.counter = -1;
  }

  update(delta) {
    const now = timestamp();
    const elapsed = (now - this.startTime) / 1000;
    this.ctx.globalCompositeOperation = 'hard-light';
    this.ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.stars.update(delta);
    this.stars.draw();

    if (elapsed >= 10 && elapsed <= 180) {
      if (this.comets.length === 0) {
        const cometCount = random(3, 9);
        this.comets = Array.from({ length: cometCount }, () => new Comet(this.width, this.height));
      }
      this.comets.forEach(comet => {
        comet.update(delta, this.width, this.height);
        comet.draw(this.ctx);
      });
    } else {
      this.comets = [];
    }

    this.ctx.globalCompositeOperation = 'lighter';
    this.fireworks.forEach(fw => fw.update(delta));
    this.counter += delta * 3;
    if (this.counter >= 5 && elapsed <= 300) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110),
        this.ctx,
        this
      ));
      this.counter = 0;
    }
    this.fireworks = this.fireworks.filter(fw => !fw.dead);
  }
}
