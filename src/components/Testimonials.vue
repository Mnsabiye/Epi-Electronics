<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Directrice IT, TechCorp",
    text: "Service exceptionnel ! Epi Electronics a transformé notre infrastructure informatique. Leur expertise et leur réactivité sont remarquables."
  },
  {
    name: "Jean Martin",
    role: "Gérant, BureauPlus",
    text: "Maintenance professionnelle et conseils précieux. Notre équipement fonctionne parfaitement depuis 2 ans grâce à leur suivi."
  },
  {
    name: "Sophie Laurent",
    role: "Responsable Formation, EduTech",
    text: "Formation excellente ! L'équipe nous a appris à maîtriser nos nouveaux systèmes. Très pédagogues et patients."
  }
]

const currentIndex = ref(0)
let intervalId

const startAutoRotate = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 5000)
}

const stopAutoRotate = () => {
  if (intervalId) clearInterval(intervalId)
}

onMounted(() => {
  startAutoRotate()
})

onUnmounted(() => {
  stopAutoRotate()
})
</script>

<template>
  <section class="testimonials" id="testimonials">
    <h2>Témoignages Clients</h2>
    <p>Découvrez ce que nos clients disent de nos services</p>
    
    <div class="testimonials-container" @mouseenter="stopAutoRotate" @mouseleave="startAutoRotate">
       <transition name="fade" mode="out-in">
        <div class="testimonial-card" :key="currentIndex">
            <div class="testimonial-content">
            <div class="stars">
                <i class="fas fa-star" v-for="n in 5" :key="n"></i>
            </div>
            <p>"{{ testimonials[currentIndex].text }}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">
                <i class="fas fa-user"></i>
                </div>
                <div class="author-info">
                <h4>{{ testimonials[currentIndex].name }}</h4>
                <span>{{ testimonials[currentIndex].role }}</span>
                </div>
            </div>
            </div>
        </div>
       </transition>
    </div>

    <div class="testimonial-nav">
      <button 
        v-for="(n, index) in testimonials.length" 
        :key="index"
        class="nav-dot" 
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: var(--section-padding);
  background: var(--gray-50);
  text-align: center;
}

.testimonials h2 {
  font-size: clamp(40px, 5vw, 56px);
  margin-bottom: 16px;
  color: var(--gray-900);
}

.testimonials > p {
  font-size: 19px;
  color: var(--gray-400);
  max-width: 500px;
  margin: 0 auto 60px;
}

.testimonials-container {
  max-width: 700px;
  margin: 0 auto 40px;
  height: 350px; /* Fixed height to prevent jumping */
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-card {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: 48px 40px;
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-100);
  width: 100%;
}

.stars {
  color: #f5a623;
  font-size: 16px;
  margin-bottom: 24px;
  letter-spacing: 4px;
}

.testimonial-content p {
  font-size: 18px;
  color: var(--gray-500);
  line-height: 1.7;
  font-style: italic;
  margin-bottom: 32px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
}

.author-avatar {
  width: 48px;
  height: 48px;
  background: var(--gray-100);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  font-size: 18px;
}

.author-info {
  text-align: left;
}

.author-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 2px;
}

.author-info span {
  font-size: 14px;
  color: var(--gray-400);
}

.testimonial-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--gray-200);
  cursor: pointer;
  transition: var(--transition-base);
  padding: 0;
}

.nav-dot.active {
  background: var(--gray-900);
  transform: scale(1.25);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
