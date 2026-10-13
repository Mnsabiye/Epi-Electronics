<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  products,
  getProductBySlug,
  getCategoryBySlug,
  formatBIF,
  addToQuoteBatch
} from '../data/products.js'

const route = useRoute()
const router = useRouter()

const qty = ref(1)
const addedFeedback = ref(false)

const product = computed(() => getProductBySlug(String(route.params.slug || '')))
const category = computed(() =>
  product.value ? getCategoryBySlug(product.value.categorySlug) : null
)
const relatedProducts = computed(() => {
  if (!product.value) return []
  return products
    .filter((p) => p.category === product.value.category && p.slug !== product.value.slug)
    .slice(0, 3)
})

watch(
  () => route.params.slug,
  () => {
    qty.value = 1
    addedFeedback.value = false
  }
)

function handleAddBatch() {
  if (!product.value) return
  addToQuoteBatch(product.value, qty.value)
  addedFeedback.value = true
  setTimeout(() => {
    addedFeedback.value = false
  }, 2000)
}

function goToExpressQuote() {
  if (!product.value) return
  addToQuoteBatch(product.value, qty.value)
  router.push({ path: '/demandez-un-devis', query: { product: product.value.slug } })
}
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div v-if="product" class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter py-space-xl space-y-space-xl">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-label-sm text-xs text-on-surface-variant flex-wrap" aria-label="Fil d'Ariane">
        <router-link to="/" class="hover:text-primary transition-colors">Accueil</router-link>
        <span>/</span>
        <router-link to="/produits" class="hover:text-primary transition-colors">Catalogue</router-link>
        <template v-if="category">
          <span>/</span>
          <router-link :to="`/categorie/${category.slug}`" class="hover:text-primary transition-colors">
            {{ category.shortName }}
          </router-link>
        </template>
        <span>/</span>
        <span class="text-primary font-semibold">{{ product.name }}</span>
      </nav>

      <!-- Product Main Detail Card -->
      <div class="bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl shadow-sm border border-surface-container-highest/60 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <!-- Left 5 Cols: Product Studio Visual -->
        <div class="lg:col-span-5">
          <div class="relative bg-surface-container-low rounded-2xl p-space-lg aspect-[4/3] flex items-center justify-center overflow-hidden border border-surface-container-highest/40">
            <img
              :alt="product.name"
              :src="product.image"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Institutional Guarantees Strip -->
          <div class="grid grid-cols-3 gap-2 mt-space-md text-center">
            <div class="p-3 rounded-xl bg-surface-container-low">
              <span class="material-symbols-outlined text-primary text-lg block mb-0.5">verified</span>
              <span class="font-label-sm text-[11px] text-on-surface font-semibold block">Scellé d'origine</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-low">
              <span class="material-symbols-outlined text-primary text-lg block mb-0.5">receipt_long</span>
              <span class="font-label-sm text-[11px] text-on-surface font-semibold block">Facture OBR</span>
            </div>
            <div class="p-3 rounded-xl bg-surface-container-low">
              <span class="material-symbols-outlined text-primary text-lg block mb-0.5">local_shipping</span>
              <span class="font-label-sm text-[11px] text-on-surface font-semibold block">Livraison 24/48h</span>
            </div>
          </div>
        </div>

        <!-- Right 7 Cols: Technical Sheet & Procurement Actions -->
        <div class="lg:col-span-7 flex flex-col space-y-space-md">
          <div>
            <span class="font-code-num text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
              RÉFÉRENCE CONSTRUCTEUR : {{ product.ref }}
            </span>
            <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight">
              {{ product.name }}
            </h1>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- BIF Price Box -->
          <div class="p-space-md rounded-2xl bg-surface-container-low border border-surface-container-highest/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant block">
                Tarif Unitaire Professionnel
              </span>
              <div class="flex items-baseline gap-2 mt-0.5">
                <span class="font-headline-lg text-primary font-extrabold font-code-num">
                  {{ formatBIF(product.price) }}
                </span>
                <span class="font-title-md text-on-surface font-bold">BIF TTC</span>
              </div>
              <span class="font-label-sm text-xs text-on-surface-variant block mt-0.5">
                {{ product.priceSubtext }}
              </span>
            </div>
            <div class="flex flex-col sm:items-end text-xs text-on-surface-variant font-code-num">
              <span class="px-2.5 py-1 rounded bg-surface-container text-primary font-bold">
                Garantie {{ product.warrantyMonths || 12 }} Mois
              </span>
              <span class="mt-1">Exonération ONG / Marchés publics acceptée</span>
            </div>
          </div>

          <!-- Technical Specs Table -->
          <div class="bg-surface-container-low/60 rounded-2xl p-space-md space-y-2 border border-surface-container-highest/40">
            <h2 class="font-title-md text-xs uppercase tracking-wider text-primary font-bold mb-2">
              Spécifications Techniques Clés
            </h2>
            <div
              v-for="(spec, idx) in product.specs"
              :key="idx"
              class="flex items-center justify-between py-1.5 border-b border-surface-container-highest/40 last:border-0 text-xs"
            >
              <span class="flex items-center gap-2 text-on-surface-variant">
                <span class="material-symbols-outlined text-base text-primary">{{ spec.icon }}</span>
                <span>{{ spec.label }}</span>
              </span>
              <strong class="font-code-num text-on-surface">{{ spec.value }}</strong>
            </div>
            <div v-if="product.features && product.features.length" class="pt-2 flex flex-wrap gap-1.5">
              <span
                v-for="(feat, fIdx) in product.features"
                :key="fIdx"
                class="px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-[11px] border border-surface-container-highest/50"
              >
                {{ feat }}
              </span>
            </div>
          </div>

          <!-- Quantity & Action Buttons -->
          <div class="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div class="flex items-center justify-between bg-surface-container-low rounded-xl px-3 py-2 border border-surface-container-highest/60">
              <span class="font-label-sm text-xs text-on-surface-variant mr-3">Quantité :</span>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface hover:bg-surface-container"
                  @click="qty = Math.max(1, qty - 1)"
                >
                  -
                </button>
                <input
                  v-model.number="qty"
                  min="1"
                  max="200"
                  type="number"
                  class="w-12 text-center bg-transparent font-code-num text-sm font-bold text-on-surface focus:outline-none"
                />
                <button
                  type="button"
                  class="w-7 h-7 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface hover:bg-surface-container"
                  @click="qty++"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              class="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              @click="goToExpressQuote"
            >
              <span class="material-symbols-outlined text-base">request_quote</span>
              <span>Générer Proforma OBR ({{ formatBIF(product.price * qty) }} BIF)</span>
            </button>

            <button
              type="button"
              class="py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              @click="handleAddBatch"
            >
              <span class="material-symbols-outlined text-base">
                {{ addedFeedback ? 'check' : 'post_add' }}
              </span>
              <span>{{ addedFeedback ? 'Ajouté au lot' : '+ Lot Devis' }}</span>
            </button>

            <a
              class="py-3 px-4 rounded-xl bg-[#25d366] hover:bg-[#1ebd5b] text-white font-label-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              :href="`https://wa.me/25767405262?text=${encodeURIComponent('Bonjour EPI Electronics, je souhaite commander ' + qty + 'x ' + product.name + ' (REF: ' + product.ref + ')')}`"
              rel="noopener"
              target="_blank"
            >
              <span class="material-symbols-outlined text-base">chat</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <section v-if="relatedProducts.length > 0" class="space-y-space-md">
        <div class="flex items-center justify-between">
          <h2 class="font-headline-sm text-on-surface font-bold">
            Équipements complémentaires du même rayon
          </h2>
          <router-link
            to="/produits"
            class="text-xs font-label-md text-primary font-bold hover:underline inline-flex items-center gap-1"
          >
            <span>Tout le catalogue</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <router-link
            v-for="rel in relatedProducts"
            :key="rel.id"
            :to="`/produit/${rel.slug}`"
            class="bg-surface-container-lowest rounded-2xl p-space-md border border-surface-container-highest/50 hover:shadow-md transition-all flex items-center gap-4 group"
          >
            <img
              :alt="rel.name"
              :src="rel.image"
              class="w-20 h-20 object-contain rounded-xl bg-surface-container-low p-2 shrink-0"
            />
            <div class="min-w-0">
              <span class="font-code-num text-[11px] text-on-surface-variant block">REF: {{ rel.ref }}</span>
              <h3 class="font-title-md text-sm text-on-surface font-bold truncate group-hover:text-primary">
                {{ rel.name }}
              </h3>
              <span class="font-code-num text-xs text-primary font-bold block mt-1">
                {{ formatBIF(rel.price) }} BIF
              </span>
            </div>
          </router-link>
        </div>
      </section>
    </div>

    <!-- Fallback if product not found -->
    <div v-else class="max-w-[1440px] mx-auto px-gutter py-20 text-center space-y-4">
      <span class="material-symbols-outlined text-5xl text-primary">search_off</span>
      <h1 class="font-headline-md text-on-surface font-bold">Référence produit introuvable</h1>
      <p class="font-body-md text-on-surface-variant">
        Cet équipement n'est plus listé sous cette URL ou a été remplacé par une génération plus récente.
      </p>
      <router-link
        to="/produits"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md"
      >
        <span>Retour au Catalogue</span>
        <span class="material-symbols-outlined text-base">arrow_forward</span>
      </router-link>
    </div>
  </main>
</template>
