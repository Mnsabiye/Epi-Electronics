<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const productsData = {
  composants: {
    title: "Accessoires & Périphériques",
    description: "Une gamme complète d'accessoires pour optimiser votre setup.",
    images: [
      { src: "/assets/img/products/mouse_top.png", text: "Souris Ergonomique (Vue de dessus)" },
      { src: "/assets/img/products/mouse_side.png", text: "Souris Ergonomique (Profil)" },
      { src: "/assets/img/products/mechanical_keyboard.png", text: "Clavier Mécanique RGB" },
      { src: "/assets/img/products/wireless_headset.png", text: "Casque Gaming Sans Fil" }
    ]
  },
  robots: {
    title: "Equipements de Bureau",
    description: "Imprimantes, écrans et solutions audio pour votre espace de travail.",
    images: [
      { src: "/assets/img/products/epson_printer.png", text: "Imprimante EcoTank Haute Capacité" },
      { src: "/assets/img/products/jbl_speaker.png", text: "Enceinte Portable JBL" },
      { src: "/assets/img/products/gaming_monitor.png", text: "Moniteur Incurvé Ultrawide" }
    ]
  },
  ordinateurs: {
    title: "Ordinateurs Portables",
    description: "Performance et mobilité pour les professionnels et les créatifs.",
    images: [
      { src: "/assets/img/products/dell_laptop_closed.png", text: "Dell Latitude Professionnel" },
      { src: "/assets/img/products/hp_laptop_open.png", text: "HP Ultra-fin (Ouvert)" },
      { src: "/assets/img/products/hp_laptop_closed.png", text: "HP Ultra-fin (Fermé)" }
    ]
  }
}

const slides = [
    { id: 'composants', icon: '⌨️', title: 'Accessoires & Périphériques', subtitle: 'Claviers, Souris & Audio', image: '/assets/img/products/mechanical_keyboard.png' },
    { id: 'robots', icon: '🖨️', title: 'Équipements de Bureau', subtitle: 'Imprimantes & Moniteurs', image: '/assets/img/products/epson_printer.png' },
    { id: 'ordinateurs', icon: '💻', title: 'Ordinateurs Portables', subtitle: 'Performance & Design', image: '/assets/img/products/hp_laptop_open.png' }
]

const currentSlide = ref(0)
const isPlaying = ref(true)
const slideInterval = ref(null)
const showModal = ref(false)
const selectedProduct = ref(null)
const canvasRef = ref(null)
let animationFrameId

const startSlideshow = () => {
  stopSlideshow()
  slideInterval.value = setInterval(nextSlide, 3000)
}

const stopSlideshow = () => {
  if (slideInterval.value) clearInterval(slideInterval.value)
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) startSlideshow()
  else stopSlideshow()
}

const openProduct = (id) => {
    selectedProduct.value = productsData[id]
    showModal.value = true
    document.body.style.overflow = "hidden"
    stopSlideshow()
}

const closeModal = () => {
    showModal.value = false
    document.body.style.overflow = ""
    if(isPlaying.value) startSlideshow()
}

// Slide class logic
const getSlideClass = (index) => {
    if (index === currentSlide.value) return 'active'
    if (index === (currentSlide.value - 1 + slides.length) % slides.length) return 'prev'
    if (index === (currentSlide.value + 1) % slides.length) return 'next'
    return ''
}

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
    startSlideshow()
    initCanvas()
})

onUnmounted(() => {
    stopSlideshow()
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <section class="products" id="products">
    <canvas ref="canvasRef" class="grid-canvas"></canvas>
    
    <h2>Nos Produits</h2>
    <div class="product-slideshow-container" @mouseenter="stopSlideshow" @mouseleave="isPlaying && startSlideshow()">
      <div class="product-slideshow">
        <div 
            v-for="(slide, index) in slides" 
            :key="slide.id"
            class="product-slide"
            :class="getSlideClass(index)"
            @click="openProduct(slide.id)"
            :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div class="slide-content">
            <div class="slide-icon">{{ slide.icon }}</div>
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.subtitle }}</p>
          </div>
          <div class="slide-glow"></div>
        </div>
      </div>

      <!-- Controls -->
      <div class="slideshow-controls">
        <button class="control-btn" @click="prevSlide"><i class="fas fa-chevron-left"></i></button>
        <div class="slideshow-dots">
          <span 
            v-for="(slide, index) in slides"
            :key="index"
            class="dot"
            :class="{ active: index === currentSlide }"
            @click="currentSlide = index"
          ></span>
        </div>
        <button class="control-btn" @click="nextSlide"><i class="fas fa-chevron-right"></i></button>
        <button class="pause-btn" @click="togglePlay">
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div class="product-details" :class="{ active: showModal }">
        <button class="close-modal-btn" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="modal-content-wrapper" v-if="selectedProduct">
          <h3 class="product-hero-title">{{ selectedProduct.title.replace(/^[^\s]+\s/, '') }}</h3>
          <p class="product-hero-subtitle">{{ selectedProduct.description }}</p>
          
          <div class="product-actions">
            <a href="#contact" class="apple-btn apple-btn-primary" @click="closeModal">
              Commander
            </a>
            <a href="#contact" class="apple-btn apple-btn-secondary" @click="closeModal">
              En savoir plus
            </a>
          </div>
    
          <div class="product-gallery">
            <div v-for="(img, idx) in selectedProduct.images" :key="idx" class="product-gallery-item fade-in">
                <img :src="img.src" :alt="img.text || 'Product Image'">
                <p v-if="img.text">{{ img.text }}</p>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 100px 24px;
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

