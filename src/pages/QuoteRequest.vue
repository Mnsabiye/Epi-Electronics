<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  quoteBatch,
  removeFromQuoteBatch,
  clearQuoteBatch,
  getProductBySlug,
  addToQuoteBatch,
  formatBIF
} from '../data/products.js'

const route = useRoute()

const currentStep = ref(1)
const besoinType = ref('Équipement Matériel Hardware')

// Standard configurator equipment lines (matching Stitch Step 2)
const equipmentLines = ref([
  {
    id: 'laptops',
    title: 'Laptops Professionnels (HP ProBook / Dell Latitude)',
    subtitle: 'Core i5/i7, 16 Go RAM, 512 Go SSD NVMe, Windows 11 Pro',
    shortLabel: 'Laptops Pro HP/Dell',
    unitPrice: 2800000,
    checked: true,
    qty: 5,
    max: 100
  },
  {
    id: 'desktops',
    title: 'Ordinateurs Fixes & Écrans 24" FHD',
    subtitle: 'HP EliteDesk / Dell OptiPlex • Écran IPS Antireflet, Clavier/Souris',
    shortLabel: 'PC Fixes & Écrans 24"',
    unitPrice: 1950000,
    checked: true,
    qty: 3,
    max: 100
  },
  {
    id: 'printers',
    title: 'Imprimantes & Copieurs Multifonctions Réseau',
    subtitle: 'HP LaserJet Enterprise / Epson EcoTank • Wi-Fi, Recto-Verso auto',
    shortLabel: 'Imprimantes Pro Réseau',
    unitPrice: 1650000,
    checked: true,
    qty: 2,
    max: 50
  },
  {
    id: 'ups',
    title: 'Onduleurs Haute Protection (APC Smart-UPS)',
    subtitle: 'Régulation automatique AVR contre coupures et variations de tension',
    shortLabel: 'Onduleurs APC Régulés',
    unitPrice: 400000,
    checked: true,
    qty: 4,
    max: 50
  },
  {
    id: 'networking',
    title: 'Switchs Manageables & Routeurs Cisco / MikroTik',
    subtitle: '24/48 Ports Gigabit PoE, Bornes Wi-Fi 6 d’entreprise',
    shortLabel: 'Switchs / Routeurs Pro',
    unitPrice: 1200000,
    checked: false,
    qty: 1,
    max: 20
  },
  {
    id: 'servers',
    title: 'Serveurs d\'Entreprise Tour / Rack (HPE ProLiant / Dell PowerEdge)',
    subtitle: 'Intel Xeon Silver, 32-64GB ECC, Contrôleur RAID matériel redondant',
    shortLabel: 'Serveurs d\'Entreprise',
    unitPrice: 19800000,
    checked: false,
    qty: 1,
    max: 20
  }
])

// Step 3: Deployment
const tailleParc = ref('1 à 5 postes')
const delai = ref('Immédiat (Stock Bujumbura)')
const ville = ref('Bujumbura Mairie')

// Step 4: Organization
const clientSociete = ref('Banque Commerciale du Burundi')
const clientNif = ref('4000129481/OBR')
const clientNom = ref('Aimé Hakizimana')
const clientEmail = ref('direction.it@societe.bi')
const clientPhone = ref('67 40 52 62')
const clientNotes = ref('')

// Toast state
const showToast = ref(false)

onMounted(() => {
  if (route.query.product) {
    const prod = getProductBySlug(String(route.query.product))
    if (prod) {
      addToQuoteBatch(prod, 1)
    }
  }
})

function goToStep(step) {
  currentStep.value = step
}

function adjustLineQty(line, delta) {
  if (!line.checked) line.checked = true
  const next = (line.qty || 1) + delta
  if (next >= 1 && next <= line.max) {
    line.qty = next
  }
}

function adjustBatchItemQty(item, delta) {
  const next = (item.qty || 1) + delta
  if (next <= 0) {
    removeFromQuoteBatch(item.slug)
  } else {
    item.qty = next
  }
}

