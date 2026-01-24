<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isHidden = ref(false)
let lastScrollY = 0

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  if (currentScrollY > 50) {
    isScrolled.value = true
  } else {
    isScrolled.value = false
  }
  
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    isHidden.value = true
  } else {
    isHidden.value = false
  }
  
  lastScrollY = currentScrollY
}

const closeMenu = (e) => {
    isMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="{ hidden: isHidden }">
    <nav class="navbar" :class="{ scrolled: isScrolled }">
      <h1 class="logo">
        <a href="#home" class="brand">EPI Electronics</a>
      </h1>
      
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li><a href="#home" @click="closeMenu">Accueil</a></li>
        <li><a href="#products" @click="closeMenu">Produits</a></li>
        <li><a href="#services" @click="closeMenu">Services</a></li>
        <li><a href="#testimonials" @click="closeMenu">Témoignages</a></li>
        <li><a href="#contact" @click="closeMenu">Contact</a></li>
      </ul>

      <div class="nav-controls">
        <button class="mobile-menu-toggle" @click="toggleMenu">
          <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Navigation Styles */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.3s ease;
}

header.hidden {
  transform: translateY(-100%);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-xs);
}

.logo {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-900);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
}

.nav-links li a {
  font-size: 14px;
  font-weight: 400;
  color: var(--gray-500);
  padding: 8px 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-links li a:hover {
  color: var(--gray-900);
}

.nav-controls {
  display: flex;
  align-items: center;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--gray-900);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
}

@media (max-width: 1024px) {
  .navbar {
    padding: 16px 32px;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 14px 20px;
  }
  
  .mobile-menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    padding: 24px;
    gap: 0;
    border-bottom: 1px solid var(--gray-100);
    box-shadow: var(--shadow-md);
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li a {
    display: block;
    padding: 14px 0;
    font-size: 16px;
    border-bottom: 1px solid var(--gray-50);
  }
}
</style>
