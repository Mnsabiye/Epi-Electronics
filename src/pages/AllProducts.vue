<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  products,
  formatBIF,
  quoteBatch,
  addToQuoteBatch
} from '../data/products.js'

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.q || '')
const selectedBrand = ref(route.query.brand || 'all')
const selectedCategory = ref(route.query.cat || 'all')
const sortBy = ref('pop')
const maxPrice = ref(35000000)

// Territory / Stock checkboxes
const filterStockBujumbura = ref(false)
const filterStockHubs = ref(false)
const filterStockExpress = ref(false)

// CPU checkboxes
const selectedCpus = ref([])

// RAM pills
const selectedRam = ref('')

// Warranty checkboxes
const filterWarranty12 = ref(false)
const filterWarranty24 = ref(false)

// Feedback state when adding to quote
const addedFeedbackId = ref(null)

// Bottom RFQ form state
const rfqOrg = ref('')
const rfqPhone = ref('')
const rfqCity = ref('Bujumbura')
const rfqDetails = ref('')
const rfqSubmitted = ref(false)

watch(
  () => route.query,
  (q) => {
    if (q.q !== undefined) searchQuery.value = q.q || ''
    if (q.brand !== undefined) selectedBrand.value = q.brand || 'all'
    if (q.cat !== undefined) selectedCategory.value = q.cat || 'all'
  }
)

const brands = ['all', 'Dell', 'HP', 'Lenovo', 'Epson', 'APC', 'Cisco', 'Apple']

const categoryTabs = computed(() => [
  { id: 'all', label: 'Tous les Produits', count: products.length },
  {
    id: 'laptops',
    label: 'Ordinateurs Portables',
    count: products.filter((p) => p.category === 'laptops').length
  },
  {
    id: 'printers',
    label: 'Imprimantes & Scanners',
    count: products.filter((p) => p.category === 'printers').length
  },
  {
    id: 'infrastructure',
    label: 'Serveurs & Réseaux',
    count: products.filter((p) => p.category === 'infrastructure').length
  },
  {
    id: 'power',
    label: 'Onduleurs & Protection',
    count: products.filter((p) => p.category === 'power').length
  },
  {
    id: 'accessories',
    label: 'Périphériques & Bureautique',
    count: products.filter((p) => p.category === 'accessories').length
  }
])

const hubCounts = computed(() => ({
  bujumbura: products.filter((p) => p.hub === 'bujumbura').length,
  gitega: products.filter((p) => p.hub === 'gitega').length,
  express: products.filter((p) => p.hub === 'express').length
}))

const quoteCount = computed(() =>
  quoteBatch.value.reduce((sum, item) => sum + (item.qty || 1), 0)
)

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()

  const list = products.filter((p) => {
    if (selectedCategory.value !== 'all' && p.category !== selectedCategory.value) {
      return false
    }
    if (
      selectedBrand.value !== 'all' &&
      p.brand.toLowerCase() !== selectedBrand.value.toLowerCase()
    ) {
      return false
    }
    if (p.price > maxPrice.value) {
      return false
    }

    // Territory filter if any checked
    if (filterStockBujumbura.value || filterStockHubs.value || filterStockExpress.value) {
      const matchBuja = filterStockBujumbura.value && p.hub === 'bujumbura'
      const matchHubs = filterStockHubs.value && p.hub === 'gitega'
      const matchExpress = filterStockExpress.value && p.hub === 'express'
      if (!matchBuja && !matchHubs && !matchExpress) return false
    }

    // CPU filter
    if (selectedCpus.value.length > 0) {
      if (!selectedCpus.value.includes(p.cpuTag)) return false
    }

    // RAM filter
    if (selectedRam.value) {
      if (p.ramTag !== selectedRam.value) return false
    }

    // Warranty filter
    if (filterWarranty24.value && (p.warrantyMonths || 12) < 24) {
      return false
    }

    // Search query
    if (q) {
      const haystack = [
        p.name,
        p.ref,
        p.brand,
        p.brandLabel,
        p.shortDesc,
        p.description,
        ...(p.specs || []).map((s) => `${s.label} ${s.value}`)
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }

    return true
  })

  if (sortBy.value === 'price-asc') {
    return [...list].sort((a, b) => a.price - b.price)
  }
  if (sortBy.value === 'price-desc') {
    return [...list].sort((a, b) => b.price - a.price)
  }
  if (sortBy.value === 'stock') {
    return [...list].sort((a, b) => (a.hub === 'bujumbura' ? -1 : 1))
  }
  return list
})

