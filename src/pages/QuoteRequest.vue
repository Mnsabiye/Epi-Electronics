<template>
  <div class="quote-page">
    <!-- Hero Section -->
    <div class="quote-hero">
      <div class="hero-background"></div>
      <div class="hero-content">
        <h1 class="text-white">Demandez un Devis Personnalisé</h1>
        <p class="text-white">Répondez à quelques questions simples pour recevoir votre offre sur mesure</p>
      </div>
    </div>

    <div class="quote-container">
      <!-- Context Info (if product selected) -->
      <!-- Context Info (if product selected) -->
      <div v-if="productName" class="context-info">
        <div class="context-label">Demande pour :</div>
        <div class="context-product">
          <i class="fas fa-box-open"></i>
          {{ productName }}
        </div>
      </div>
      
      <!-- Context Info (if service selected) -->
      <div v-if="serviceName" class="context-info service-context">
        <div class="context-label">Service :</div>
        <div class="context-product">
          <i class="fas fa-briefcase"></i>
          {{ serviceName }}
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <p class="progress-text">Étape {{ currentStep + 1 }} sur {{ totalSteps }}</p>

      <!-- Quiz Steps -->
      <div class="quiz-container">
        <!-- Step 0: Request Type Selection (if no context) -->
        <div v-if="isStep('requestType')" class="step" key="step-type">
          <h2>🤔 Que souhaitez-vous faire ?</h2>
          <div class="options-grid">
            <div 
              class="option-card centered-card" 
              @click="selectRequestType('product')"
            >
              <div class="option-title">Acheter du Matériel</div>
              <div class="option-subtitle">Ordinateurs, Imprimantes, Accessoires...</div>
            </div>
            <div 
              class="option-card centered-card" 
              @click="selectRequestType('service')"
            >
              <div class="option-title">Demander un Service</div>
              <div class="option-subtitle">Maintenance, Conseil, Audit...</div>
            </div>
          </div>
        </div>

        <!-- Step 1: Product/Device Selection (Skipped if product provided OR Service Mode) -->
        <div v-if="isStep('deviceType')" class="step" key="step-0">
          <h2>🔍 Quel type de produit recherchez-vous ?</h2>
          <div class="options-grid">
            <div 
              v-for="type in deviceTypes" 
              :key="type.value"
              class="option-card centered-card"
              :class="{ selected: formData.deviceType === type.value }"
              @click="selectOption('deviceType', type.value)"
            >
              <div class="option-title">{{ type.label }}</div>
            </div>
          </div>
        </div>

        <!-- Step 0 (Service Mode): Company Info -->
        <div v-if="isStep('companyInfo')" class="step" key="step-company">
          <h2>🏢 Informations Entreprise</h2>
          <div class="contact-form">
            <div class="form-group">
              <label>Nom de l'entreprise</label>
              <input 
                type="text" 
                v-model="formData.companyName" 
                placeholder="Ex: StartUp Tech"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Taille de l'entreprise</label>
              <div class="options-grid small-grid">
                <div 
                  v-for="size in companySizes" 
                  :key="size.value"
                  class="option-card small-card"
                  :class="{ selected: formData.companySize === size.value }"
                  @click="formData.companySize = size.value"
                >
                  <div class="option-title">{{ size.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 0.5: Specific Product Selection -->
        <div v-if="isStep('productSelect')" class="step" key="step-product">
          <h2>💻 Choisissez votre modèle</h2>
          <div class="options-list">
             <div 
              v-for="product in categoryProducts" 
              :key="product.id"
              class="option-row"
              :class="{ selected: tempSelectedProduct?.id === product.id }"
              @click="selectProduct(product)"
            >
              <div class="product-thumb">
                <img :src="product.images[0]?.src" :alt="product.name" />
              </div>
              <div class="option-content">
                <div class="option-title">{{ product.name }}</div>
                <div class="option-subtitle">{{ product.description }}</div>
              </div>
            </div>
             <!-- "Other" option -->
            <div 
              class="option-row"
              :class="{ selected: tempSelectedProduct === 'other' }"
              @click="selectProduct('other')"
            >
              <div class="product-thumb icon-thumb">🤔</div>
              <div class="option-content">
                <div class="option-title">Autre / Je ne trouve pas</div>
                <div class="option-subtitle">Je préciserai ma demande plus tard</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 1: Quantity (Product Mode) -->
        <div v-if="isStep('quantity')" class="step" key="step-qty">
          <h2>📦 Quelle quantité souhaitez-vous ?</h2>
          <div class="quantity-selector">
            <button @click="decreaseQuantity" class="qty-btn"><i class="fas fa-minus"></i></button>
            <input 
              type="number" 
              v-model.number="formData.quantity" 
              min="1"
              max="999"
              class="qty-input"
            />
            <button @click="increaseQuantity" class="qty-btn"><i class="fas fa-plus"></i></button>
          </div>
          <div class="quick-qty">
            <button 
              v-for="qty in [1, 5, 10, 20, 50]" 
              :key="qty"
              @click="formData.quantity = qty"
              class="quick-qty-btn"
              :class="{ active: formData.quantity === qty }"
            >
              {{ qty }}
            </button>
          </div>
        </div>
        
        <!-- Step 1 (Service Mode): Project Details -->
        <div v-if="isStep('projectDetails')" class="step" key="step-details">
          <h2>📝 Décrivez votre projet</h2>
          <div class="form-group">
            <label>Quels sont vos besoins spécifiques ?</label>
            <textarea 
              v-model="formData.additionalInfo" 
              placeholder="Ex: Nous avons besoin d'un audit de sécurité pour 50 postes..."
              rows="6"
              class="form-input"
            ></textarea>
          </div>
        </div>
        
        <!-- Step 2: Location & Delivery -->
        <div v-if="isStep('location')" class="step" key="step-loc">
          <h2>📍 {{ isServiceRequest ? 'Zone d\'intervention' : 'Où et comment souhaitez-vous être livré ?' }}</h2>
          
          <div class="section-label">Votre Ville</div>
          <div class="options-grid small-grid">
            <div 
              v-for="loc in locations" 
              :key="loc.value"
              class="option-card small-card"
              :class="{ selected: formData.location === loc.value }"
              @click="formData.location = loc.value"
            >
              <div class="option-icon-text">{{ loc.icon }} {{ loc.label }}</div>
            </div>
          </div>

          <div v-if="!isServiceRequest">
            <div class="section-label mt-6">Mode de Livraison</div>
            <div class="options-list">
              <div 
                v-for="delivery in deliveryOptions" 
                :key="delivery.value"
                class="option-row"
                :class="{ selected: formData.delivery === delivery.value }"
                @click="selectOption('delivery', delivery.value)"
              >
                <div class="option-icon-small">{{ delivery.icon }}</div>
                <div class="option-content">
                  <div class="option-title">
                    {{ delivery.label }}
                    <span v-if="delivery.value === 'delivery'" class="badge-opt">Conditionnel</span>
                  </div>
                  <div class="option-subtitle">{{ delivery.description }}</div>
                </div>
              </div>
            </div>
            
            <div v-if="formData.delivery === 'delivery'" class="info-note">
              <i class="fas fa-info-circle"></i>
              La livraison sur site est disponible uniquement pour les commandes de plus de <strong>5 000 000 BIF</strong>.
            </div>
          </div>
        </div>

        <!-- Step 3: Contact Info -->
        <div v-if="isStep('contact')" class="step" key="step-contact">
          <h2>📱 Vos coordonnées</h2>
          <p class="step-subtitle">Pour vous envoyer le devis sur WhatsApp</p>
          
          <div class="contact-form">
            <div class="form-group">
              <label>Nom complet</label>
              <input 
                type="text" 
                v-model="formData.name" 
                placeholder="Votre nom"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Numéro WhatsApp</label>
              <input 
                type="tel" 
                v-model="formData.phone" 
                placeholder="+257 ..."
                class="form-input"
              />
            </div>
             <div class="form-group" v-if="!isServiceRequest">
              <label>Message (Optionnel)</label>
              <textarea 
                v-model="formData.additionalInfo" 
                placeholder="Précisions sur votre demande..."
                rows="2"
                class="form-input"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="navigation-buttons">
        <button 
          v-if="currentStep > 0" 
          @click="previousStep" 
          class="nav-btn btn-secondary"
        >
          <i class="fas fa-arrow-left"></i> Retour
        </button>
        <button 
          v-if="currentStep < totalSteps - 1" 
          @click="nextStep" 
          class="nav-btn btn-primary"
          :disabled="!canProceed"
        >
          Suivant →
        </button>
        <button 
          v-if="currentStep === totalSteps - 1" 
          @click="submitQuote" 
          class="nav-btn btn-success"
          :disabled="!canSubmit"
        >
          <i class="fab fa-whatsapp"></i> Envoyer la demande
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { productCategories } from '../data/products'

const router = useRouter()
const route = useRoute()

// Context from URL or Selection
// Use refs so we can update them manually
const productName = ref('')
const productSlug = ref('')
const serviceName = ref('')
const isServiceRequest = ref(false)
const requestTypeSelected = ref(false)

onMounted(() => {
  if (route.query.type === 'service') {
    isServiceRequest.value = true
    requestTypeSelected.value = true
    serviceName.value = route.query.service || 'Service Général'
  } else {
    if (route.query.product) {
      productName.value = route.query.product
      requestTypeSelected.value = true
    }
    if (route.query.slug) productSlug.value = route.query.slug
  }
})



// Steps Logic
const initialStep = 0
const currentStep = ref(initialStep)
const tempSelectedProduct = ref(null)

const formData = ref({
  deviceType: '',
  quantity: 1,
  location: '',
  delivery: '',
  name: '',
  phone: '',
  additionalInfo: '',
  companyName: '',
  companySize: ''
})

const companySizes = [
  { value: 'small', label: '1 - 10 employés' },
  { value: 'medium', label: '10 - 50 employés' },
  { value: 'large', label: '50+ employés' }
]

const categoryMapping = {
  'laptop': 'laptops',
  'printer': 'printers',
  'accessory': 'accessories'
}

const categoryProducts = computed(() => {
  const catKey = categoryMapping[formData.value.deviceType]
  // Only show if we haven't already selected a specific product via URL
  if (!catKey || productName.value) return []
  return productCategories[catKey]?.products || []
})

const activeSteps = computed(() => {
  const steps = []
  
  // If no context and no selection made yet, show request type
  if (!requestTypeSelected.value) {
    steps.push('requestType')
  }

  if (isServiceRequest.value) {
    steps.push('companyInfo', 'projectDetails', 'location', 'contact')
  } else if (requestTypeSelected.value) {
    // Product Mode
    // If product is NOT pre-selected (via URL or previous steps), ask for Type
    if (!productName.value) {
      steps.push('deviceType')
      
      // If a type is selected and has products, add selection step
      if (categoryProducts.value.length > 0) {
        steps.push('productSelect')
      }
    }
    
    // Standard Steps
    steps.push('quantity', 'location', 'contact')
  }
  return steps
})

const totalSteps = computed(() => activeSteps.value.length)

const isStep = (name) => {
  return activeSteps.value[currentStep.value] === name
}



const deviceTypes = [
  { value: 'laptop', label: 'Ordinateurs', icon: '💻' },
  { value: 'printer', label: 'Imprimantes', icon: '🖨️' },
  { value: 'accessory', label: 'Accessoires', icon: '🎧' },
  { value: 'server', label: 'Serveurs/Réseau', icon: '🖥️' }
]

const locations = [
  { value: 'bujumbura', label: 'Bujumbura', icon: '🏙️' },
  { value: 'gitega', label: 'Gitega', icon: '🏛️' },
  { value: 'ngozi', label: 'Ngozi', icon: '🌆' },
  { value: 'other', label: 'Autre', icon: '📍' }
]

const deliveryOptions = [
  { value: 'pickup', label: 'Retrait en magasin', description: 'Gratuit - Disponible de suite', icon: '🏪' },
  { value: 'delivery', label: 'Livraison sur site', description: 'Pour commandes > 5.000.000 BIF', icon: '🚚' }
]

const progressPercentage = computed(() => {
  return ((currentStep.value + 1) / totalSteps.value) * 100
})

const canProceed = computed(() => {
  const stepName = activeSteps.value[currentStep.value]
  switch (stepName) {
    // Product Steps
    case 'deviceType': return formData.value.deviceType !== ''
    case 'productSelect': return !!tempSelectedProduct.value
    case 'quantity': return formData.value.quantity > 0
    
    // Service Steps
    case 'companyInfo': return formData.value.companyName !== '' && formData.value.companySize !== ''
    case 'projectDetails': return true // Optional or required? Let's say details are optional but recommended
    
    // Shared Steps
    case 'location': 
      if (isServiceRequest.value) return formData.value.location !== ''
      return formData.value.location !== '' && formData.value.delivery !== ''
      
    case 'contact': return formData.value.name && formData.value.phone
    default: return false
  }
})

const canSubmit = computed(() => {
  return formData.value.name && formData.value.phone
})

const selectRequestType = (type) => {
  if (type === 'service') {
    isServiceRequest.value = true
  } else {
    isServiceRequest.value = false
  }
  requestTypeSelected.value = true
  // Reset step to 0 of the new flow
  currentStep.value = 0 
}

const selectOption = (field, value) => {
  formData.value[field] = value
  // Auto-advance logic
  if (field === 'deviceType') {
    // Reset product selection if changing type
    tempSelectedProduct.value = null
    setTimeout(() => nextStep(), 300)
  } else if (field === 'delivery') {
      // no auto advance for delivery to let them read the note
  }
}

const selectProduct = (product) => {
  tempSelectedProduct.value = product
  if (product !== 'other') {
    productName.value = product.name
    productSlug.value = product.slug
  } else {
    // If "Other", we don't set product name, generic quote for category
    productName.value = '' 
    productSlug.value = ''
  }
  setTimeout(() => nextStep(), 300)
}

const increaseQuantity = () => {
  if (formData.value.quantity < 999) formData.value.quantity++
}

const decreaseQuantity = () => {
  if (formData.value.quantity > 1) formData.value.quantity--
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < totalSteps.value - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitQuote = () => {
  if (!canSubmit.value) return

  const locationLabel = locations.find(l => l.value === formData.value.location)?.label || formData.value.location
  
  let message = ''

  if (isServiceRequest.value) {
    const sizeLabel = companySizes.find(s => s.value === formData.value.companySize)?.label || formData.value.companySize
    
    message = `*NOUVELLE DEMANDE DE SERVICE*

*Client (Contact):* ${formData.value.name}
*Tél:* ${formData.value.phone}

*Entreprise:*
- *Nom:* ${formData.value.companyName}
- *Taille:* ${sizeLabel}

*Projet:*
- *Service:* ${serviceName.value}
- *Lieu:* ${locationLabel}

*Détails:* 
${formData.value.additionalInfo || 'N/A'}`

  } else {
    // Product Mode
    const productLabel = productName.value || deviceTypes.find(d => d.value === formData.value.deviceType)?.label || formData.value.deviceType
    const deliveryLabel = deliveryOptions.find(d => d.value === formData.value.delivery)?.label || formData.value.delivery
    const productLink = productSlug.value ? `\n🔗 *Lien:* https://epi-electronics.com/produit/${productSlug.value}` : ''
    
    message = `*NOUVELLE DEMANDE DE DEVIS*

*Client:* ${formData.value.name}
*Tél:* ${formData.value.phone}

*Détails de la demande:*
- *Produit:* ${productLabel}${productLink}
- *Quantité:* ${formData.value.quantity}
- *Lieu:* ${locationLabel}
- *Livraison:* ${deliveryLabel}

*Message:* ${formData.value.additionalInfo || 'N/A'}

Merci de me confirmer la disponibilité et le prix.`
  }

  const encodedMessage = encodeURIComponent(message)
  const whatsappNumber = '25767405262'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, '_blank')

  // Optional: Redirect or show success state
  setTimeout(() => router.push('/'), 1000)
}
</script>

<style scoped>
.quote-page {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* New Hero Design */
.quote-hero {
  position: relative;
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: -60px; /* Overlap effect */
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/img/hero-quote.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 32px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  max-width: 700px;
}

.hero-content h1 {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.hero-content p {
  font-size: clamp(16px, 3vw, 20px);
  font-weight: 500;
  opacity: 1;
  line-height: 1.5;
  color: #f1f5f9;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* Main Container */
.quote-container {
  width: 90%;
  max-width: 600px;
  margin: 0 auto 60px;
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  position: relative;
  z-index: 10;
}

/* Context Info */
.context-info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.context-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #3b82f6;
  font-weight: 700;
}

.context-product {
  font-size: 18px;
  font-weight: 700;
  color: #1e40af;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
}

/* Progress Bar */
.progress-bar {
  height: 6px;
  background: #f1f5f9;
  border-radius: 10px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary, #2563eb);
  transition: width 0.4s ease;
}

.progress-text {
  text-align: right;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 32px;
  font-weight: 500;
}

/* Steps */
.step h2 {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 24px;
  text-align: center;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.mt-6 { margin-top: 24px; }

/* Options Grid */
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 16px;
}

.option-card {
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.centered-card {
  justify-content: center;
}

.text-white { color: white !important; }

.option-card:hover { border-color: #cbd5e1; }
.option-card.selected {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
}

.option-icon { font-size: 32px; margin-bottom: 8px; }
.option-title { font-weight: 600; font-size: 14px; }

.small-grid { grid-template-columns: repeat(2, 1fr); }
.small-card { padding: 16px; }
.option-icon-text { font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; }

/* Options List */
.options-list { display: flex; flex-direction: column; gap: 12px; }
.option-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.option-row:hover { border-color: #cbd5e1; }
.option-row.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.option-icon-small { font-size: 24px; }
.option-content { text-align: left; }
.option-title { font-weight: 600; font-size: 15px; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.option-subtitle { font-size: 13px; color: #64748b; margin-top: 2px; }

.badge-opt {
  font-size: 10px;
  background: #fef3c7;
  color: #d97706;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
}

.info-note {
  margin-top: 16px;
  padding: 12px;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  font-size: 13px;
  color: #92400e;
  display: flex;
  gap: 8px;
  align-items: start;
}
.info-note i { margin-top: 2px; }

/* Quantity */
.quantity-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}
.qty-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  background: white;
  color: #0f172a;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.qty-btn:hover { border-color: #2563eb; color: #2563eb; }

.qty-input {
  width: 80px;
  height: 44px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.quick-qty { display: flex; justify-content: center; gap: 8px; }
.quick-qty-btn {
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.quick-qty-btn.active {
  background: #0f172a;
  border-color: #0f172a;
  color: white;
}

/* Contact Form */
.form-group { margin-bottom: 16px; }
.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 8px;
}
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Nav Buttons */
.navigation-buttons {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  border-top: 1px solid #f1f5f9;
  padding-top: 24px;
}
.nav-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}
.btn-secondary { background: #f1f5f9; color: #475569; }
.btn-secondary:hover { background: #e2e8f0; }

.btn-primary { background: #2563eb; color: white; }
.btn-primary:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-success { background: #22c55e; color: white; }
.btn-success:hover:not(:disabled) { background: #16a34a; transform: translateY(-1px); }

/* Responsive */
@media (max-width: 640px) {
  .quote-container { padding: 24px; margin-top: -20px; }
  .quote-hero { min-height: 250px; }
  .options-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Product Selection Styles */
.product-thumb {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}
.product-thumb img { width: 100%; height: 100%; object-fit: cover; }
.icon-thumb { font-size: 24px; }
</style>
