<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationFrameId

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const ctx = canvas.getContext('2d')
  const resizeObs = new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  })
  resizeObs.observe(canvas)
  
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const gridSize = 80
    
    ctx.strokeStyle = 'rgba(59, 116, 238, 0.08)'
    ctx.lineWidth = 1
    
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    ctx.fillStyle = 'rgba(107, 87, 255, 0.2)'
    for (let x = 0; x <= canvas.width; x += gridSize) {
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    animationFrameId = requestAnimationFrame(drawGrid)
  }
  
  drawGrid()
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section class="services" id="services">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
    
    <h2>Nos Services</h2>
    <div class="service-container">
      <div class="service-card">
        <div class="icon-wrapper">
          <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Conseil">
        </div>
        <h3>Conseil & Expertise</h3>
        <p>Nous vous accompagnons dans le choix et l'intégration des meilleures solutions électroniques.</p>
      </div>
      <div class="service-card">
        <div class="icon-wrapper">
          <img src="https://cdn-icons-png.flaticon.com/512/3094/3094850.png" alt="Maintenance">
        </div>
        <h3>Maintenance</h3>
        <p>Un suivi technique et une maintenance proactive pour garantir la performance de vos équipements.</p>
      </div>
      <div class="service-card">
        <div class="icon-wrapper">
          <img src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png" alt="Formation">
        </div>
        <h3>Ventes</h3>
        <p>Pour tous vos besoin techniques ou technologiques pour de grandes entreprises ou pour usage personnel. Contactez-nous!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: var(--spacing-12) 0;
  background: var(--color-background);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.grid-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.services h2 {
  font-size: clamp(40px, 5vw, 56px);
  margin-bottom: 60px;
  color: var(--color-text);
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.service-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.service-card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: 48px 32px;
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-cta);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.service-card:hover {
  box-shadow: var(--shadow-xl), var(--shadow-glow);
  transform: translateY(-8px);
  border-color: var(--color-primary);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 32px;
  background: var(--color-accent-bg);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
}

.service-card img {
  width: 48px;
  height: 48px;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  transition: transform 0.3s ease;
}

.service-card:hover img {
  transform: scale(1.1);
}

.service-card h3 {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.service-card p {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
