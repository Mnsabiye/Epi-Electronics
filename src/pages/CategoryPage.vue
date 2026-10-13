<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
  formatBIF,
  addToQuoteBatch
} from '../data/products.js'

const route = useRoute()
const addedFeedbackId = ref(null)

const currentCategory = computed(() => getCategoryBySlug(String(route.params.slug || '')))
const categoryProducts = computed(() => getProductsByCategory(String(route.params.slug || '')))

function handleAddToQuote(product) {
  addToQuoteBatch(product, 1)
  addedFeedbackId.value = product.id
  setTimeout(() => {
    if (addedFeedbackId.value === product.id) {
      addedFeedbackId.value = null
    }
  }, 1800)
}
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div v-if="currentCategory" class="flex flex-col w-full">
      <!-- Category Hero Header -->
      <section class="w-full bg-surface-container-low py-space-xl px-gutter-mobile md:px-gutter border-b border-surface-container-highest/40">
        <div class="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          <div class="lg:col-span-8 space-y-space-sm">
            <div class="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant flex-wrap">
              <router-link to="/" class="hover:text-primary transition-colors">Accueil</router-link>
              <span>/</span>
              <router-link to="/produits" class="hover:text-primary transition-colors">Catalogue</router-link>
              <span>/</span>
              <span class="text-primary font-bold">{{ currentCategory.name }}</span>
            </div>

            <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight">
              {{ currentCategory.name }}
            </h1>
            <p class="font-body-lg text-body-md text-on-surface-variant max-w-2xl">
              {{ currentCategory.description }}
            </p>

            <!-- Category Quick Switcher Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
              <router-link
                to="/produits"
                class="shrink-0 px-3.5 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-primary font-label-sm text-xs border border-surface-container-highest/50"
              >
                Tout le Catalogue
              </router-link>
              <router-link
                v-for="cat in categories"
                :key="cat.slug"
                :to="`/categorie/${cat.slug}`"
                :class="[
                  'shrink-0 px-3.5 py-1.5 rounded-lg font-label-sm text-xs transition-all',
                  cat.slug === currentCategory.slug
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-primary'
                ]"
              >
                {{ cat.shortName }}
              </router-link>
            </div>
          </div>

          <div class="lg:col-span-4">
            <div class="rounded-2xl overflow-hidden bg-surface-container-lowest p-3 shadow-sm border border-surface-container-highest/50">
              <img
                :alt="currentCategory.name"
                :src="currentCategory.image"
                class="w-full h-48 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="w-full max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter py-space-xl">
        <div class="flex items-center justify-between mb-space-md">
          <span class="font-title-md text-sm text-on-surface font-bold">
            {{ categoryProducts.length }} équipement{{ categoryProducts.length > 1 ? 's' : '' }} disponible{{ categoryProducts.length > 1 ? 's' : '' }} dans ce rayon
          </span>
          <router-link
            to="/demandez-un-devis"
            class="text-xs font-label-md text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Demander une cotation groupée</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <article
            v-for="product in categoryProducts"
            :key="product.id"
            class="group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md border border-surface-container-highest/50 transition-all flex flex-col justify-between"
          >
            <div>
              <router-link
                :to="`/produit/${product.slug}`"
                class="relative bg-surface-container-low rounded-lg p-space-sm aspect-[4/3] flex items-center justify-center overflow-hidden mb-space-sm block"
              >
                <img
                  :alt="product.name"
                  :src="product.image"
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </router-link>

              <div class="space-y-1">
                <span class="font-code-num text-xs text-on-surface-variant uppercase tracking-wider block">
                  REF: {{ product.ref }}
                </span>
                <router-link :to="`/produit/${product.slug}`">
                  <h3 class="font-title-md text-title-md text-on-surface font-bold group-hover:text-primary transition-colors">
                    {{ product.name }}
                  </h3>
                </router-link>
                <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                  {{ product.shortDesc }}
                </p>
              </div>

              <div class="mt-space-sm pt-space-xs space-y-1 bg-surface-container-low/60 p-2.5 rounded-lg font-body-sm text-body-sm">
                <div
                  v-for="(spec, sIdx) in product.specs"
                  :key="sIdx"
                  class="flex items-center justify-between text-xs text-on-surface-variant gap-2"
                >
                  <span class="flex items-center gap-1 shrink-0">
                    <span class="material-symbols-outlined text-sm text-primary">{{ spec.icon }}</span>
                    <span>{{ spec.label }}</span>
                  </span>
                  <strong class="font-code-num text-on-surface text-right truncate">{{ spec.value }}</strong>
                </div>
              </div>
            </div>

            <div class="mt-space-md pt-space-xs">
              <div class="flex flex-col mb-space-sm">
                <div class="flex items-baseline gap-1.5">
                  <span class="font-headline-sm text-headline-sm text-primary font-bold">
                    {{ formatBIF(product.price) }}
                  </span>
                  <span class="font-label-md text-label-md text-on-surface font-semibold">BIF TTC</span>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {{ product.priceSubtext }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  class="w-full py-2 px-2 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-sm text-label-sm font-semibold transition-all flex items-center justify-center gap-1"
                  @click="handleAddToQuote(product)"
                >
                  <span class="material-symbols-outlined text-base">
                    {{ addedFeedbackId === product.id ? 'check' : 'post_add' }}
                  </span>
                  <span>{{ addedFeedbackId === product.id ? 'Ajouté !' : 'Ajouter Devis' }}</span>
                </button>
                <a
                  class="w-full py-2 px-2 rounded-lg bg-[#25d366] hover:bg-[#1ebd5b] text-white font-label-sm text-label-sm font-semibold transition-all flex items-center justify-center gap-1 shadow-sm"
                  :href="`https://wa.me/25767405262?text=${encodeURIComponent('Bonjour, je souhaite commander immédiatement ' + product.name + ' (' + formatBIF(product.price) + ' BIF)')}`"
                  rel="noopener"
                  target="_blank"
                >
                  <span class="material-symbols-outlined text-base">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <!-- Fallback if category slug not found -->
    <div v-else class="max-w-[1440px] mx-auto px-gutter py-20 text-center space-y-4">
      <span class="material-symbols-outlined text-5xl text-primary">inventory_2</span>
      <h1 class="font-headline-md text-on-surface font-bold">Catégorie introuvable</h1>
      <p class="font-body-md text-on-surface-variant">Consultez notre catalogue complet d'équipements.</p>
      <router-link
        to="/produits"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md"
      >
        <span>Voir tout le catalogue</span>
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </router-link>
    </div>
  </main>
</template>
