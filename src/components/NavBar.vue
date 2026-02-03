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
/* Navigation Styles - JetBrains Dark Theme */
header {
  position: fixed;
  top: 24px;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  padding: 0 24px;
}

header.hidden {
  transform: translateY(-150%);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 32px;
  width: 100%;
  max-width: 1200px;
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 1px solid rgba(63, 63, 70, 0.5);
}

.navbar.scrolled {
  background: rgba(13, 13, 13, 0.95);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), var(--shadow-glow);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  margin-right: auto;
}

.logo .brand {
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 32px;
  align-items: center;
  margin: 0 40px;
}

.nav-links li a {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  position: relative;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
}

.nav-links li a:hover {
  color: var(--color-text);
}

.nav-links li a:hover::after {
  width: 100%;
}

/* Style the last link (Contact) as a gradient CTA */
.nav-links li:last-child a {
  background: var(--gradient-cta);
  color: white;
  padding: 12px 28px;
  border-radius: 50px;
  box-shadow: var(--shadow-md), var(--shadow-glow);
  font-weight: 600;
}

.nav-links li:last-child a::after {
  display: none;
}

.nav-links li:last-child a:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow-strong);
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text);
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
}

@media (max-width: 1024px) {
  .nav-links {
    gap: 20px;
    margin: 0 20px;
  }
}

@media (max-width: 868px) {
  header {
    top: 0;
    padding: 0;
  }
  
  .navbar {
    max-width: 100%;
    border-radius: 0;
    padding: 16px 24px;
    border: none;
    border-bottom: 1px solid var(--color-border);
  }

  .mobile-menu-toggle {
    display: block;
    margin-left: auto;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-background);
    flex-direction: column;
    padding: 24px;
    gap: 16px;
    border-top: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    margin: 0;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    width: 100%;
    text-align: center;
  }

  .nav-links li a {
    display: block;
    padding: 12px 0;
    color: var(--color-text);
  }
  
  .nav-links li:last-child a {
    display: inline-block;
    width: auto;
    margin-top: 8px;
  }
}
</style>
