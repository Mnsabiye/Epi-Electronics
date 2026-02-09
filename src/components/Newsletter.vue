<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const email = ref('')
const showSuccess = ref(false)
const canvasRef = ref(null)
let animationFrameId

const subscribe = () => {
  if (!email.value) return
  setTimeout(() => {
    showSuccess.value = true
    email.value = ''
    setTimeout(() => { showSuccess.value = false }, 5000)
  }, 1000)
}

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
    ctx.strokeStyle = 'rgba(30, 58, 138, 0.05)'
    ctx.lineWidth = 1
    for (let y = 0; y <= canvas.height; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke() }
    for (let x = 0; x <= canvas.width; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke() }
    ctx.fillStyle = 'rgba(30, 58, 138, 0.1)'
    for (let x = 0; x <= canvas.width; x += 80) { for (let y = 0; y <= canvas.height; y += 80) { ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill() } }
    animationFrameId = requestAnimationFrame(drawGrid)
  }
  drawGrid()
}

onMounted(() => { initCanvas() })
onUnmounted(() => { if (animationFrameId) cancelAnimationFrame(animationFrameId) })
</script>

<template>
  <section class="newsletter" id="contact">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
    <div class="newsletter-container">
      <div class="newsletter-content">
        <h2>Restez informé</h2>
        <p>Recevez nos dernières actualités et offres spéciales directement dans votre boîte mail</p>
        <form class="newsletter-form" @submit.prevent="subscribe">
          <div class="form-group" v-if="!showSuccess">
            <input type="email" v-model="email" placeholder="Votre adresse email" required>
            <button type="submit" class="newsletter-btn"><i class="fas fa-paper-plane"></i> S'abonner</button>
          </div>
          <div class="newsletter-success" v-else><i class="fas fa-check-circle"></i> Merci ! Vous êtes maintenant abonné.</div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter { padding: 100px 24px; background: var(--color-surface); text-align: center; position: relative; overflow: hidden; }
.grid-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
.newsletter::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gradient-cta); z-index: 1; }
.newsletter-container { max-width: 600px; margin: 0 auto; position: relative; z-index: 1; }
.newsletter h2 { font-size: clamp(32px, 4vw, 48px); margin-bottom: 16px; background: var(--gradient-cta); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.newsletter p { font-size: 18px; color: var(--color-text-secondary); margin-bottom: 40px; line-height: 1.6; }
.newsletter-form { max-width: 500px; margin: 0 auto; min-height: 60px; }
.form-group { display: flex; background: var(--color-background); border-radius: 50px; overflow: hidden; box-shadow: var(--shadow-lg); border: 1px solid var(--color-border); }
.form-group:focus-within { border-color: var(--color-primary); box-shadow: var(--shadow-lg), var(--shadow-glow); }
input[type="email"] { flex: 1; padding: 18px 28px; border: none; outline: none; font-size: 16px; font-family: var(--font-family); color: var(--color-text); background: transparent; }
input[type="email"]::placeholder { color: var(--color-text-muted); }
.newsletter-btn { padding: 18px 32px; background: var(--gradient-cta); border: none; color: white; font-family: var(--font-family); font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all 0.3s ease; white-space: nowrap; }
.newsletter-btn:hover { transform: scale(1.02); box-shadow: var(--shadow-glow-strong); }
.newsletter-success { padding: 20px; background: rgba(34, 197, 94, 0.1); border-radius: var(--radius-md); color: #16a34a; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 12px; justify-content: center; border: 1px solid rgba(34, 197, 94, 0.3); }
@media (max-width: 768px) { .form-group { flex-direction: column; border-radius: var(--radius-lg); } input[type="email"] { text-align: center; border-bottom: 1px solid var(--color-border); } .newsletter-btn { justify-content: center; border-radius: 0 0 var(--radius-lg) var(--radius-lg); } }
</style>