const activeLines = computed(() => {
  const standard = equipmentLines.value
    .filter((l) => l.checked && l.qty > 0)
    .map((l) => ({
      key: `std-${l.id}`,
      label: `${l.qty}x ${l.shortLabel}`,
      subtotal: l.qty * l.unitPrice
    }))

  const batch = quoteBatch.value.map((b) => ({
    key: `batch-${b.slug}`,
    label: `${b.qty}x ${b.name}`,
    subtotal: b.qty * b.price
  }))

  return [...batch, ...standard]
})

const totalAmount = computed(() =>
  activeLines.value.reduce((acc, item) => acc + item.subtotal, 0)
)

const whatsappHref = computed(() => {
  const linesStr =
    activeLines.value.length > 0
      ? activeLines.value
          .map((i) => `- ${i.label} (${formatBIF(i.subtotal)} BIF)`)
          .join('\n')
      : '- À définir avec un ingénieur commercial'

  const msg = `Bonjour EPI Electronics Burundi ! Je souhaite un devis officiel :\n*Société:* ${clientSociete.value} (${clientNif.value})\n*Contact:* ${clientNom.value}\n*Besoin:* ${besoinType.value}\n*Parc:* ${tailleParc.value}\n*Délai:* ${delai.value}\n*Lieu:* ${ville.value}\n*Articles:*\n${linesStr}\n*Total Estimé:* ${formatBIF(totalAmount.value)} BIF HTVA${clientNotes.value ? '\n*Notes:* ' + clientNotes.value : ''}`

  return `https://wa.me/25767405262?text=${encodeURIComponent(msg)}`
})

