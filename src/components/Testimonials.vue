<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testimonials = [
  { name: "Marie Dubois", role: "Directrice IT, TechCorp", text: "Service exceptionnel ! Epi Electronics a transformé notre infrastructure informatique." },
  { name: "Jean Martin", role: "Gérant, BureauPlus", text: "Maintenance professionnelle et conseils précieux. Notre équipement fonctionne parfaitement." },
  { name: "Sophie Laurent", role: "Responsable Formation, EduTech", text: "Formation excellente ! Très pédagogues et patients." }
]

const currentIndex = ref(0)
const canvasRef = ref(null)
let intervalId, animationFrameId

const startAutoRotate = () => { intervalId = setInterval(() => { currentIndex.value = (currentIndex.value + 1) % testimonials.length }, 5000) }
const stopAutoRotate = () => { if (intervalId) clearInterval(intervalId) }

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  new ResizeObserver(() => { canvas.width = canvas.getBoundingClientRect().width; canvas.height = canvas.getBoundingClientRect().height }).observe(canvas)
  
  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'rgba(59, 116, 238, 0.06)'
    ctx.lineWidth = 1
    for (let y = 0; y <= canvas.height; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke() }
    for (let x = 0; x <= canvas.width; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke() }
    ctx.fillStyle = 'rgba(107, 87, 255, 0.15)'
    for (let x = 0; x <= canvas.width; x += 80) { for (let y = 0; y <= canvas.height; y += 80) { ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill() } }
    animationFrameId = requestAnimationFrame(drawGrid)
  }
  drawGrid()
}

onMounted(() => { startAutoRotate(); initCanvas() })
onUnmounted(() => { stopAutoRotate(); if (animationFrameId) cancelAnimationFrame(animationFrameId) })
</script>

<template>
  <section class="testimonials" id="testimonials">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
    <h2>Témoignages Clients</h2>
    <p class="section-subtitle">Découvrez ce que nos clients disent de nos services</p>
    <div class="testimonials-container" @mouseenter="stopAutoRotate" @mouseleave="startAutoRotate">
      <transition name="fade" mode="out-in">
        <div class="testimonial-card" :key="currentIndex">
          <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
          <div class="testimonial-content">
            <div class="stars"><i class="fas fa-star" v-for="n in 5" :key="n"></i></div>
            <p>"{{ testimonials[currentIndex].text }}"</p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fas fa-user"></i></div>
              <div class="author-info"><h4>{{ testimonials[currentIndex].name }}</h4><span>{{ testimonials[currentIndex].role }}</span></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="testimonial-nav">
      <button v-for="(n, index) in testimonials.length" :key="index" class="nav-dot" :class="{ active: index === currentIndex }" @click="currentIndex = index"></button>
    </div>
  </section>
</template>

<style scoped>
.testimonials { padding: var(--spacing-12) 0; background: var(--color-background-elevated); text-align: center; position: relative; overflow: hidden; }
.grid-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
.testimonials h2 { font-size: clamp(40px, 5vw, 56px); margin-bottom: 16px; background: var(--gradient-cta); -webkit-background-clip: text; -webkit-text-fill-color: transparent; position: relative; z-index: 1; }
.section-subtitle { font-size: 19px; color: var(--color-text-secondary); max-width: 500px; margin: 0 auto 60px; position: relative; z-index: 1; }
.testimonials-container { max-width: 800px; margin: 0 auto 40px; min-height: 350px; display: flex; align-items: center; justify-content: center; padding: 0 24px; position: relative; z-index: 1; }
.testimonial-card { background: var(--color-surface); border-radius: var(--radius-xl); padding: 64px 48px; text-align: center; box-shadow: var(--shadow-lg); border: 1px solid var(--color-border); width: 100%; position: relative; overflow: hidden; }
.testimonial-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gradient-cta); }
.quote-icon { position: absolute; top: 32px; left: 40px; font-size: 48px; opacity: 0.15; background: var(--gradient-cta); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.stars { color: #FFD700; font-size: 20px; margin-bottom: 32px; letter-spacing: 4px; }
.testimonial-content p { font-size: 20px; color: var(--color-text); line-height: 1.6; font-style: italic; margin-bottom: 40px; font-weight: 500; }
.testimonial-author { display: flex; align-items: center; gap: 16px; justify-content: center; }
.author-avatar { width: 56px; height: 56px; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; box-shadow: var(--shadow-glow); }
.author-info { text-align: left; }
.author-info h4 { font-size: 18px; font-weight: 700; color: var(--color-text); margin-bottom: 4px; }
.author-info span { font-size: 15px; color: var(--color-text-secondary); }
.testimonial-nav { display: flex; justify-content: center; gap: 12px; position: relative; z-index: 1; }
.nav-dot { width: 10px; height: 10px; border-radius: 50%; border: none; background: var(--color-border); cursor: pointer; transition: all 0.3s; padding: 0; }
.nav-dot:hover { background: var(--color-border-hover); }
.nav-dot.active { background: var(--gradient-primary); transform: scale(1.4); box-shadow: var(--shadow-glow); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: scale(0.95); }
@media (max-width: 768px) { .testimonial-card { padding: 48px 24px; } .quote-icon { display: none; } }
</style>
