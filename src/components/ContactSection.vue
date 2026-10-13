<script setup>
import { ref } from 'vue'

const formName = ref('')
const formPhone = ref('')
const formCategory = ref('Laptops & Postes')
const formDetails = ref('')
const submitted = ref(false)

function submitDevis() {
  if (!formName.value.trim() || !formPhone.value.trim()) return
  submitted.value = true
  const msg = `Bonjour EPI Electronics,\n*Organisation:* ${formName.value}\n*Contact:* ${formPhone.value}\n*Catégorie:* ${formCategory.value}\n*Détails:* ${formDetails.value || 'Demande de cotation rapide'}`
  window.open(`https://wa.me/25767405262?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
}
</script>

<template>
  <!-- SECTION FORMULAIRE RAPIDE DEVIS EXPRESS -->
  <section id="devis-section" class="py-space-xl">
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
      <div class="bg-primary text-on-primary rounded-3xl p-space-lg md:p-space-xl shadow-xl">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <!-- Left Pitch Column -->
          <div class="lg:col-span-5">
            <span class="inline-block bg-primary-container text-on-primary-container font-label-sm text-xs uppercase px-3 py-1 rounded-full mb-space-sm font-semibold tracking-wider">
              Service Commercial
            </span>
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-space-sm tracking-tight text-white">
              Cotation sous 24h conforme OBR
            </h2>
            <p class="font-body-md text-primary-fixed mb-space-lg font-light text-sm">
              Nos conseillers établissent votre devis certifié avec conditions de paiement, exonération éventuelle et délais de livraison exacts.
            </p>
            <div class="space-y-2.5 text-xs text-primary-fixed">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-primary-fixed-dim">call</span>
                <span>
                  Ligne directe: <strong class="text-white">+257 67 40 52 62</strong>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-primary-fixed-dim">mail</span>
                <span>
                  Email: <strong class="text-white">commercial@epielectronics.bi</strong>
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-primary-fixed-dim">location_on</span>
                <span>Rohero I, Boulevard de l'Uprona, Bujumbura</span>
              </div>
            </div>

            <div class="mt-space-lg pt-space-md border-t border-white/15">
              <router-link
                to="/demandez-un-devis"
                class="inline-flex items-center gap-2 text-xs font-label-md text-white hover:text-primary-fixed underline underline-offset-4"
              >
                <span class="material-symbols-outlined text-base">calculate</span>
                <span>Utiliser le Configurateur Multi-Postes avec Calcul BIF en direct</span>
              </router-link>
            </div>
          </div>

          <!-- Right Form Card -->
          <div class="lg:col-span-7 bg-surface-container-lowest text-on-surface p-space-md md:p-space-lg rounded-2xl shadow-md">
            <h3 class="font-title-md text-title-md font-bold mb-1">Demande Rapide de Prix</h3>
            <p class="font-body-sm text-xs text-on-surface-variant mb-space-md">
              Réponse prompte avec bordereau des prix unitaires en BIF.
            </p>
            <form class="space-y-3" @submit.prevent="submitDevis">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-label-sm text-xs text-on-surface-variant mb-1" for="devis-name">
                    Nom &amp; Entreprise *
                  </label>
                  <input
                    id="devis-name"
                    v-model="formName"
                    class="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-highest/40"
                    placeholder="Ex: Banque, ONG, Société"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label class="block font-label-sm text-xs text-on-surface-variant mb-1" for="devis-phone">
                    Numéro de contact *
                  </label>
                  <input
                    id="devis-phone"
                    v-model="formPhone"
                    class="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-highest/40"
                    placeholder="+257 67..."
                    required
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label class="block font-label-sm text-xs text-on-surface-variant mb-1" for="devis-cat">
                  Catégorie de besoin
                </label>
                <select
                  id="devis-cat"
                  v-model="formCategory"
                  class="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-highest/40"
                >
                  <option value="Laptops & Postes">Flotte d'ordinateurs portables &amp; Postes fixes</option>
                  <option value="Impression & Toners">Imprimantes professionnelles &amp; Consommables</option>
                  <option value="Serveurs & Réseaux">Infrastructures serveurs, baies et onduleurs</option>
                  <option value="Contrat Infogérance">Contrat de maintenance annuelle IT</option>
                </select>
              </div>

              <div>
                <label class="block font-label-sm text-xs text-on-surface-variant mb-1" for="devis-details">
                  Spécifications &amp; Quantités
                </label>
                <textarea
                  id="devis-details"
                  v-model="formDetails"
                  class="w-full px-3 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-highest/40"
                  placeholder="Précisez les quantités et le lieu de livraison (Bujumbura, Gitega, Ngozi)..."
                  rows="3"
                ></textarea>
              </div>

              <button
                class="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs py-3 rounded-xl shadow-sm transition-all"
                type="submit"
              >
                <span class="material-symbols-outlined text-sm">send</span>
                <span>Transmettre la demande de devis</span>
              </button>

              <div
                v-if="submitted"
                class="text-center p-2.5 rounded-xl bg-[#dcfce7] text-[#15803d] text-xs font-medium"
              >
                Votre demande a été enregistrée. Notre service commercial vous recontacte rapidement.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