function submitEmailProforma() {
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 5000)
}
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div class="flex flex-col w-full">
      <section class="relative w-full bg-surface py-space-xl border-t border-surface-container-highest/60">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter relative z-10">
          <!-- Header Row -->
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-lg">
            <div class="max-w-3xl">
              <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-extrabold tracking-tight">
                Configurateur de Devis Express
              </h1>
              <p class="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
                Évaluez vos besoins en matériel, réseaux et maintenance. Obtenez une estimation immédiate en Francs Burundais et transmettez votre demande directement à nos conseillers techniques à Bujumbura.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-space-sm shrink-0">
              <div class="bg-surface-container-lowest px-4 py-3 rounded-xl border border-surface-container-highest/60 shadow-sm flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-xl">speed</span>
                <div>
                  <div class="font-title-md text-title-md text-on-surface font-bold">&lt; 2 Heures</div>
                  <div class="font-label-sm text-label-sm text-on-surface-variant">Délai de chiffrage proforma</div>
                </div>
              </div>
              <div class="bg-surface-container-lowest px-4 py-3 rounded-xl border border-surface-container-highest/60 shadow-sm flex items-center gap-3">
                <span class="material-symbols-outlined text-emerald-600 text-xl">verified_user</span>
                <div>
                  <div class="font-title-md text-title-md text-on-surface font-bold">Facture Normalisée</div>
                  <div class="font-label-sm text-label-sm text-on-surface-variant">TVA 18% &amp; NIF certifié</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main 12-Col Grid: 8-Col Configurator + 4-Col Live Sticky Summary -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <!-- Left 8 Cols -->
            <div class="lg:col-span-8 flex flex-col gap-space-md">
              <!-- Step Tabs & Progress Bar -->
              <div class="bg-surface-container-lowest rounded-xl p-space-sm border border-surface-container-highest/60 shadow-sm">
                <div class="grid grid-cols-4 gap-2 font-label-md text-label-md">
                  <button
                    v-for="(stepLabel, idx) in ['Type de besoin', 'Équipements', 'Déploiement', 'Organisation']"
                    :key="idx"
                    type="button"
                    :class="[
                      'flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg transition-all text-xs',
                      currentStep === idx + 1
                        ? 'bg-primary text-on-primary font-bold'
                        : currentStep > idx + 1
                        ? 'text-primary hover:bg-surface-container-low font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    ]"
                    @click="goToStep(idx + 1)"
                  >
                    <span
                      :class="[
                        'w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-code-num',
                        currentStep === idx + 1
                          ? 'bg-white/20 text-white'
                          : currentStep > idx + 1
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-surface-container text-on-surface'
                      ]"
                    >
                      {{ idx + 1 }}
                    </span>
                    <span class="hidden sm:inline">{{ stepLabel }}</span>
                  </button>
                </div>
                <div class="w-full bg-surface-container h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    class="bg-primary h-full transition-all duration-300"
                    :style="{ width: `${currentStep * 25}%` }"
                  ></div>
                </div>
              </div>

              <!-- Step Panels -->
              <form class="flex flex-col gap-space-md" @submit.prevent>
                <!-- STEP 1 -->
                <div
                  v-show="currentStep === 1"
                  class="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-highest/60 shadow-sm flex flex-col"
                >
                  <div class="mb-space-md">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Étape 01
                    </span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                      Sélectionnez la catégorie de votre projet
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Aiguillez immédiatement votre demande vers l'équipe d'ingénierie adéquate.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
                    <label
                      v-for="option in [
                        {
                          value: 'Équipement Matériel Hardware',
                          icon: 'laptop_mac',
                          title: 'Équipement Matériel Hardware',
                          desc: 'Laptops professionnels, stations bureautiques, serveurs tour/rack, imprimantes et scanners réseau.',
                          badge: 'En stock à Bujumbura (Rohero)',
                          dotColor: 'bg-emerald-500'
                        },
                        {
                          value: 'Maintenance & Support IT',
                          icon: 'build_circle',
                          title: 'Infogérance & Maintenance',
                          desc: 'Contrats d’assistance continue, maintenance préventive, SAV express certifié et pièces de rechange.',
                          badge: 'Forfaits mensuels ou annuels',
                          dotColor: 'bg-primary'
                        },
                        {
                          value: 'Réseau & Infrastructure',
                          icon: 'router',
                          title: 'Réseaux, Fibre & Sécurité',
                          desc: 'Câblage structuré cat6a/fibre optique, armoires brassage, switchs manageables, VPN et pare-feux.',
                          badge: 'Audit sur site gratuit',
                          dotColor: 'bg-primary'
                        },
                        {
                          value: 'Commande Mixte / Appel d\'Offres',
                          icon: 'description',
                          title: 'Grands Projets & Marchés',
                          desc: 'Dossiers complets de conformité technique et administrative pour ONG, institutions et entreprises.',
                          badge: 'Dossier administratif OBR & RC',
                          dotColor: 'bg-primary'
                        }
                      ]"
                      :key="option.value"
                      class="cursor-pointer group"
                    >
                      <input
                        v-model="besoinType"
                        :value="option.value"
                        class="peer sr-only"
                        name="besoin_type"
                        type="radio"
                      />
                      <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 peer-checked:border-primary peer-checked:bg-primary/5 transition-all h-full flex flex-col justify-between shadow-sm">
                        <div>
                          <div class="flex items-center justify-between mb-3">
                            <span class="p-2 rounded-lg bg-surface-container-low text-primary">
                              <span class="material-symbols-outlined text-xl">{{ option.icon }}</span>
                            </span>
                            <span
                              :class="[
                                'w-5 h-5 rounded-full border flex items-center justify-center',
                                besoinType === option.value
                                  ? 'bg-primary border-primary'
                                  : 'border-surface-container-highest'
                              ]"
                            >
                              <span
                                v-if="besoinType === option.value"
                                class="material-symbols-outlined text-white text-xs"
                              >
                                check
                              </span>
                            </span>
                          </div>
                          <div class="font-title-md text-title-md text-on-surface font-bold">
                            {{ option.title }}
                          </div>
                          <p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
                            {{ option.desc }}
                          </p>
                        </div>
                        <div class="mt-4 pt-2 border-t border-surface-container-highest/60 font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1.5">
                          <span>{{ option.badge }}</span>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div class="flex justify-end pt-space-xs">
                    <button
                      class="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-md text-label-md transition-all shadow-sm"
                      type="button"
                      @click="goToStep(2)"
                    >
                      <span>Continuer vers les équipements</span>
                      <span class="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <!-- STEP 2 -->
                <div
                  v-show="currentStep === 2"
                  class="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-highest/60 shadow-sm flex flex-col"
                >
                  <div class="mb-space-md">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Étape 02
                    </span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                      Équipements et volumes indicatifs
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Ajustez les quantités pour actualiser instantanément l'estimation BIF.
                    </p>
                  </div>

                  <!-- Products added from Catalogue (if any) -->
                  <div v-if="quoteBatch.length > 0" class="mb-space-md p-space-md rounded-xl bg-surface-container-low border border-primary/20 space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="font-label-md text-xs text-primary font-bold uppercase tracking-wider">
                        Références ajoutées depuis le Catalogue ({{ quoteBatch.length }})
                      </span>
                      <button
                        type="button"
                        class="text-xs text-error hover:underline font-medium"
                        @click="clearQuoteBatch"
                      >
                        Vider la sélection
                      </button>
                    </div>
                    <div
                      v-for="item in quoteBatch"
                      :key="item.slug"
                      class="p-3 rounded-lg bg-surface-container-lowest flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-surface-container-highest/50"
                    >
                      <div>
                        <div class="font-title-md text-sm text-on-surface font-bold">{{ item.name }}</div>
                        <div class="font-code-num text-xs text-primary font-semibold">
                          REF: {{ item.ref }} • {{ formatBIF(item.price) }} BIF / unité
                        </div>
                      </div>
                      <div class="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          class="w-7 h-7 rounded-md bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container font-bold"
                          @click="adjustBatchItemQty(item, -1)"
                        >
                          -
                        </button>
                        <span class="w-8 text-center font-code-num text-xs font-bold">{{ item.qty }}</span>
                        <button
                          type="button"
                          class="w-7 h-7 rounded-md bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container font-bold"
                          @click="adjustBatchItemQty(item, 1)"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Standard Configurator Lines -->
                  <div class="flex flex-col gap-space-xs mb-space-lg">
                    <div
                      v-for="line in equipmentLines"
                      :key="line.id"
                      class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 transition-all"
                    >
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                        <label class="flex items-start gap-space-sm cursor-pointer select-none">
                          <input
                            v-model="line.checked"
                            class="w-4 h-4 mt-1 rounded text-primary focus:ring-primary"
                            type="checkbox"
                          />
                          <div>
                            <div class="font-title-md text-title-md text-on-surface font-semibold">
                              {{ line.title }}
                            </div>
                            <div class="font-body-sm text-body-sm text-on-surface-variant">
                              {{ line.subtitle }}
                            </div>
                          </div>
                        </label>
                        <div
                          :class="[
                            'flex items-center gap-2 self-end sm:self-center transition-opacity',
                            line.checked ? 'opacity-100' : 'opacity-40'
                          ]"
                        >
                          <button
                            class="w-7 h-7 rounded-md bg-surface-container-low border border-surface-container-highest/60 flex items-center justify-center text-on-surface hover:bg-surface-container font-bold"
                            type="button"
                            @click="adjustLineQty(line, -1)"
                          >
                            -
                          </button>
                          <input
                            v-model.number="line.qty"
                            :disabled="!line.checked"
                            :max="line.max"
                            min="1"
                            class="w-12 text-center font-code-num text-body-sm py-1 rounded-md bg-surface-container-lowest border border-surface-container-highest/60 focus:outline-none"
                            type="number"
                          />
                          <button
                            class="w-7 h-7 rounded-md bg-surface-container-low border border-surface-container-highest/60 flex items-center justify-center text-on-surface hover:bg-surface-container font-bold"
                            type="button"
                            @click="adjustLineQty(line, 1)"
                          >
                            +
                          </button>
                          <span class="font-label-sm text-label-sm text-on-surface-variant pl-1 text-xs">
                            unités
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-space-xs">
                    <button
                      class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md py-2 px-space-sm rounded-lg hover:bg-surface-container-low transition-colors"
                      type="button"
                      @click="goToStep(1)"
                    >
                      <span class="material-symbols-outlined text-base">arrow_back</span>
                      <span>Retour</span>
                    </button>
                    <button
                      class="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-md text-label-md transition-all shadow-sm"
                      type="button"
                      @click="goToStep(3)"
                    >
                      <span>Déploiement &amp; Localisation</span>
                      <span class="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <!-- STEP 3 -->
                <div
                  v-show="currentStep === 3"
                  class="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-highest/60 shadow-sm flex flex-col"
                >
                  <div class="mb-space-md">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Étape 03
                    </span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                      Conditions de livraison et planning
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Précisez les délais souhaités et le lieu de remise du matériel.
                    </p>
                  </div>

                  <div class="space-y-space-md mb-space-lg">
                    <div>
                      <label class="block font-title-md text-title-md text-on-surface mb-2 font-semibold text-sm">
                        Taille du parc ou postes cibles
                      </label>
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <label
                          v-for="pOpt in [
                            { val: '1 à 5 postes', label: '1 - 5 postes' },
                            { val: '6 à 20 postes', label: '6 - 20 postes' },
                            { val: '21 à 50 postes', label: '21 - 50 postes' },
                            { val: '50+ postes (Grand Compte)', label: '50+ (Institutionnel)' }
                          ]"
                          :key="pOpt.val"
                          class="cursor-pointer"
                        >
                          <input v-model="tailleParc" :value="pOpt.val" class="peer sr-only" type="radio" />
                          <div class="p-3 text-center rounded-lg bg-surface-container-low border border-surface-container-highest/60 peer-checked:bg-primary peer-checked:text-on-primary font-label-md text-label-md transition-all text-xs">
                            {{ pOpt.label }}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label class="block font-title-md text-title-md text-on-surface mb-2 font-semibold text-sm">
                        Délai d'approvisionnement
                      </label>
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label
                          v-for="dOpt in [
                            {
                              val: 'Immédiat (Stock Bujumbura)',
                              title: 'Immédiat (Stock)',
                              desc: 'Retrait direct Rohero ou livraison sous 24-48h.'
                            },
                            {
                              val: 'Sous 15 jours ouvrés',
                              title: 'Sous 15 jours',
                              desc: 'Approvisionnement régulier avec tarif préférentiel.'
                            },
                            {
                              val: 'Appel d\'offres / 30j+',
                              title: 'Projet planifié',
                              desc: 'Proforma officielle valable 60 jours calendrier.'
                            }
                          ]"
                          :key="dOpt.val"
                          class="cursor-pointer"
                        >
                          <input v-model="delai" :value="dOpt.val" class="peer sr-only" type="radio" />
                          <div class="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/60 peer-checked:bg-primary/5 peer-checked:border-primary transition-all h-full">
                            <div class="flex items-center gap-2 mb-1">
                              <span class="font-title-md text-title-md text-on-surface font-semibold text-sm">
                                {{ dOpt.title }}
                              </span>
                            </div>
                            <p class="font-body-sm text-body-sm text-on-surface-variant text-xs">
                              {{ dOpt.desc }}
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label class="block font-title-md text-title-md text-on-surface mb-2 font-semibold text-sm">
                        Destination
                      </label>
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <label
                          v-for="vOpt in [
                            { val: 'Bujumbura Mairie', title: 'Bujumbura', sub: 'Livraison directe' },
                            { val: 'Gitega (Capitale)', title: 'Gitega', sub: 'Agence EPI' },
                            { val: 'Ngozi', title: 'Ngozi', sub: 'Agence EPI' },
                            { val: 'Autre Province Burundi', title: 'Autre Province', sub: 'Expédition sécurisée' }
                          ]"
                          :key="vOpt.val"
                          class="cursor-pointer"
                        >
                          <input v-model="ville" :value="vOpt.val" class="peer sr-only" type="radio" />
                          <div class="p-3 rounded-lg bg-surface-container-low border border-surface-container-highest/60 peer-checked:bg-primary peer-checked:text-on-primary transition-all text-center">
                            <div class="font-title-md font-semibold text-xs">{{ vOpt.title }}</div>
                            <div class="font-label-sm opacity-80 text-[11px]">{{ vOpt.sub }}</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-space-xs">
                    <button
                      class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md py-2 px-space-sm rounded-lg hover:bg-surface-container-low transition-colors"
                      type="button"
                      @click="goToStep(2)"
                    >
                      <span class="material-symbols-outlined text-base">arrow_back</span>
                      <span>Retour</span>
                    </button>
                    <button
                      class="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-space-lg py-2.5 rounded-lg font-label-md text-label-md transition-all shadow-sm"
                      type="button"
                      @click="goToStep(4)"
                    >
                      <span>Coordonnées Entreprise</span>
                      <span class="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>

                <!-- STEP 4 -->
                <div
                  v-show="currentStep === 4"
                  class="bg-surface-container-lowest rounded-xl p-space-lg border border-surface-container-highest/60 shadow-sm flex flex-col"
                >
                  <div class="mb-space-md">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                      Étape 04
                    </span>
                    <h2 class="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                      Informations de l'entité
                    </h2>
                    <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Ces éléments permettent d'établir un devis proforma conforme aux normes OBR.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md mb-space-lg">
                    <div>
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Raison Sociale / Organisation *
                      </label>
                      <input
                        v-model="clientSociete"
                        class="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                        placeholder="ex: Banque Commerciale du Burundi"
                        type="text"
                      />
                    </div>
                    <div>
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Numéro NIF / Registre de Commerce (OBR)
                      </label>
                      <input
                        v-model="clientNif"
                        class="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                        placeholder="ex: 4000129481/OBR"
                        type="text"
                      />
                    </div>
                    <div>
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Nom du Responsable ou Chargé IT *
                      </label>
                      <input
                        v-model="clientNom"
                        class="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                        placeholder="ex: M. Hakizimana Aimé"
                        type="text"
                      />
                    </div>
                    <div>
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Courriel Professionnel *
                      </label>
                      <input
                        v-model="clientEmail"
                        class="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                        placeholder="ex: direction.it@banque.bi"
                        type="email"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Numéro WhatsApp / Téléphone direct (+257) *
                      </label>
                      <div class="flex items-center">
                        <span class="inline-flex items-center px-3 py-2 rounded-l-lg bg-surface-container text-on-surface font-code-num text-body-sm font-semibold border border-surface-container-highest/60">
                          +257
                        </span>
                        <input
                          v-model="clientPhone"
                          class="w-full px-3 py-2 rounded-r-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                          placeholder="67 40 52 62"
                          type="tel"
                        />
                      </div>
                    </div>
                    <div class="md:col-span-2">
                      <label class="block font-label-md text-label-md text-on-surface mb-1 text-xs font-semibold">
                        Spécifications techniques complémentaires (Optionnel)
                      </label>
                      <textarea
                        v-model="clientNotes"
                        class="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest/60 font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
                        placeholder="Précisez ici les licences requises, options d'extension de garantie ou exigences particulières..."
                        rows="2"
                      ></textarea>
                    </div>
                  </div>

                  <div class="flex items-center justify-between pt-space-xs">
                    <button
                      class="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-label-md text-label-md py-2 px-space-sm rounded-lg hover:bg-surface-container-low transition-colors"
                      type="button"
                      @click="goToStep(3)"
                    >
                      <span class="material-symbols-outlined text-base">arrow_back</span>
                      <span>Retour</span>
                    </button>
                    <span class="font-label-sm text-label-sm text-emerald-600 flex items-center gap-1 font-semibold text-xs">
                      <span class="material-symbols-outlined text-sm">check_circle</span>
                      <span>Formulaire validé</span>
                    </span>
                  </div>
                </div>
              </form>

              <!-- On-site Engineering Banner -->
              <div class="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-space-sm shadow-sm">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-xl">engineering</span>
                  </div>
                  <div>
                    <h3 class="font-title-md text-title-md text-on-surface font-bold text-sm">
                      Assistance &amp; Déplacement sur site
                    </h3>
                    <p class="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Nos ingénieurs IT interviennent en direct dans vos locaux à Bujumbura, Gitega et Ngozi.
                    </p>
                  </div>
                </div>
                <a
                  class="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md text-xs font-semibold transition-colors"
                  href="tel:+25767405262"
                >
                  <span class="material-symbols-outlined text-sm">call</span>
                  <span>+257 67 40 52 62</span>
                </a>
              </div>
            </div>

            <!-- Right 4 Cols: Sticky Live Estimate Summary -->
            <div class="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-space-md">
              <div class="bg-surface-container-lowest rounded-xl p-space-md border border-surface-container-highest/60 shadow-sm relative overflow-hidden">
                <div class="flex items-center justify-between pb-3 border-b border-surface-container-highest/60 mb-3">
                  <div>
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold text-[11px]">
                      Récapitulatif
                    </span>
                    <h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">
                      Devis Estimatif
                    </h3>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-surface-container-low text-primary font-code-num text-xs font-bold">
                    BIF
                  </span>
                </div>

                <div class="p-3 rounded-lg bg-surface-container-low mb-3">
                  <div class="font-label-sm text-label-sm text-on-surface-variant text-xs">Entité :</div>
                  <div class="font-title-md text-title-md text-on-surface font-bold truncate">
                    {{ clientSociete || 'Organisation / Entreprise' }}
                  </div>
                  <div class="font-code-num text-xs text-on-surface-variant mt-0.5">
                    NIF: {{ clientNif || 'Non renseigné' }}
                  </div>
                </div>

                <div class="space-y-1.5 mb-3 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant">Besoin :</span>
                    <span class="font-semibold text-on-surface text-right truncate max-w-[180px]">
                      {{ besoinType }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant">Parc :</span>
                    <span class="font-semibold text-on-surface">{{ tailleParc }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant">Délai :</span>
                    <span class="font-semibold text-emerald-600">{{ delai }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-on-surface-variant">Livraison :</span>
                    <span class="font-semibold text-on-surface">{{ ville }}</span>
                  </div>
                </div>

                <div class="pt-2 border-t border-surface-container-highest/60 mb-3">
                  <div class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold mb-2 text-[11px]">
                    Lignes matérielles :
                  </div>
                  <ul v-if="activeLines.length > 0" class="space-y-1.5 font-body-sm text-body-sm text-on-surface">
                    <li
                      v-for="item in activeLines"
                      :key="item.key"
                      class="flex items-center justify-between py-1 px-2 rounded bg-surface-container-low text-xs gap-2"
                    >
                      <span class="truncate">{{ item.label }}</span>
                      <span class="font-code-num text-xs text-primary font-bold shrink-0">
                        {{ formatBIF(item.subtotal) }} BIF
                      </span>
                    </li>
                  </ul>
                  <div
                    v-else
                    class="py-1.5 px-2.5 rounded bg-surface-container-low text-on-surface-variant italic text-xs"
                  >
                    Cotation personnalisée sur mesure
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container-highest/60 mb-3">
                  <div class="flex justify-between items-baseline mb-1">
                    <span class="font-label-sm text-label-sm text-on-surface-variant text-xs">
                      Montant Estimatif
                    </span>
                    <span class="font-label-sm text-label-sm bg-surface-container px-1.5 py-0.5 rounded font-code-num text-xs text-on-surface">
                      HTVA
                    </span>
                  </div>
                  <div class="flex items-baseline justify-between gap-2">
                    <span class="font-headline-md text-headline-md font-bold tracking-tight font-code-num text-primary">
                      {{ totalAmount > 0 ? formatBIF(totalAmount) + ' BIF' : 'Sur étude' }}
                    </span>
                    <span class="text-[11px] text-on-surface-variant">+18% TVA légale</span>
                  </div>
                  <div class="font-label-sm text-label-sm text-on-surface-variant mt-1.5 flex items-center gap-1 text-[11px]">
                    <span class="material-symbols-outlined text-xs text-emerald-600">verified</span>
                    <span>Tarif BIF garanti 30 jours calendrier</span>
                  </div>
                </div>

                <div class="flex flex-col gap-2 mb-3">
                  <a
                    :href="whatsappHref"
                    class="group flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-[#25d366] hover:bg-[#20ba5a] text-white font-label-md text-label-md font-semibold transition-all shadow-sm text-xs"
                    rel="noopener"
                    target="_blank"
                  >
                    <span class="material-symbols-outlined text-base">chat</span>
                    <span>Envoyer sur WhatsApp (+257 67 40 52 62)</span>
                  </a>
                  <button
                    class="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold transition-all shadow-sm text-xs"
                    type="button"
                    @click="submitEmailProforma"
                  >
                    <span class="material-symbols-outlined text-base">picture_as_pdf</span>
                    <span>Télécharger / Recevoir Proforma (PDF)</span>
                  </button>
                </div>

                <div class="pt-2 border-t border-surface-container-highest/60 space-y-1.5 font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-emerald-600 text-sm">check</span>
                    <span>Émission de Facture Normalisée OBR certifiée</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-emerald-600 text-sm">check</span>
                    <span>Garantie constructeur &amp; SAV local à Bujumbura</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-emerald-600 text-sm">check</span>
                    <span>Bordereau de livraison &amp; PV de réception inclus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Garanties Institutionnelles -->
      <section class="w-full bg-surface-container-low py-space-xl border-t border-surface-container-highest/60">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
          <div class="text-center max-w-2xl mx-auto mb-space-lg">
            <span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider text-xs">
              Garanties Institutionnelles
            </span>
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold mt-1">
              Pourquoi confier vos achats IT à EPI Electronics ?
            </h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant mt-1.5">
              Fournisseur référencé auprès des banques, représentations diplomatiques, agences des Nations Unies et entreprises leaders au Burundi.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div class="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 flex flex-col shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-space-sm">
                <span class="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 class="font-title-md text-title-md text-on-surface font-bold mb-1">
                Conformité Fiscale OBR Rigoureuse
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Factures normalisées avec NIF actif, déclarations conformes et bordereaux d'enlèvement homologués pour vos audits comptables.
              </p>
            </div>

            <div class="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 flex flex-col shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-space-sm">
                <span class="material-symbols-outlined text-2xl">power</span>
              </div>
              <h3 class="font-title-md text-title-md text-on-surface font-bold mb-1">
                Protection Électrique &amp; Garantie Locale
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Matériel configuré avec régulation automatique AVR pour sécuriser l'alimentation électrique de vos équipements. SAV géré directement à Bujumbura.
              </p>
            </div>

            <div class="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 flex flex-col shadow-sm">
              <div class="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-space-sm">
                <span class="material-symbols-outlined text-2xl">local_shipping</span>
              </div>
              <h3 class="font-title-md text-title-md text-on-surface font-bold mb-1">
                Stocks Immédiats &amp; Réseau National
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">
                Mise à disposition en moins de 2 heures ouvrées à notre magasin de Rohero I, avec relais d'acheminement sécurisé sur Gitega et Ngozi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Toast Notification -->
      <div
        v-if="showToast"
        class="fixed bottom-6 left-6 z-50 max-w-md bg-surface-container-lowest rounded-xl shadow-2xl border border-surface-container-highest p-space-md flex items-center gap-space-sm"
      >
        <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <div class="flex-1">
          <div class="font-title-md text-title-md text-on-surface font-bold">Demande enregistrée !</div>
          <div class="font-body-sm text-body-sm text-on-surface-variant">
            La proforma officielle vous a été expédiée par courriel ({{ clientEmail }}).
          </div>
        </div>
        <button
          class="text-on-surface-variant hover:text-on-surface p-1"
          type="button"
          @click="showToast = false"
        >
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  </main>
</template>