function resetAllFilters() {
  searchQuery.value = ''
  selectedBrand.value = 'all'
  selectedCategory.value = 'all'
  sortBy.value = 'pop'
  maxPrice.value = 35000000
  filterStockBujumbura.value = false
  filterStockHubs.value = false
  filterStockExpress.value = false
  selectedCpus.value = []
  selectedRam.value = ''
  filterWarranty12.value = false
  filterWarranty24.value = false
  router.replace({ path: '/produits', query: {} })
}

function toggleRamFilter(ram) {
  selectedRam.value = selectedRam.value === ram ? '' : ram
}

function handleAddToQuote(product) {
  addToQuoteBatch(product, 1)
  addedFeedbackId.value = product.id
  setTimeout(() => {
    if (addedFeedbackId.value === product.id) {
      addedFeedbackId.value = null
    }
  }, 1800)
}

function handleRfqSubmit() {
  if (!rfqOrg.value.trim() || !rfqPhone.value.trim()) return
  rfqSubmitted.value = true
  const msg = `Bonjour EPI Electronics (Appel d'Offres / Devis Flotte),\n*Organisation:* ${rfqOrg.value}\n*Téléphone:* ${rfqPhone.value}\n*Ville:* ${rfqCity.value}\n*Besoins:* ${rfqDetails.value || 'Demande de cotation parc IT'}`
  window.open(`https://wa.me/25767405262?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
}
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div class="flex flex-col w-full">
      <!-- Top Command Center / Micro Hero Bar -->
      <section class="w-full bg-surface-container-low py-space-lg px-gutter-mobile md:px-gutter border-b border-surface-container-highest/40">
        <div class="max-w-[1440px] mx-auto flex flex-col gap-space-md">
          <!-- Breadcrumb & Stock Status Row -->
          <div class="flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
            <div class="flex items-center gap-space-xs flex-wrap">
              <router-link to="/" class="hover:text-primary transition-colors">Accueil</router-link>
              <span>/</span>
              <span class="text-primary font-semibold">Catalogue Matériel</span>
            </div>
            <div class="hidden sm:flex items-center gap-space-md">
              <span>Dédouanement OBR conforme • Facturation BIF HT / TTC</span>
            </div>
          </div>

          <!-- Action Search & Brand Badges Header -->
          <div class="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-surface-container-highest/50 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            <div class="relative flex-1 max-w-2xl">
              <span class="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline">
                manage_search
              </span>
              <input
                v-model="searchQuery"
                class="w-full pl-11 pr-24 py-3 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                placeholder="Rechercher par référence, processeur, marque (ex: ThinkPad T14, PowerEdge, EcoTank, Smart-UPS)..."
                type="text"
              />
              <button
                v-if="searchQuery"
                type="button"
                class="absolute right-20 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-primary px-1"
                @click="searchQuery = ''"
              >
                Effacer
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 px-space-sm py-1.5 rounded-md bg-primary text-on-primary font-label-sm text-label-sm shadow-sm hover:bg-primary-container transition-all"
              >
                Chercher
              </button>
            </div>

            <!-- Quick Partner Tags -->
            <div class="flex items-center gap-1.5 flex-wrap font-label-sm text-label-sm">
              <span class="text-on-surface-variant mr-1">Constructeurs :</span>
              <button
                v-for="brand in brands"
                :key="brand"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-full transition-all',
                  selectedBrand.toLowerCase() === brand.toLowerCase()
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary'
                ]"
                @click="selectedBrand = brand"
              >
                {{ brand === 'all' ? 'Tous' : brand }}
              </button>
            </div>
          </div>

          <!-- Segment Tabs & Control Row -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pt-space-xs">
            <!-- Category Segment Pills -->
            <div class="flex items-center gap-2 overflow-x-auto pb-1 font-label-md text-label-md">
              <button
                v-for="tab in categoryTabs"
                :key="tab.id"
                type="button"
                :class="[
                  'shrink-0 px-4 py-2 rounded-lg transition-all',
                  selectedCategory === tab.id
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container hover:text-primary'
                ]"
                @click="selectedCategory = tab.id"
              >
                {{ tab.label }}
                <span class="ml-1 opacity-80 font-code-num text-xs">({{ tab.count }})</span>
              </button>
            </div>

            <!-- Sort Switchers -->
            <div class="flex items-center gap-space-sm shrink-0 self-end md:self-auto">
              <div class="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm border border-surface-container-highest/50">
                <span class="material-symbols-outlined text-outline text-lg">swap_vert</span>
                <label class="sr-only" for="sortSelect">Trier le catalogue</label>
                <select
                  id="sortSelect"
                  v-model="sortBy"
                  class="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer"
                >
                  <option value="pop">Trier : Pertinence Institutionnelle</option>
                  <option value="price-asc">Prix BIF : Moins cher en premier</option>
                  <option value="price-desc">Prix BIF : Équipements Haute Performance</option>
                  <option value="stock">Disponibilité Immédiate (Bujumbura)</option>
                </select>
              </div>

              <router-link
                to="/demandez-un-devis"
                class="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-all"
              >
                <span class="material-symbols-outlined text-base">receipt_long</span>
                <span>
                  Lot Devis : <strong class="font-code-num">{{ quoteCount }}</strong> art.
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Body: Responsive Sidebar + 3-Column Catalog Grid -->
      <section class="w-full max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter py-space-xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          <!-- Sticky Sidebar Filters (3 Cols) -->
          <aside class="lg:col-span-3 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-highest/50 space-y-space-lg lg:sticky lg:top-28">
            <div class="flex items-center justify-between pb-space-sm border-b border-surface-container-highest/40">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-xl">tune</span>
                <h2 class="font-title-md text-title-md text-on-surface font-bold">Filtres Techniques</h2>
              </div>
              <button
                type="button"
                class="font-label-sm text-label-sm text-primary hover:underline"
                @click="resetAllFilters"
              >
                Réinitialiser
              </button>
            </div>

            <!-- 1. Stock Status -->
            <div class="space-y-space-sm">
              <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider block font-bold">
                Disponibilité Territoire
              </span>
              <div class="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <label class="flex items-center gap-3 cursor-pointer select-none group">
                  <input
                    v-model="filterStockBujumbura"
                    class="w-4 h-4 rounded bg-surface-container text-primary focus:ring-0"
                    type="checkbox"
                  />
                  <span class="group-hover:text-on-surface text-xs">En stock immédiat (Bujumbura)</span>
                  <span class="ml-auto font-code-num text-xs bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface">
                    {{ hubCounts.bujumbura }}
                  </span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer select-none group">
                  <input
                    v-model="filterStockHubs"
                    class="w-4 h-4 rounded bg-surface-container text-primary focus:ring-0"
                    type="checkbox"
                  />
                  <span class="group-hover:text-on-surface text-xs">Hub Gitega &amp; Ngozi</span>
                  <span class="ml-auto font-code-num text-xs bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface">
                    {{ hubCounts.gitega }}
                  </span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer select-none group">
                  <input
                    v-model="filterStockExpress"
                    class="w-4 h-4 rounded bg-surface-container text-primary focus:ring-0"
                    type="checkbox"
                  />
                  <span class="group-hover:text-on-surface text-xs">Sur commande express (48h)</span>
                  <span class="ml-auto font-code-num text-xs bg-surface-container-low px-1.5 py-0.5 rounded text-on-surface">
                    {{ hubCounts.express }}
                  </span>
                </label>
              </div>
            </div>

            <!-- 2. Price Range BIF -->
            <div class="space-y-space-sm pt-space-xs">
              <div class="flex items-center justify-between">
                <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider font-bold">
                  Budget Unitaire (BIF)
                </span>
                <span class="font-code-num text-xs text-primary font-semibold">TTC</span>
              </div>
              <div class="space-y-2">
                <input
                  v-model.number="maxPrice"
                  class="w-full accent-primary cursor-pointer h-1.5 bg-surface-container rounded-lg"
                  max="35000000"
                  min="500000"
                  step="500000"
                  type="range"
                />
                <div class="flex items-center justify-between font-code-num text-xs text-on-surface-variant">
                  <span>500 000 BIF</span>
                  <span class="font-bold text-primary">
                    {{ maxPrice >= 35000000 ? '35 000 000+ BIF' : formatBIF(maxPrice) + ' BIF' }}
                  </span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 pt-1 font-label-sm text-label-sm">
                <button
                  type="button"
                  class="p-1.5 text-center bg-surface-container-low hover:bg-surface-container rounded text-on-surface-variant transition-colors"
                  @click="maxPrice = 2500000"
                >
                  &lt; 2,5M BIF
                </button>
                <button
                  type="button"
                  class="p-1.5 text-center bg-surface-container-low hover:bg-surface-container rounded text-on-surface-variant transition-colors"
                  @click="maxPrice = 6000000"
                >
                  &le; 6M BIF
                </button>
              </div>
            </div>

            <!-- 3. Hardware Architecture & CPU -->
            <div class="space-y-space-sm pt-space-xs">
              <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider block font-bold">
                Configuration Processeur
              </span>
              <div class="grid grid-cols-2 gap-2 font-body-sm text-xs">
                <label class="flex items-center gap-2 p-2 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <input v-model="selectedCpus" value="i5" class="w-3.5 h-3.5 rounded text-primary focus:ring-0" type="checkbox" />
                  <span>Intel Core i5</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <input v-model="selectedCpus" value="i7" class="w-3.5 h-3.5 rounded text-primary focus:ring-0" type="checkbox" />
                  <span>Intel Core i7</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <input v-model="selectedCpus" value="ryzen7" class="w-3.5 h-3.5 rounded text-primary focus:ring-0" type="checkbox" />
                  <span>Ryzen 7 Pro</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                  <input v-model="selectedCpus" value="xeon" class="w-3.5 h-3.5 rounded text-primary focus:ring-0" type="checkbox" />
                  <span>Xeon / Server</span>
                </label>
              </div>
            </div>

            <!-- 4. Memory spec pills -->
            <div class="space-y-space-sm pt-space-xs">
              <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider block font-bold">
                Mémoire RAM
              </span>
              <div class="flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                <button
                  v-for="ram in ['8GB', '16GB', '32GB', '64GB']"
                  :key="ram"
                  type="button"
                  :class="[
                    'px-2.5 py-1 rounded transition-colors',
                    selectedRam === ram
                      ? 'bg-primary text-on-primary font-bold'
                      : 'bg-surface-container text-primary font-semibold hover:bg-primary/10'
                  ]"
                  @click="toggleRamFilter(ram)"
                >
                  {{ ram === '16GB' ? '16 GB DDR5' : ram === '64GB' ? '64 GB ECC' : ram }}
                </button>
              </div>
            </div>

            <!-- 5. Warranty & Support Assurance -->
            <div class="space-y-space-sm pt-space-xs">
              <span class="font-label-md text-label-md text-on-surface uppercase tracking-wider block font-bold">
                Garantie &amp; Support Régional
              </span>
              <div class="space-y-2 font-body-sm text-xs text-on-surface-variant">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="filterWarranty12" class="w-4 h-4 rounded bg-surface-container text-primary" type="checkbox" />
                  <span>Garantie Matérielle 12+ Mois</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="filterWarranty24" class="w-4 h-4 rounded bg-surface-container text-primary" type="checkbox" />
                  <span>Garantie Pro 24-36 Mois Constructeur</span>
                </label>
              </div>
            </div>

            <!-- Fast Help Card inside sidebar -->
            <div class="p-space-md rounded-xl bg-surface-container text-on-surface space-y-space-xs">
              <div class="flex items-center gap-2 text-primary font-title-md text-title-md font-bold">
                <span class="material-symbols-outlined text-xl">support_agent</span>
                <span>Conseiller Dédié</span>
              </div>
              <p class="font-body-sm text-xs text-on-surface-variant">
                Besoin d'un devis formel pour une organisation ou un projet sous 4 heures ?
              </p>
              <a
                class="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary font-bold hover:underline pt-1"
                href="https://wa.me/25767405262?text=Bonjour,%20je%20souhaite%20un%20devis%20institutionnel"
                rel="noopener"
                target="_blank"
              >
                <span>Contacter notre équipe Pro</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </aside>

          <!-- Products Grid Stream (9 Cols, 3 Columns Desktop) -->
          <div class="lg:col-span-9 flex flex-col gap-space-lg">
            <!-- Live Result Metadata Banner -->
            <div class="bg-surface-container-lowest rounded-xl px-space-md py-space-sm shadow-sm border border-surface-container-highest/50 flex flex-wrap items-center justify-between gap-space-sm">
              <div class="flex items-center gap-space-xs font-label-md text-label-md">
                <span class="text-on-surface font-semibold">
                  Affichage de {{ filteredProducts.length }} matériel{{ filteredProducts.length > 1 ? 's' : '' }} professionnel{{ filteredProducts.length > 1 ? 's' : '' }}
                </span>
                <span class="text-on-surface-variant hidden sm:inline">
                  • Disponibilité immédiate garantie sur facture proforma
                </span>
              </div>
              <div class="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                <span>Tarifs certifiés conformes OBR</span>
              </div>
            </div>

            <!-- Empty state when filters match 0 items -->
            <div
              v-if="filteredProducts.length === 0"
              class="bg-surface-container-lowest rounded-2xl p-space-xl text-center border border-surface-container-highest/50 space-y-space-sm"
            >
              <span class="material-symbols-outlined text-4xl text-primary">search_off</span>
              <h3 class="font-title-md text-title-md text-on-surface font-bold">
                Aucun équipement ne correspond à ces critères
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto">
                Réinitialisez les filtres techniques ou contactez-nous pour une cotation sur mesure.
              </p>
              <button
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold"
                @click="resetAllFilters"
              >
                <span class="material-symbols-outlined text-sm">restart_alt</span>
                <span>Réinitialiser tous les filtres</span>
              </button>
            </div>

            <!-- 3-Column Bento Grid of Products -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-md">
              <article
                v-for="product in filteredProducts"
                :key="product.id"
                class="group bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md border border-surface-container-highest/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <!-- Visual & Top Badges -->
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

                  <!-- Product Details -->
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

                  <!-- Specs Pills Table -->
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

                <!-- Price & Procurement CTAs -->
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

            <!-- Pagination & Bulk Download Strip -->
            <div class="p-space-md bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-highest/50 flex flex-col sm:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm">
              <div class="flex items-center gap-2">
                <span class="text-on-surface-variant">Catalogue Actif :</span>
                <span class="px-2.5 py-1 rounded bg-primary text-on-primary font-bold">
                  {{ filteredProducts.length }} / {{ products.length }} références affichées
                </span>
              </div>
              <div class="flex items-center gap-space-md">
                <a
                  class="text-primary font-semibold hover:underline flex items-center gap-1"
                  href="https://wa.me/25767405262?text=Bonjour,%20merci%20de%20m'envoyer%20le%20catalogue%20PDF%20complet%20EPI%20Electronics"
                  rel="noopener"
                  target="_blank"
                >
                  <span class="material-symbols-outlined text-base">picture_as_pdf</span>
                  <span>Télécharger le Catalogue PDF Tarifaire (Édition 2025)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fleet Procurement Banner -->
      <section class="w-full bg-primary text-on-primary py-space-xl px-gutter-mobile md:px-gutter mt-space-lg">
        <div class="max-w-[1440px] mx-auto rounded-2xl bg-primary-container/40 p-space-lg lg:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div class="space-y-space-sm max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-on-primary/10 text-on-primary font-label-sm text-label-sm">
              <span class="material-symbols-outlined text-sm">corporate_fare</span>
              <span>Approvisionnement Grands Comptes &amp; Appels d'Offres</span>
            </div>
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold leading-tight text-white">
              Besoin d'équiper un parc complet ou de répondre à un cahier des charges ?
            </h2>
            <p class="font-body-lg text-body-lg text-primary-fixed opacity-90">
              EPI Electronics fournit aux institutions publiques, banques burundaises, ambassades et ONG internationales des cotations personnalisées avec clauses de maintenance, livraison multi-sites et garanties de continuité.
            </p>
            <div class="flex flex-wrap gap-space-md pt-space-xs font-label-md text-label-md">
              <div class="flex items-center gap-2 text-on-primary">
                <span class="material-symbols-outlined text-green-400">check_circle</span>
                <span>Facturation OBR conforme avec NIF &amp; RC</span>
              </div>
              <div class="flex items-center gap-2 text-on-primary">
                <span class="material-symbols-outlined text-green-400">check_circle</span>
                <span>Disponibilité pièces détachées d'origine</span>
              </div>
              <div class="flex items-center gap-2 text-on-primary">
                <span class="material-symbols-outlined text-green-400">check_circle</span>
                <span>Stock tampon réservé pour flottes sous contrat</span>
              </div>
            </div>
          </div>

          <!-- Action Panel: Quick Upload / Fast RFQ -->
          <div class="w-full lg:max-w-md bg-surface-container-lowest rounded-xl p-space-lg text-on-surface shadow-xl space-y-space-md">
            <div class="space-y-1">
              <h3 class="font-title-md text-title-md text-primary font-bold">
                Déposer un Appel d'Offres / Devis Flotte
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Recevez un devis certifié sous 4 heures ouvrées.
              </p>
            </div>
            <form class="space-y-3 font-body-sm text-body-sm" @submit.prevent="handleRfqSubmit">
              <div>
                <label class="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                  Nom de l'Organisation / Entreprise *
                </label>
                <input
                  v-model="rfqOrg"
                  class="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-body-sm"
                  placeholder="ex: Banque Commerciale du Burundi, ONG..."
                  required
                  type="text"
                />
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <label class="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                    Téléphone WhatsApp *
                  </label>
                  <input
                    v-model="rfqPhone"
                    class="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-body-sm"
                    placeholder="+257 67..."
                    required
                    type="tel"
                  />
                </div>
                <div>
                  <label class="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                    Ville de Livraison
                  </label>
                  <select
                    v-model="rfqCity"
                    class="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-body-sm"
                  >
                    <option>Bujumbura</option>
                    <option>Gitega</option>
                    <option>Ngozi</option>
                    <option>Autre province</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">
                  Nombre estimé d'unités / Spécifications
                </label>
                <textarea
                  v-model="rfqDetails"
                  class="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-body-sm text-body-sm"
                  placeholder="ex: 15 Laptops Core i7, 3 Imprimantes EcoTank, 2 Onduleurs 2200VA..."
                  rows="2"
                ></textarea>
              </div>
              <button
                class="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold transition-all shadow-md flex items-center justify-center gap-2"
                type="submit"
              >
                <span class="material-symbols-outlined text-lg">send</span>
                <span>Transmettre le Cahier des Charges</span>
              </button>
              <p v-if="rfqSubmitted" class="text-center text-xs text-[#15803d] font-semibold">
                Demande transmise au pôle Grands Comptes.
              </p>
              <span class="block text-center font-code-num text-[11px] text-on-surface-variant">
                Confidentialité garantie • Réponse commerciale immédiate
              </span>
            </form>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
