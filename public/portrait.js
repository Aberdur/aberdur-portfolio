import { createParticles, advanceParticles, scatterForEntrance } from './portrait-physics.mjs';

const frame = document.querySelector('#ascii-avatar');
const image = frame.querySelector('img');
const canvas = document.querySelector('#portrait-canvas');
const context = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let particles = [], pointer = null, animation = 0, lastTime = 0, visible = true, touchRelease = 0;

function draw() {
  context.clearRect(0, 0, 480, 480);
  context.font = '7px monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (const p of particles) {
    context.fillStyle = p.color;
    context.globalAlpha = p.opacity;
    context.fillText(p.char, p.x, p.y);
  }
  context.globalAlpha = 1;
}

function animate(time) {
  animation = 0;
  if (!visible || document.hidden || reducedMotion.matches) return;
  const moving = advanceParticles(particles, pointer, lastTime ? time - lastTime : 1000 / 60);
  lastTime = time;
  draw();
  if (pointer || moving) animation = requestAnimationFrame(animate);
  else lastTime = 0;
}

function wake() {
  if (!animation && particles.length && visible && !document.hidden && !reducedMotion.matches) {
    lastTime = 0;
    animation = requestAnimationFrame(animate);
  }
}

function release() {
  pointer = null;
  clearTimeout(touchRelease);
  wake();
}

function point(event) {
  if (reducedMotion.matches || !particles.length) return;
  const rect = canvas.getBoundingClientRect();
  pointer = {
    x: (event.clientX - rect.left) * 480 / rect.width,
    y: (event.clientY - rect.top) * 480 / rect.height,
    radius: event.pointerType === 'touch' ? 85 : 65
  };
  if (event.pointerType === 'touch') {
    clearTimeout(touchRelease);
    touchRelease = setTimeout(release, 600);
  }
  wake();
}

function prepare() {
  if (!context || !image.naturalWidth) return;
  try {
    const sample = document.createElement('canvas');
    sample.width = sample.height = 480;
    const sampleContext = sample.getContext('2d', { willReadFrequently: true });
    sampleContext.drawImage(image, 25, 12, 430, 456);
    const pixels = sampleContext.getImageData(0, 0, 480, 480).data;
    const ramp = '.,:;itfLCG08@';
    const cells = [];
    for (let y = 16; y < 466; y += 7) {
      for (let x = 30; x < 452; x += 5) {
        // Soft silhouette: head and shoulders, cutting away busy avatar corners.
        const head = ((x - 240) / 181) ** 2 + ((y - 214) / 201) ** 2;
        const shoulders = ((x - 240) / 210) ** 2 + ((y - 409) / 100) ** 2;
        if (head > 1 && shoulders > 1) continue;
        const i = (y * 480 + x) * 4;
        const light = 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
        if (!pixels[i + 3] || light < 15) continue;
        const level = Math.min(1, Math.max(0, (light - 12) / 180));
        cells.push({
          homeX: x, homeY: y,
          char: ramp[Math.min(ramp.length - 1, Math.floor(level * ramp.length))],
          color: level > 0.58 ? '#e5d2af' : level > 0.27 ? '#c7b18b' : '#827764',
          opacity: 0.24 + level * 0.76
        });
      }
    }
    particles = createParticles(cells);
    if (!particles.length) return;
    if (!reducedMotion.matches) scatterForEntrance(particles);
    draw();
    frame.classList.add('ascii-ready');
    wake();
  } catch {
    // The regular avatar stays visible if canvas sampling is unavailable.
  }
}

canvas.addEventListener('pointermove', point);
canvas.addEventListener('pointerdown', point);
canvas.addEventListener('pointerleave', release);
canvas.addEventListener('pointerup', event => { if (event.pointerType !== 'mouse') release(); });
canvas.addEventListener('pointercancel', release);
window.addEventListener('blur', release);
document.addEventListener('visibilitychange', () => { if (document.hidden) release(); else wake(); });
reducedMotion.addEventListener('change', () => {
  release();
  if (animation) cancelAnimationFrame(animation);
  animation = 0;
  for (const p of particles) { p.x = p.homeX; p.y = p.homeY; p.vx = p.vy = 0; }
  if (particles.length) draw();
});
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) wake();
    else {
      pointer = null;
      if (animation) cancelAnimationFrame(animation);
      animation = 0; lastTime = 0;
    }
  }).observe(canvas);
}
if (image.complete) prepare();
else image.addEventListener('load', prepare, { once: true });
