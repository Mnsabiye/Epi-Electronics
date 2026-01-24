<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import Products from './components/Products.vue'
import Services from './components/Services.vue'
import Testimonials from './components/Testimonials.vue'
import Newsletter from './components/Newsletter.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <NavBar />
  <main>
    <Hero />
    <Products />
    <Services />
    <Testimonials />
    <Newsletter />
  </main>
  <AppFooter />
</template>

<style>
/* Global styles are imported in main.js */
</style>
