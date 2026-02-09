<template>
  <div class="all-products-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Tous nos Produits</h1>
        <p>Découvrez notre gamme complète de matériel électronique</p>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section">
      <div class="container">
        <!-- Category Filters -->
        <div class="filters">
          <button 
            @click="selectedCategory = 'all'" 
            class="filter-btn"
            :class="{ active: selectedCategory === 'all' }"
          >
            Tous les produits
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectedCategory = category.id" 
            class="filter-btn"
            :class="{ active: selectedCategory === category.id }"
          >
            {{ category.title }}
          </button>
        </div>

        <!-- Products Grid -->
        <div class="products-grid">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="product-card"
            @click="goToProduct(product.slug)"
          >
            <div class="product-image">
              <img :src="product.images[0].src" :alt="product.name">
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
                <router-link v-else to="/demandez-un-devis" class="quote-link" @click.stop>
                  <i class="fas fa-file-invoice"></i>
                  Demander un devis
                </router-link>
                <button v-if="product.showPrice" class="quick-order-btn" @click.stop>
                  <i class="fab fa-whatsapp"></i>
                  Commander
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <i class="fas fa-box-open"></i>
          <p>Aucun produit trouvé dans cette catégorie</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllProducts, productCategories, formatPrice } from '../data/products.js'

const router = useRouter()
const selectedCategory = ref('all')

const categories = computed(() => Object.values(productCategories))
const allProducts = getAllProducts()

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return allProducts
  }
  return allProducts.filter(p => p.category === selectedCategory.value)
})

const goToProduct = (slug) => {
  router.push({ name: 'ProductDetail', params: { slug } })
}
</script>

<style scoped>
.all-products-page {
  min-height: 100vh;
  background: var(--color-background);
  padding-top: 80px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  padding: 60px 24px;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.hero-section h1 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 16px;
}

.hero-section p {
  font-size: 18px;
  color: var(--color-text-secondary);
}

/* Products Section */
.products-section {
  padding: 60px 24px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Filters */
.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.product-image {
  position: relative;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.stock-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
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
  padding: 20px;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--color-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.6em;
}

.product-description {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
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
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
}

.quote-link {
  font-size: 13px;
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
  padding: 8px 16px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 13px;
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

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--color-text-secondary);
}

.empty-state i {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.3;
}

.empty-state p {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .all-products-page {
    padding-top: 60px;
  }

  .hero-section {
    padding: 40px 16px;
  }

  .products-section {
    padding: 40px 16px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }

  .filters {
    justify-content: flex-start;
  }
}
</style>
