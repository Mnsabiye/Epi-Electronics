<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationFrameId
let particles = []

// Particle System Logic
class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.size = Math.random() * 3 + 1
    this.speedX = Math.random() * 2 - 1
    this.speedY = Math.random() * 2 - 1
    this.opacity = Math.random() * 0.5 + 0.3
  }

  update(width, height) {
    this.x += this.speedX
    this.y += this.speedY
    if (this.x < 0 || this.x > width) this.speedX *= -1
    if (this.y < 0 || this.y > height) this.speedY *= -1
  }

  draw(ctx, color) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const initParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const resizeObs = new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  })
  resizeObs.observe(canvas)
  
  // Set initial size
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(canvas.width, canvas.height))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      p.update(canvas.width, canvas.height)
      p.draw(ctx, '#0f3460')
    })
    animationFrameId = requestAnimationFrame(animate)
  }
  
  animate()
}

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section class="hero" id="home">
    <canvas ref="canvasRef" id="particles"></canvas>
    <div class="hero-content">
      <div class="hero-badge">
        <i class="fas fa-star"></i>
        <span>Leader en solutions électroniques</span>
      </div>
      <h2>Bienvenue chez Epi Electronics</h2>
      <p>Découvrez nos solutions électroniques modernes et innovantes pour tous vos besoins technologiques. Nous transformons vos idées en réalité numérique.</p>
      <div class="hero-buttons">
        <a href="#products" class="btn btn-primary">
          <i class="fas fa-arrow-right"></i>
          Découvrir nos produits
        </a>
        <a href="#contact" class="btn btn-secondary">
          <i class="fas fa-phone"></i>
          Nous contacter
        </a>
      </div>
    </div>

    <div class="hero-scroll">
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 140px 24px 100px;
  background: var(--gray-50);
  position: relative;
  overflow: hidden;
}

#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  animation: slideUpFade 1s ease-out;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: 50px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.hero-badge i {
  color: #f5a623;
  font-size: 12px;
}

.hero-badge span {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-500);
  letter-spacing: 0.02em;
}

.hero-content h2 {
  font-size: clamp(44px, 7vw, 72px);
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: 20px;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.hero-content p {
  font-size: clamp(18px, 2.5vw, 21px);
  color: var(--gray-400);
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 980px;
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
}

.btn-primary {
  background: var(--blue-primary);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--blue-hover);
  transform: scale(1.02);
}

.btn-secondary {
  background: transparent;
  color: var(--blue-primary);
  border: none;
}

.btn-secondary:hover {
  color: var(--blue-hover);
}

.btn-secondary i {
  transition: var(--transition-fast);
}

.btn-secondary:hover i {
  transform: translateX(4px);
}

.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;
  animation: bounce 2s infinite;
}

.hero-scroll i {
  font-size: 24px;
  color: var(--gray-300);
  transition: var(--transition-base);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-8px);
  }
  60% {
    transform: translateX(-50%) translateY(-4px);
  }
}

@keyframes slideUpFade {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
