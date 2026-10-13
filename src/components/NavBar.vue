<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories, quoteBatch } from '../data/products.js'

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q || '')
const searchOpen = ref(false)
const mobileMenuOpen = ref(false)
const productsDropdownOpen = ref(false)
const servicesDropdownOpen = ref(false)

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || ''
  }
)

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
    productsDropdownOpen.value = false
    servicesDropdownOpen.value = false
    searchOpen.value = false
  }
)

const quoteCount = computed(() =>
  quoteBatch.value.reduce((sum, item) => sum + (item.qty || 1), 0)
)

const isHomeActive = computed(() => route.path === '/')
const isProductsActive = computed(
  () =>
    route.path.startsWith('/produits') ||
    route.path.startsWith('/categorie') ||
    route.path.startsWith('/produit')
)
const isServicesActive = computed(() => route.path.startsWith('/services'))
const isQuoteActive = computed(() => route.path.startsWith('/demandez-un-devis'))

function handleSearchSubmit() {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ path: '/produits', query: { q } })
  } else {
    router.push({ path: '/produits' })
  }
  mobileMenuOpen.value = false
  searchOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container-highest/60 shadow-[0_1px_3px_rgba(13,28,45,0.04)]">
    <!-- Main Single-Tier Navigation Bar -->
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter h-16 flex items-center justify-between gap-4">
      <!-- Brand Identity (Converted Transparent EPI Logo) -->
      <router-link to="/" class="flex items-center gap-2.5 shrink-0 group">
        <img
          src="/assets/img/epi-logo-mark.png"
          alt="EPI Electronics"
          class="h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
        />
        <div class="hidden sm:flex flex-col border-l border-surface-container-highest pl-2.5">
          <div class="font-title-md text-[14px] leading-none font-extrabold tracking-tight text-primary">
            EPI ELECTRONICS
          </div>
          <span class="font-label-sm text-[10px] text-secondary tracking-wider mt-1 leading-none">
            Computers, Devices &amp; Equipments
          </span>
        </div>
      </router-link>

      <!-- Center Desktop Navigation -->
      <nav class="hidden lg:flex items-center gap-1 font-label-md text-[13px]" aria-label="Navigation principale">
        <router-link
          to="/"
          :class="[
            'px-3.5 py-2 rounded-lg transition-colors',
            isHomeActive
              ? 'bg-surface-container text-primary font-bold'
              : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low font-medium'
          ]"
        >
          Accueil
        </router-link>

        <!-- Produits Dropdown -->
        <div
          class="relative"
          @mouseenter="productsDropdownOpen = true"
          @mouseleave="productsDropdownOpen = false"
        >
          <router-link
            to="/produits"
            :class="[
              'px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1',
              isProductsActive
                ? 'bg-surface-container text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low font-medium'
            ]"
          >
            <span>Produits</span>
            <span class="material-symbols-outlined text-[16px] opacity-75">expand_more</span>
          </router-link>

          <div
            v-show="productsDropdownOpen"
            class="absolute left-0 top-full pt-1.5 w-72 z-50"
          >
            <div class="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-highest/70 p-2 space-y-1">
              <router-link
                to="/produits"
                class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-xs font-bold transition-colors"
              >
                <span class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-base">inventory_2</span>
                  <span>Tout le catalogue</span>
                </span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </router-link>
              <div class="pt-1 border-t border-surface-container-highest/40 space-y-0.5">
                <router-link
                  v-for="cat in categories"
                  :key="cat.slug"
                  :to="`/categorie/${cat.slug}`"
                  class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
                >
                  <span class="material-symbols-outlined text-base text-primary">{{ cat.materialIcon }}</span>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-md text-xs font-semibold text-on-surface truncate">{{ cat.shortName }}</span>
                    <span class="font-body-sm text-[11px] text-on-surface-variant truncate">{{ cat.description }}</span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Services Dropdown -->
        <div
          class="relative"
          @mouseenter="servicesDropdownOpen = true"
          @mouseleave="servicesDropdownOpen = false"
        >
          <router-link
            to="/services"
            :class="[
              'px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1',
              isServicesActive
                ? 'bg-surface-container text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low font-medium'
            ]"
          >
            <span>Services</span>
            <span class="material-symbols-outlined text-[16px] opacity-75">expand_more</span>
          </router-link>

          <div
            v-show="servicesDropdownOpen"
            class="absolute left-0 top-full pt-1.5 w-52 z-50"
          >
            <div class="bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-highest/70 p-1.5 space-y-0.5">
              <router-link
                to="/services/distribution"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
              >
                <span class="material-symbols-outlined text-base text-primary">local_shipping</span>
                <span class="font-label-md text-xs font-semibold">Distribution</span>
              </router-link>
              <router-link
                to="/services/maintenance"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
              >
                <span class="material-symbols-outlined text-base text-primary">build_circle</span>
                <span class="font-label-md text-xs font-semibold">Maintenance</span>
              </router-link>
              <router-link
                to="/services/web"
                class="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-container-low text-on-surface transition-colors"
              >
                <span class="material-symbols-outlined text-base text-primary">hub</span>
                <span class="font-label-md text-xs font-semibold">Réseaux</span>
              </router-link>
            </div>
          </div>
        </div>

        <router-link
          to="/#devis-section"
          class="px-3.5 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors font-medium"
        >
          Contact
        </router-link>
      </nav>

      <!-- Right Actions: Compact Search + Single Devis CTA -->
      <div class="flex items-center gap-2 shrink-0">
        <!-- Expandable/Compact Search on Desktop -->
        <form
          class="hidden xl:flex items-center relative"
          @submit.prevent="handleSearchSubmit"
        >
          <span class="material-symbols-outlined absolute left-2.5 text-outline text-[17px] pointer-events-none">
            search
          </span>
          <input
            v-model="searchQuery"
            class="w-40 focus:w-52 pl-8 pr-3 py-1.5 bg-surface-container-low/80 hover:bg-surface-container-low focus:bg-surface-container-lowest rounded-lg text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary/30 focus:outline-none transition-all"
            placeholder="Réf, ThinkPad, UPS..."
            type="text"
            aria-label="Rechercher un produit"
          />
        </form>

        <!-- Search Toggle Button on Tablet / Small Laptop -->
        <button
          type="button"
          class="xl:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
          aria-label="Rechercher"
          @click="searchOpen = !searchOpen"
        >
          <span class="material-symbols-outlined text-[20px]">search</span>
        </button>

        <!-- Single Header CTA: Devis -->
        <router-link
          to="/demandez-un-devis"
          class="inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-xs"
        >
          <span class="material-symbols-outlined text-[16px]">request_quote</span>
          <span>Devis</span>
          <span
            v-if="quoteCount > 0"
            class="px-1.5 py-0.2 rounded-full bg-white text-primary font-code-num text-[11px] font-bold leading-tight"
          >
            {{ quoteCount }}
          </span>
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors"
          :aria-expanded="mobileMenuOpen"
          aria-label="Menu principal"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="material-symbols-outlined text-xl">
            {{ mobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Compact Search Bar Dropdown (for screens < xl) -->
    <div
      v-if="searchOpen"
      class="xl:hidden border-t border-surface-container-highest/50 bg-surface-container-lowest px-gutter-mobile md:px-gutter py-2.5"
    >
      <form class="max-w-[1440px] mx-auto flex items-center gap-2" @submit.prevent="handleSearchSubmit">
        <div class="relative flex-1">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base">
            search
          </span>
          <input
            v-model="searchQuery"
            class="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Rechercher par référence, marque (HP, Dell, Lenovo, Epson, APC)..."
            type="text"
          />
        </div>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-semibold"
        >
          Chercher
        </button>
      </form>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden border-t border-surface-container-highest/60 bg-surface-container-lowest px-gutter-mobile py-space-md space-y-space-sm shadow-xl"
    >
      <div class="grid grid-cols-1 gap-1">
        <router-link
          to="/"
          class="flex items-center justify-between px-3 py-2 rounded-lg font-label-md text-xs text-on-surface hover:bg-surface-container-low"
        >
          <span>Accueil</span>
          <span class="material-symbols-outlined text-base text-primary">home</span>
        </router-link>
        <router-link
          to="/produits"
          class="flex items-center justify-between px-3 py-2 rounded-lg font-label-md text-xs text-on-surface hover:bg-surface-container-low"
        >
          <span>Catalogue Produits</span>
          <span class="material-symbols-outlined text-base text-primary">inventory_2</span>
        </router-link>
        <div class="px-3 pt-2 pb-0.5 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
          Services
        </div>
        <div class="pl-2 space-y-0.5">
          <router-link
            to="/services/distribution"
            class="flex items-center justify-between px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface hover:bg-surface-container-low"
          >
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-primary">local_shipping</span>
              <span>Distribution</span>
            </span>
          </router-link>
          <router-link
            to="/services/maintenance"
            class="flex items-center justify-between px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface hover:bg-surface-container-low"
          >
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-primary">build_circle</span>
              <span>Maintenance</span>
            </span>
          </router-link>
          <router-link
            to="/services/web"
            class="flex items-center justify-between px-3 py-1.5 rounded-lg font-label-md text-xs text-on-surface hover:bg-surface-container-low"
          >
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined text-sm text-primary">hub</span>
              <span>Réseaux</span>
            </span>
          </router-link>
        </div>
        <router-link
          to="/demandez-un-devis"
          class="flex items-center justify-between px-3 py-2 rounded-lg font-label-md text-xs text-primary font-bold bg-surface-container-low"
        >
          <span>Demander un devis</span>
          <span class="material-symbols-outlined text-base">request_quote</span>
        </router-link>
      </div>

      <div class="pt-2 border-t border-surface-container-highest/50">
        <span class="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1.5 px-1">
          Rayons Matériel
        </span>
        <div class="grid grid-cols-2 gap-1.5">
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/categorie/${cat.slug}`"
            class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-xs font-medium text-on-surface"
          >
            <span class="material-symbols-outlined text-sm text-primary">{{ cat.materialIcon }}</span>
            <span class="truncate">{{ cat.shortName }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>
