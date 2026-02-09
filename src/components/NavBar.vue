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
        <router-link to="/" class="brand">EPI Electronics</router-link>
      </h1>
      
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li><router-link to="/" @click="closeMenu">Accueil</router-link></li>
        <li class="dropdown">
          <a href="#" @click.prevent>Produits <i class="fas fa-chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><router-link to="/produits" @click="closeMenu">Tous les Produits</router-link></li>
            <li class="dropdown-divider"></li>
            <li><router-link to="/categorie/ordinateurs-portables" @click="closeMenu">Ordinateurs Portables</router-link></li>
            <li><router-link to="/categorie/imprimantes" @click="closeMenu">Imprimantes</router-link></li>
            <li><router-link to="/categorie/accessoires-peripheriques" @click="closeMenu">Périphériques</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" @click.prevent>Services <i class="fas fa-chevron-down"></i></a>
          <ul class="dropdown-menu">
            <li><router-link to="/services" @click="closeMenu">Tous les Services</router-link></li>
            <li class="dropdown-divider"></li>
            <li><router-link to="/services/conseil" @click="closeMenu">Conseil & Stratégie</router-link></li>
            <li><router-link to="/services/maintenance" @click="closeMenu">Maintenance Proactive</router-link></li>
            <li><router-link to="/services/distribution" @click="closeMenu">Vente & Distribution</router-link></li>
          </ul>
        </li>
        <li><router-link to="/#contact" @click="closeMenu">Contact</router-link></li>
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
/* Navigation Styles - Clean Light Theme */
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
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
  font-weight: 800;
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
  color: #475569;
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
  color: #1e3a8a;
}

.nav-links li a:hover::after {
  width: 100%;
}

/* Dropdown Menu */
.dropdown {
  position: relative;
}

.dropdown > a {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdown > a i {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.dropdown:hover > a i {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  padding: 12px 0;
  min-width: 250px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  border: 1px solid #e2e8f0;
  list-style: none;
  z-index: 100;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  top: calc(100% + 8px);
}

.dropdown-menu li {
  margin: 0;
}

.dropdown-menu li a {
  display: block;
  padding: 12px 24px;
  color: #475569 !important;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 14px;
  background: transparent !important;
  font-weight: 400 !important;
}

.dropdown-menu li a::after {
  display: none !important;
}

.dropdown-menu li a.router-link-active,
.dropdown-menu li a.router-link-exact-active {
  background: transparent !important;
  color: #475569 !important;
  font-weight: 400 !important;
}

.dropdown-menu li a:hover {
  background: rgba(30, 58, 138, 0.08) !important;
  color: #1e3a8a !important;
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 8px 0;
  padding: 0 !important;
}

/* Style the last link (Contact) as a gradient CTA */
.nav-links li:last-child a {
  background: var(--gradient-cta);
  color: white;
  padding: 12px 28px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  font-weight: 600;
}

.nav-links li:last-child a::after {
  display: none;
}

.nav-links li:last-child a:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
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
  color: #0f172a;
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
    color: #0f172a;
  }
  
  .nav-links li:last-child a {
    display: inline-block;
    width: auto;
    margin-top: 8px;
  }

  /* Mobile dropdown */
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background: var(--color-surface);
    margin-top: 8px;
    border-radius: var(--radius-md);
  }

  .dropdown > a i {
    display: none;
  }
}
</style>
