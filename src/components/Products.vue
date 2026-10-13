<script setup>
import { ref, computed } from 'vue'
import { products, formatBIF, addToQuoteBatch } from '../data/products.js'

const selectedTab = ref('all')
const addedFeedbackSlug = ref('')

const tabs = [
  { id: 'all', label: 'Tous les modèles' },
  { id: 'laptops', label: 'Ordinateurs' },
  { id: 'printers', label: 'Impression' },
  { id: 'power', label: 'Énergie & Onduleurs' },
  { id: 'infrastructure', label: 'Serveurs & Réseaux' }
]

const displayedProducts = computed(() => {
  if (selectedTab.value === 'all') {
    const featured = products.filter((p) => p.featuredHome)
    return featured.length >= 4 ? featured.slice(0, 4) : products.slice(0, 4)
  }
  return products.filter((p) => p.category === selectedTab.value).slice(0, 4)
})

function handleQuickQuoteAdd(product) {
  addToQuoteBatch(product, 1)
  addedFeedbackSlug.value = product.slug
  setTimeout(() => {
    if (addedFeedbackSlug.value === product.slug) {
      addedFeedbackSlug.value = ''
    }
  }, 1800)
}
</script>

<template>
  <!-- CATALOGUE PRODUITS DISPONIBLES -->
  <section id="catalogue" class="py-space-xl">
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-space-lg gap-space-md">
        <div>
          <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-bold">
            Dispo
          </h2>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            :class="[
              'font-label-md text-xs px-4 py-1.5 rounded-full transition-colors whitespace-nowrap',
              selectedTab === tab.id
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
            ]"
            @click="selectedTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 4-Column Product Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <article
          v-for="product in displayedProducts"
          :key="product.id"
          class="bg-surface-container-lowest rounded-2xl p-space-md border border-surface-container-highest/60 hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <router-link
              :to="`/produit/${product.slug}`"
              class="block h-44 w-full bg-surface-container-low rounded-xl overflow-hidden mb-space-sm relative"
            >
              <img
                :alt="product.name"
                :src="product.image"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </router-link>

            <span class="font-label-sm text-[11px] font-bold text-primary uppercase block">
              {{ product.brandLabel || product.brand }}
            </span>

            <router-link :to="`/produit/${product.slug}`">
              <h3 class="font-title-md text-title-md text-on-surface font-bold leading-snug group-hover:text-primary transition-colors">
                {{ product.name }}
              </h3>
            </router-link>

            <p class="font-body-sm text-xs text-on-surface-variant my-1 font-light line-clamp-1">
              {{ product.shortDesc }}
            </p>

            <div class="bg-surface-container-low rounded-lg p-2.5 text-xs space-y-1 text-on-surface-variant my-2">
              <div
                v-for="(spec, idx) in (product.homeSpecs || product.specs.slice(0, 2))"
                :key="idx"
                class="flex justify-between gap-2"
              >
                <span>{{ spec.label }} :</span>
                <span class="text-on-surface font-medium text-right truncate">{{ spec.value }}</span>
              </div>
            </div>
          </div>

          <div class="pt-2.5 border-t border-surface-container-highest/40">
            <div class="font-headline-sm text-primary font-bold">
              {{ formatBIF(product.price) }} BIF
            </div>
            <span class="font-label-sm text-[11px] text-on-surface-variant block mb-2.5 truncate">
              {{ product.priceSubtext || 'Tarif HTVA (Facture OBR)' }}
            </span>

            <div class="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                class="w-full inline-flex items-center justify-center gap-1 bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-label-md text-xs py-2 rounded-xl transition-all"
                @click="handleQuickQuoteAdd(product)"
              >
                <span class="material-symbols-outlined text-sm">
                  {{ addedFeedbackSlug === product.slug ? 'check' : 'post_add' }}
                </span>
                <span>{{ addedFeedbackSlug === product.slug ? 'Ajouté' : 'Ajouter Devis' }}</span>
              </button>

              <a
                class="w-full inline-flex items-center justify-center gap-1 bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs py-2 rounded-xl transition-all shadow-sm"
                :href="`https://wa.me/25767405262?text=${encodeURIComponent('Commande / Devis ' + product.name + ' (' + formatBIF(product.price) + ' BIF)')}`"
                rel="noopener"
                target="_blank"
              >
                <span class="material-symbols-outlined text-sm">chat</span>
                <span>Commander</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Footer Link to Complete Catalogue -->
      <div class="mt-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface-container-low/80 p-space-md rounded-2xl border border-surface-container-highest/50">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl">inventory</span>
          <div>
            <div class="font-title-md text-sm font-bold text-on-surface">
              Catalogue Complet ({{ products.length }} références disponibles)
            </div>
            <div class="font-body-sm text-xs text-on-surface-variant">
              Filtrez par processeur, capacité RAM, marque constructeur et budget en BIF.
            </div>
          </div>
        </div>
        <router-link
          to="/produits"
          class="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all shrink-0"
        >
          <span>Ouvrir le Catalogue Complet</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