.products h2 {
  font-size: clamp(40px, 5vw, 56px);
  margin-bottom: 60px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.product-slideshow-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 40px;
  perspective: 1000px;
  z-index: 1;
}

.product-slideshow {
  position: relative;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-slide {
  position: absolute;
  width: 600px;
  height: 480px;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 60px;
  opacity: 0;
  transform: scale(0.6) translateX(200%);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  z-index: 1;
  border: 1px solid var(--color-border);
}

.product-slide.active {
  opacity: 1;
  transform: scale(1) translateX(0);
  z-index: 10;
  box-shadow: var(--shadow-xl), var(--shadow-glow);
  border-color: var(--color-primary);
}

.product-slide:nth-child(even).active {
    background: linear-gradient(135deg, var(--color-surface) 0%, rgba(107, 87, 255, 0.1) 100%);
}

.product-slide.prev {
  opacity: 0.4;
  transform: scale(0.8) translateX(-110%);
  z-index: 5;
  filter: blur(1px);
}

.product-slide.next {
  opacity: 0.4;
  transform: scale(0.8) translateX(110%);
  z-index: 5;
  filter: blur(1px);
}

.slide-content {
  position: relative;
  z-index: 2;
  text-align: left;
  width: 100%;
}

.slide-icon {
  font-size: 64px;
  margin-bottom: 32px;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  filter: drop-shadow(0 4px 6px rgba(107, 87, 255, 0.3));
}

.product-slide h3 {
  color: var(--color-text);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  background: none;
  -webkit-text-fill-color: initial;
}

.product-slide p {
  color: var(--color-text-secondary);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
}

.slide-glow {
  display: none;
}

.slideshow-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
  background: var(--color-surface);
  padding: 12px 24px;
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.control-btn, .pause-btn {
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 18px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.control-btn:hover, .pause-btn:hover {
  background: var(--color-accent-bg);
  color: var(--color-primary-light);
}

.slideshow-dots {
  display: flex;
  gap: 12px;
}

.dot {
  width: 10px;
  height: 10px;
  background: var(--color-border);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--gradient-primary);
  transform: scale(1.3);
  box-shadow: var(--shadow-glow);
}

/* Modal Styles */
.product-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(20px);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  transition: opacity 0.4s ease;
}

.product-details.active {
  opacity: 1;
  visibility: visible;
}

.modal-content-wrapper {
  padding: 120px 24px 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.product-hero-title {
  font-size: clamp(40px, 5vw, 64px);
  margin-bottom: 24px;
  text-align: center;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-hero-subtitle {
  font-size: 20px;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 700px;
  margin: 0 auto 48px;
}

.product-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
}

.apple-btn {
  padding: 16px 32px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.apple-btn-primary {
  background: var(--gradient-cta);
  color: white;
  box-shadow: var(--shadow-md), var(--shadow-glow);
}

.apple-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow-strong);
}

.apple-btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.apple-btn-secondary:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
}

.close-modal-btn {
  position: fixed;
  top: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 24px;
  color: var(--color-text);
  cursor: pointer;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: var(--shadow-md);
}

.close-modal-btn:hover {
    transform: rotate(90deg);
    color: var(--color-primary-light);
    box-shadow: var(--shadow-glow);
}

.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.product-gallery-item {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.product-gallery-item:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.product-gallery img {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 100%;
}

.product-gallery p {
  padding: 16px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .product-slide {
    width: 320px;
    height: 420px;
    padding: 32px;
  }
}
</style>
