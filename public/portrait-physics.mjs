// Character positions use canvas coordinates. Pure functions keep the motion
// independent of DOM rendering and make return-to-origin behaviour verifiable.
export function createParticles(cells) {
  return cells.map(cell => ({ ...cell, x: cell.homeX, y: cell.homeY, vx: 0, vy: 0 }));
}

export function scatterForEntrance(particles, centerX = 240, centerY = 240) {
  for (const p of particles) {
    const seed = Math.sin(p.homeX * 12.9898 + p.homeY * 78.233) * 43758.5453;
    const variation = seed - Math.floor(seed);
    const angle = Math.atan2(p.homeY - centerY, p.homeX - centerX) + (variation - 0.5) * 2.2;
    const radius = Math.hypot(p.homeX - centerX, p.homeY - centerY) + 100 + variation * 170;
    p.x = centerX + Math.cos(angle) * radius;
    p.y = centerY + Math.sin(angle) * radius;
    p.vx = p.vy = 0;
  }
}

export function advanceParticles(particles, pointer, deltaMs = 1000 / 60) {
  const steps = Math.max(1, Math.ceil(Math.min(48, Math.max(0, deltaMs)) / (1000 / 60)));
  const dt = Math.min(48, Math.max(0, deltaMs)) / (1000 / 60) / steps;
  let moving = false;
  for (let step = 0; step < steps; step++) {
    for (const p of particles) {
      let fx = (p.homeX - p.x) * 0.045;
      let fy = (p.homeY - p.y) * 0.045;
      if (pointer) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const radius = pointer.radius || 65;
        if (distance < radius) {
          // A deterministic direction also handles a pointer exactly on a glyph.
          const angle = distance > 0.01 ? Math.atan2(dy, dx) : (p.homeX + p.homeY) * 0.37;
          const nx = Math.cos(angle), ny = Math.sin(angle);
          const force = (1 - distance / radius) * 5.5;
          fx += (nx - ny * 0.75) * force;
          fy += (ny + nx * 0.75) * force;
        }
      }
      const damping = Math.pow(0.84, dt);
      p.vx = (p.vx + fx * dt) * damping;
      p.vy = (p.vy + fy * dt) * damping;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (!pointer && Math.hypot(p.homeX - p.x, p.homeY - p.y) < 0.06 && Math.hypot(p.vx, p.vy) < 0.06) {
        p.x = p.homeX; p.y = p.homeY; p.vx = p.vy = 0;
      }
      if (Math.abs(p.x - p.homeX) + Math.abs(p.y - p.homeY) + Math.abs(p.vx) + Math.abs(p.vy) > 0.01) moving = true;
    }
  }
  return moving;
}
