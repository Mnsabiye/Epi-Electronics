<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategoryBySlug, formatPrice } from '../data/products.js'

const route = useRoute()
const router = useRouter()

const category = computed(() => getCategoryBySlug(route.params.slug))
const loading = ref(true)

onMounted(() => {
  // Simulate loading for smooth transition
  setTimeout(() => {
    loading.value = false
    if (!category.value) {
      router.push({ name: 'NotFound' })
    }
  }, 300)
})

const goToProduct = (productSlug) => {
  router.push({ name: 'ProductDetail', params: { slug: productSlug } })
}
</script>

<template>
  <div class="category-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>

    <!-- Category Content -->
    <div v-else-if="category" class="category-content">
      <!-- Hero Section -->
      <section class="category-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="category-title">{{ category.title }}</h1>
          <p class="category-description">{{ category.description }}</p>
          <div class="breadcrumb">
            <router-link to="/">Accueil</router-link>
            <span class="separator">/</span>
            <span>{{ category.title }}</span>
          </div>
        </div>
      </section>

      <!-- Products Grid -->
      <section class="products-section">
        <div class="container">
          <div class="section-header">
            <h2>Tous les produits</h2>
            <p>{{ category.products.length }} produit{{ category.products.length > 1 ? 's' : '' }} disponible{{ category.products.length > 1 ? 's' : '' }}</p>
          </div>

          <div class="products-grid">
            <div 
              v-for="product in category.products" 
              :key="product.id"
              class="product-card"
              @click="goToProduct(product.slug)"
            >
              <div class="product-image-container">
                <img 
                  :src="product.images[0].src" 
                  :alt="product.name"
                  loading="lazy"
                >
                <div class="product-overlay">
                  <button class="view-btn">
                    <i class="fas fa-eye"></i>
                    Voir les détails
                  </button>
                </div>
                <div v-if="product.inStock" class="stock-badge in-stock">
                  <i class="fas fa-check-circle"></i> En stock
                </div>
                <div v-else class="stock-badge out-of-stock">
                  <i class="fas fa-times-circle"></i> Rupture
                </div>
              </div>

              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ product.description }}</p>
                
                <div class="product-footer">
                  <div v-if="product.showPrice" class="price">{{ formatPrice(product.price, product.currency) }}</div>
                  <router-link v-else to="/demandez-un-devis" class="quote-link">
                    <i class="fas fa-file-invoice"></i>
                    Demander un devis
                  </router-link>
                  <button v-if="product.showPrice" class="quick-order-btn">
                    <i class="fab fa-whatsapp"></i>
                    Commander
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Besoin d'aide pour choisir ?</h2>
            <p>Notre équipe est là pour vous conseiller et répondre à toutes vos questions</p>
            <div class="cta-buttons">
              <a href="https://wa.me/25767405262" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i>
                Contactez-nous sur WhatsApp
              </a>
              <router-link to="/#contact" class="btn btn-secondary">
                <i class="fas fa-envelope"></i>
                Formulaire de contact
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.category-page {
  min-height: 100vh;
  background: var(--color-background);
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Hero Section */
.category-hero {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 50%, rgba(30, 58, 138, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
  max-width: 800px;
}

.category-title {
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  margin-bottom: 20px;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.category-description {
  font-size: clamp(18px, 2vw, 24px);
  color: var(--color-text-secondary);
  margin-bottom: 30px;
  line-height: 1.6;
}

.breadcrumb {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 14px;
  color: var(--color-text-secondary);
}

.breadcrumb a {
  color: var(--color-primary-light);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.separator {
  opacity: 0.5;
}

/* Products Section */
.products-section {
  padding: 80px 24px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
}

.section-header p {
  font-size: 18px;
  color: var(--color-text-secondary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
}

.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl), var(--shadow-glow);
  border-color: var(--color-primary);
}

.product-image-container {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image-container img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-btn {
  background: var(--gradient-cta);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s;
}

.view-btn:hover {
  transform: scale(1.05);
}

.stock-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
}

.stock-badge.in-stock {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.stock-badge.out-of-stock {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.product-info {
  padding: 24px;
}

.product-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
}

.product-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.price {
  font-size: 24px;
  font-weight: 700;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quote-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.quote-link:hover {
  color: var(--color-primary-light);
  transform: translateX(4px);
}

.quick-order-btn {
  background: #25D366;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  white-space: nowrap;
}

.quick-order-btn:hover {
  background: #1fb855;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  padding: 80px 24px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--color-border);
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.05) 0%, transparent 70%);
}

.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--color-text);
}

.cta-content p {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 16px 32px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #25D366;
  color: white;
}

.btn-primary:hover {
  background: #1fb855;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .category-hero {
    height: 300px;
  }

  .products-section {
    padding: 60px 16px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .cta-section {
    padding: 60px 16px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .product-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .quick-order-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
