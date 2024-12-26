const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  class Particle {
  constructor(x, y, color, size, velocityX, velocityY) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
  this.velocityX = velocityX;
  this.velocityY = velocityY;
  this.alpha = 1;
  }

  update() {
  this.x += this.velocityX;
  this.y += this.velocityY;
  this.alpha -= 0.01;
  }

  draw() {
  ctx.save();
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.restore();
    }
  }

  function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 50; i++) {
  const size = Math.random() * 3 + 1;
  const velocityX = (Math.random() - 0.5) * 6;
  const velocityY = (Math.random() - 0.5) * 6;
  particles.push(new Particle(x, y, color, size, velocityX, velocityY));
    }
  }

  function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
  particle.update();
  particle.draw();

  if (particle.alpha <= 0) {
  particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
  }

  setInterval(createFirework, 800);
  animate();

  window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  });
  