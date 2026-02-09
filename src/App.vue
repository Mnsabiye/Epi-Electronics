<script setup>
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
</script>

<template>
  <div id="app">
    <NavBar />
    <router-view />
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>

<style>
/* Global styles are imported in main.js */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
