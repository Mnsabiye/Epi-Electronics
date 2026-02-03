<script setup>
import { defineAsyncComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'

// Lazy load below-the-fold components for faster initial load
const Products = defineAsyncComponent(() => import('./components/Products.vue'))
const Services = defineAsyncComponent(() => import('./components/Services.vue'))
const Testimonials = defineAsyncComponent(() => import('./components/Testimonials.vue'))
const Newsletter = defineAsyncComponent(() => import('./components/Newsletter.vue'))
const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'))
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
