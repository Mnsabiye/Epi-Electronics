<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)

let resizeObserver = null

const drawGrid = (canvas) => {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  const gridSize = 80
  
  ctx.strokeStyle = 'rgba(59, 116, 238, 0.12)'
  ctx.lineWidth = 1
  
  // Horizontal lines
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
  
  // Vertical lines
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  
  // Add subtle glow dots at intersections
  ctx.fillStyle = 'rgba(107, 87, 255, 0.3)'
  for (let x = 0; x <= canvas.width; x += gridSize) {
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const updateCanvasSize = () => {
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    drawGrid(canvas) // Redraw only on resize
  }
  
  resizeObserver = new ResizeObserver(updateCanvasSize)
  resizeObserver.observe(canvas)
  
  updateCanvasSize() // Initial draw
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<template>
  <section class="hero" id="home">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
    
    <div class="container hero-container">
      <div class="hero-left">
        <div class="hero-badge">
          <i class="fas fa-microchip"></i>
          <span>Leader en solutions électroniques</span>
        </div>
        <h1>Votre Portail vers<br><span class="highlight">Epi Electronics</span></h1>
        <p>Découvrez nos solutions électroniques modernes et innovantes pour tous vos besoins technologiques. Nous transformons vos idées en réalité numérique.</p>
        
        <div class="hero-buttons">
          <a href="#products" class="btn btn-primary">
            Découvrir Nos Produits
            <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
          </a>
          <a href="#services" class="btn btn-secondary">
            Nos Services
          </a>
        </div>
        
        <!-- Tech stats -->
        <div class="tech-stats">
          <div class="stat">
            <span class="stat-number">500+</span>
            <span class="stat-label">Produits</span>
          </div>
          <div class="stat">
            <span class="stat-number">1000+</span>
            <span class="stat-label">Clients</span>
          </div>
          <div class="stat">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Support</span>
          </div>
        </div>
      </div>
      
      <div class="hero-right">
        <div class="tech-showcase">
          <!-- Central 3D cube -->
          <div class="cube-container">
            <div class="cube">
              <div class="cube-face front"></div>
              <div class="cube-face back"></div>
              <div class="cube-face right"></div>
              <div class="cube-face left"></div>
              <div class="cube-face top"></div>
              <div class="cube-face bottom"></div>
            </div>
          </div>
          
          <!-- Orbiting elements -->
          <div class="orbit orbit-1">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="orbit-dot"></div>
          </div>
          
          <!-- Tech icons floating -->
          <div class="floating-icon icon-1">
            <i class="fas fa-cpu"></i>
          </div>
          <div class="floating-icon icon-2">
            <i class="fas fa-memory"></i>
          </div>
          <div class="floating-icon icon-3">
            <i class="fas fa-microchip"></i>
          </div>
          <div class="floating-icon icon-4">
            <i class="fas fa-server"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 120px;
  background: var(--gradient-hero);
}

.grid-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
}

.hero-left {
  text-align: left;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(107, 87, 255, 0.1);
  border: 1px solid rgba(107, 87, 255, 0.3);
  border-radius: 50px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  font-weight: 600;
  font-size: 14px;
}

.hero-badge i {
  color: #00E0D6;
}

.hero-badge span {
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-left h1 {
  font-size: clamp(48px, 4vw, 72px);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.highlight {
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-left p {
  font-size: 20px;
  color: var(--color-text-secondary);
  margin-bottom: 40px;
  max-width: 500px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.tech-stats {
  display: flex;
  gap: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 14px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.tech-showcase {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 3D Cube */
.cube-container {
  width: 150px;
  height: 150px;
  perspective: 600px;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 15s linear infinite;
}

.cube-face {
  position: absolute;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, rgba(107, 87, 255, 0.15), rgba(59, 116, 238, 0.1));
  border: 2px solid rgba(107, 87, 255, 0.4);
  backdrop-filter: blur(5px);
  box-shadow: 
    0 0 20px rgba(107, 87, 255, 0.3),
    inset 0 0 20px rgba(107, 87, 255, 0.1);
}

.front  { transform: translateZ(75px); }
.back   { transform: rotateY(180deg) translateZ(75px); }
.right  { transform: rotateY(90deg) translateZ(75px); }
.left   { transform: rotateY(-90deg) translateZ(75px); }
.top    { transform: rotateX(90deg) translateZ(75px); }
.bottom { transform: rotateX(-90deg) translateZ(75px); }

@keyframes rotateCube {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

/* Orbiting elements */
.orbit {
  position: absolute;
  border: 1px dashed rgba(107, 87, 255, 0.3);
  border-radius: 50%;
  animation: orbitSpin 8s linear infinite;
}

.orbit-1 {
  width: 280px;
  height: 280px;
  animation-duration: 10s;
}

.orbit-2 {
  width: 340px;
  height: 340px;
  animation-duration: 15s;
  animation-direction: reverse;
}

.orbit-3 {
  width: 400px;
  height: 400px;
  animation-duration: 20s;
}

.orbit-dot {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: var(--gradient-cta);
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(107, 87, 255, 0.8);
}

@keyframes orbitSpin {
  to { transform: rotate(360deg); }
}

/* Floating tech icons */
.floating-icon {
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(107, 87, 255, 0.15);
  border: 1px solid rgba(107, 87, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  animation: floatIcon 6s ease-in-out infinite;
}

.floating-icon i {
  font-size: 24px;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.icon-1 { top: 5%; left: 10%; animation-delay: 0s; }
.icon-2 { top: 15%; right: 5%; animation-delay: 1.5s; }
.icon-3 { bottom: 15%; left: 5%; animation-delay: 3s; }
.icon-4 { bottom: 5%; right: 10%; animation-delay: 4.5s; }

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@media (max-width: 968px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: 60px;
    gap: 40px;
  }

  .hero-left {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-left h1 {
    font-size: 48px;
  }

  .hero-buttons {
    justify-content: center;
  }
  
  .tech-stats {
    justify-content: center;
  }
  
  .tech-showcase {
    width: 300px;
    height: 300px;
  }
  
  .cube-container {
    width: 100px;
    height: 100px;
  }
  
  .cube-face {
    width: 100px;
    height: 100px;
  }
  
  .front  { transform: translateZ(50px); }
  .back   { transform: rotateY(180deg) translateZ(50px); }
  .right  { transform: rotateY(90deg) translateZ(50px); }
  .left   { transform: rotateY(-90deg) translateZ(50px); }
  .top    { transform: rotateX(90deg) translateZ(50px); }
  .bottom { transform: rotateX(-90deg) translateZ(50px); }
  
  .orbit-1 { width: 180px; height: 180px; }
  .orbit-2 { width: 220px; height: 220px; }
  .orbit-3 { width: 260px; height: 260px; }
  
  .floating-icon {
    width: 40px;
    height: 40px;
  }
  
  .floating-icon i {
    font-size: 18px;
  }
}
</style>
