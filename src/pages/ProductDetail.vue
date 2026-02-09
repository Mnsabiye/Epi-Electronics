<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductBySlug, formatPrice, productCategories } from '../data/products.js'

const route = useRoute()
const router = useRouter()

const product = computed(() => getProductBySlug(route.params.slug))
const loading = ref(true)
const selectedImage = ref(0)
const quantity = ref(1)

const relatedProducts = computed(() => {
  if (!product.value) return []
  const category = productCategories[product.value.category]
  return category.products.filter(p => p.id !== product.value.id).slice(0, 3)
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    if (!product.value) {
      router.push({ name: 'NotFound' })
    }
  }, 300)
})

const selectImage = (index) => {
  selectedImage.value = index
}

const orderOnWhatsApp = () => {
  const priceText = product.value.showPrice ? `\nPrix: ${formatPrice(product.value.price, product.value.currency)}` : ''
  const message = `Bonjour, je suis intéressé(e) par le produit:\n${product.value.name}${priceText}\nQuantité: ${quantity.value}`
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/25767405262?text=${encodedMessage}`, '_blank')
}

const goToProduct = (productSlug) => {
  router.push({ name: 'ProductDetail', params: { slug: productSlug } })
  selectedImage.value = 0
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="product-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb-container">
        <div class="container">
          <div class="breadcrumb">
            <router-link to="/">Accueil</router-link>
            <span class="separator">/</span>
            <router-link :to="`/categorie/${productCategories[product.category].slug}`">
              {{ productCategories[product.category].title }}
            </router-link>
            <span class="separator">/</span>
            <span>{{ product.name }}</span>
          </div>
        </div>
      </div>

      <!-- Product Details -->
      <section class="product-section">
        <div class="container">
          <div class="product-grid">
            <!-- Image Gallery -->
            <div class="image-gallery">
              <div class="main-image">
                <img 
                  :src="product.images[selectedImage].src" 
                  :alt="product.images[selectedImage].alt || product.name"
                >
                <div v-if="product.inStock" class="stock-badge in-stock">
                  <i class="fas fa-check-circle"></i> En stock
                </div>
                <div v-else class="stock-badge out-of-stock">
                  <i class="fas fa-times-circle"></i> Rupture de stock
                </div>
              </div>
              
              <div v-if="product.images.length > 1" class="thumbnail-gallery">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="thumbnail"
                  :class="{ active: selectedImage === index }"
                  @click="selectImage(index)"
                >
                  <img :src="image.src" :alt="image.alt || `${product.name} - Image ${index + 1}`">
                </div>
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <h1 class="product-title">{{ product.name }}</h1>
              <p class="product-short-desc">{{ product.description }}</p>
              
              <div class="price-section">
                <div v-if="product.showPrice" class="price">{{ formatPrice(product.price, product.currency) }}</div>
                <div v-else class="price-quote">
                  <i class="fas fa-file-invoice"></i>
                  Prix sur devis
                </div>
                <div class="availability" :class="{ 'in-stock': product.inStock, 'out-of-stock': !product.inStock }">
                  <i :class="product.inStock ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                  {{ product.inStock ? 'Disponible' : 'Rupture de stock' }}
                </div>
              </div>

              <div class="quantity-section">
                <label>Quantité:</label>
                <div class="quantity-control">
                  <button @click="quantity = Math.max(1, quantity - 1)" :disabled="!product.inStock">
                    <i class="fas fa-minus"></i>
                  </button>
                  <input type="number" v-model.number="quantity" min="1" :disabled="!product.inStock">
                  <button @click="quantity++" :disabled="!product.inStock">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div class="action-buttons">
                <button 
                  v-if="product.showPrice"
                  class="btn btn-primary" 
                  @click="orderOnWhatsApp"
                  :disabled="!product.inStock"
                >
                  <i class="fab fa-whatsapp"></i>
                  Commander sur WhatsApp
                </button>
                <router-link 
                  v-else 
                  :to="{ path: '/demandez-un-devis', query: { product: product.name, slug: product.slug } }" 
                  class="btn btn-primary"
                >
                  <i class="fas fa-file-invoice"></i>
                  Demander un devis
                </router-link>
                <router-link v-if="product.showPrice" to="/demandez-un-devis" class="btn btn-secondary">
                  <i class="fas fa-file-invoice"></i>
                  Demander un devis
                </router-link>
                <button 
                  v-else
                  class="btn btn-secondary" 
                  @click="orderOnWhatsApp"
                  :disabled="!product.inStock"
                >
                  <i class="fab fa-whatsapp"></i>
                  Contacter sur WhatsApp
                </button>
              </div>

              <div class="product-description">
                <h3>Description</h3>
                <p>{{ product.longDescription }}</p>
              </div>

              <div class="product-features">
                <h3>Caractéristiques</h3>
                <ul>
                  <li v-for="(feature, index) in product.features" :key="index">
                    <i class="fas fa-check"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts.length > 0" class="related-section">
        <div class="container">
          <h2>Produits similaires</h2>
          <div class="related-grid">
            <div 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id"
              class="related-card"
              @click="goToProduct(relatedProduct.slug)"
            >
              <div class="related-image">
                <img :src="relatedProduct.images[0].src" :alt="relatedProduct.name">
              </div>
              <div class="related-info">
                <h4>{{ relatedProduct.name }}</h4>
                <div v-if="relatedProduct.showPrice" class="related-price">{{ formatPrice(relatedProduct.price, relatedProduct.currency) }}</div>
                <div v-else class="related-quote">Prix sur devis</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: 80px;
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

/* Breadcrumb */
.breadcrumb-container {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 20px 24px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: var(--color-text-secondary);
  flex-wrap: wrap;
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

/* Product Section */
.product-section {
  padding: 60px 24px;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Image Gallery */
.image-gallery {
  position: sticky;
  top: 100px;
}

.main-image {
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
  margin-bottom: 20px;
  border: 1px solid var(--color-border);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 40px;
}

.stock-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
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

.thumbnail-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.thumbnail {
  aspect-ratio: 1;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.thumbnail:hover {
  border-color: var(--color-primary-light);
}

.thumbnail.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-glow);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.product-short-desc {
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.price {
  font-size: 40px;
  font-weight: 800;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.availability {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
}

.availability.in-stock {
  color: #22c55e;
}

.availability.out-of-stock {
  color: #ef4444;
}

.price-quote {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-quote i {
  font-size: 28px;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-section label {
  font-weight: 600;
  font-size: 16px;
  color: var(--color-text);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.quantity-control button {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-control button:hover:not(:disabled) {
  background: var(--color-accent-bg);
  color: var(--color-primary);
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control input {
  width: 60px;
  height: 40px;
  border: none;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background: var(--color-background);
  color: var(--color-text);
}

.quantity-control input:focus {
  outline: none;
}

.action-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  min-width: 200px;
  padding: 18px 32px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #25D366;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1fb855;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
}

.btn-primary:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
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

.product-description,
.product-features {
  padding: 24px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.product-description h3,
.product-features h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--color-text);
}

.product-description p {
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.product-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-features li {
  display: flex;
  align-items: start;
  gap: 12px;
  font-size: 16px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.product-features li i {
  color: var(--color-primary);
  margin-top: 4px;
  flex-shrink: 0;
}

/* Related Products */
.related-section {
  padding: 60px 24px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.related-section h2 {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  color: var(--color-text);
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.related-card {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.related-image {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
  transition: transform 0.3s;
}

.related-card:hover .related-image img {
  transform: scale(1.05);
}

.related-info {
  padding: 16px;
}

.related-info h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

.related-price {
  font-size: 16px;
  font-weight: 700;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.related-quote {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .image-gallery {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding-top: 60px;
  }

  .breadcrumb-container {
    padding: 16px;
  }

  .product-section {
    padding: 40px 16px;
  }

  .price-section {
    flex-direction: column;
    align-items: start;
    gap: 12px;
  }

  .price {
    font-size: 32px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    min-width: auto;
  }

  .related-section {
    padding: 40px 16px;
  }

  .related-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
</style>
