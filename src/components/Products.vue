<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const productsData = {
  composants: {
    title: " Composants électroniques",
    description: "Nous proposons une large gamme de composants pour vos projets.",
    images: [
      { src: "https://images.unsplash.com/photo-1587202372775-98927f27b4ba?auto=format&fit=crop&w=600&q=80", text: "Cartes électroniques haute performance" },
      { src: "https://images.unsplash.com/photo-1581091870622-9c58c181fbbd?auto=format&fit=crop&w=600&q=80", text: "Capteurs de précision" }
    ]
  },
  robots: {
    title: " Equipements de votre choix",
    description: "Toute sorte d'imprimante, de projecteurs et autre equipements dont vous avez besoin dans votre bureau.",
    images: [
      { src: "https://images.unsplash.com/photo-1581090700227-4c4d3f0d7d83?auto=format&fit=crop&w=600&q=80", text: "" },
      { src: "https://images.unsplash.com/photo-1594007654729-e0c7a0c3e1f3?auto=format&fit=crop&w=600&q=80", text: "" }
    ]
  },
  ordinateurs: {
    title: " Ordinateurs",
    description: "Découvrez nos ordinateurs performants pour tous vos besoins professionnels et personnels.",
    images: [
      { src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", text: "" },
      { src: "https://images.unsplash.com/photo-1587202372775-3d63b9e6f4e0?auto=format&fit=crop&w=600&q=80", text: "" },
      { src: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=600&q=80", text: "" },
      { src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80", text: "" }
    ]
  }
}

const slides = [
    { id: 'composants', icon: '', title: 'Composants Électroniques', subtitle: 'Cartes, Capteurs & Modules', image: '/assets/img/products/composants.png' },
    { id: 'robots', icon: '', title: 'Équipements de Bureau', subtitle: 'Imprimantes & Projecteurs', image: '/assets/img/products/office-equipment.png' },
    { id: 'ordinateurs', icon: '', title: 'Ordinateurs', subtitle: 'Performance & Puissance', image: '/assets/img/products/computers.png' }
]

const currentSlide = ref(0)
const isPlaying = ref(true)
const slideInterval = ref(null)
const showModal = ref(false)
const selectedProduct = ref(null)

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

onMounted(() => {
    startSlideshow()
})

onUnmounted(() => {
    stopSlideshow()
})
</script>

<template>
  <section class="products" id="products">
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
  padding: var(--section-padding);
  background: var(--white);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.products h2 {
  font-size: clamp(40px, 5vw, 56px);
  margin-bottom: 40px;
  color: var(--gray-900);
}

.product-slideshow-container {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 40px;
  perspective: 1000px;
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
  width: 500px;
  height: 500px;
  background: #000;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: scale(0.6) translateX(200%);
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.product-slide.active {
  opacity: 1;
  transform: scale(1) translateX(0);
  z-index: 10;
  box-shadow: 0 0 50px rgba(0, 113, 227, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.product-slide.prev {
  opacity: 0.6;
  transform: scale(0.7) translateX(-140%);
  z-index: 5;
  filter: blur(2px);
}

.product-slide.next {
  opacity: 0.6;
  transform: scale(0.7) translateX(140%);
  z-index: 5;
  filter: blur(2px);
}

.slide-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.slide-icon {
  font-size: 80px;
  margin-bottom: 32px;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
}

.product-slide h3 {
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(180deg, #fff 0%, #a1a1a6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-slide p {
  color: #86868b;
  font-size: 18px;
  font-weight: 500;
}

.slide-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(transparent, rgba(0, 113, 227, 0.3), transparent 30%);
  animation: rotate 4s linear infinite;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-slide.active:hover .slide-glow {
  opacity: 1;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

.slideshow-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.05);
  padding: 12px 24px;
  border-radius: 50px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  backdrop-filter: blur(10px);
}

.control-btn, .pause-btn {
  background: none;
  border: none;
  color: var(--gray-900);
  font-size: 16px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.control-btn:hover, .pause-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.slideshow-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--gray-300);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--gray-900);
  transform: scale(1.2);
}

/* Modal Styles */
.product-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 2000;
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.product-details.active {
  opacity: 1;
  visibility: visible;
}

.modal-content-wrapper {
  padding: 100px 24px 60px;
  max-width: 1000px;
  margin: 0 auto;
  animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-hero-title {
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 700;
  color: var(--black);
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.product-hero-subtitle {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 500;
  color: var(--gray-500);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.4;
}

.product-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
}

.apple-btn {
  padding: 12px 28px;
  font-size: 17px;
  border-radius: 980px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  font-weight: 400;
  min-width: 140px;
}

.apple-btn-primary {
  background-color: var(--blue-primary);
  color: white;
  border: 1px solid var(--blue-primary);
}

.apple-btn-primary:hover {
  background-color: var(--blue-hover);
  border-color: var(--blue-hover);
}

.apple-btn-secondary {
  background-color: transparent;
  color: var(--blue-primary);
  border: 1px solid var(--blue-primary);
}

.apple-btn-secondary:hover {
  background-color: rgba(0, 113, 227, 0.08);
}

.close-modal-btn {
  position: fixed;
  top: 32px;
  right: 32px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(220, 220, 220, 0.5);
  border: none;
  font-size: 24px;
  color: var(--gray-500);
  cursor: pointer;
  z-index: 2001;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.2s;
}

.close-modal-btn:hover {
    background: rgba(200, 200, 200, 0.8);
    color: var(--black);
}

.product-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.product-gallery-item {
  text-align: center;
  transition: transform 0.3s ease;
}

.product-gallery-item:hover {
  transform: scale(1.02);
}

.product-gallery img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  background: var(--gray-50);
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .product-slide {
    width: 300px;
    height: 380px;
  }
  .product-slideshow {
    height: 420px;
  }
}
</style>
