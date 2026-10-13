<script setup>
import Hero from '../components/Hero.vue'
import Products from '../components/Products.vue'
import Services from '../components/Services.vue'
import ContactSection from '../components/ContactSection.vue'
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div class="flex flex-col w-full">
      <Hero />
      <Products />
      <Services />
      <ContactSection />
    </div>
  </main>
</template>
