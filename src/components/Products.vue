<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const featuredCategories = [
    { 
      id: 'laptops', 
      slug: 'ordinateurs-portables', 
      title: 'Ordinateurs Portables', 
      description: 'Performance et mobilité pour les professionnels.',
      image: '/assets/img/products/EliteBook x380 G8/IMG_0978.JPG',
      tag: 'Bestsellers'
    },
    { 
      id: 'printers', 
      slug: 'imprimantes', 
      title: 'Solutions d\'Impression', 
      description: 'Fiabilité et économie pour vos documents.', 
      image: '/assets/img/products/EPSON M338a/IMG_1015.JPG',
      tag: 'Entreprise'
    },
    { 
      id: 'accessories', 
      slug: 'accessoires-peripheriques', 
      title: 'Accessoires & Réseaux', 
      description: 'Tous les essentiels pour votre connectivité.', 
      image: '/assets/img/products/hp_wireless_mouse.JPG',
      tag: 'Essentiels'
    }
]

const openCategory = (slug) => {
    router.push({ name: 'Category', params: { slug } })
}
</script>

<template>
  <section class="products" id="products">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Notre Catalogue</span>
        <h2>Produits Certifiés</h2>
        <router-link to="/produits" class="view-all">
          Tout voir <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>

      <div class="products-grid">
        <div 
          v-for="category in featuredCategories" 
          :key="category.id"
          class="product-card"
          @click="openCategory(category.slug)"
        >
          <div class="card-image">
            <img :src="category.image" :alt="category.title">
            <span class="tag">{{ category.tag }}</span>
            <div class="overlay">
              <span class="btn-explore">Explorer</span>
            </div>
          </div>
          <div class="card-content">
            <h3>{{ category.title }}</h3>
            <p>{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  padding: 120px 0;
  background: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 60px;
  position: relative;
}

.subtitle {
  color: #3b82f6;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 12px;
}

h2 {
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0;
  letter-spacing: -0.02em;
}

.view-all {
  position: absolute;
  right: 0;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1e3a8a;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.view-all:hover {
  gap: 12px;
  text-decoration: underline;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.product-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .card-image img {
  transform: scale(1.05);
}

.tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #0f172a;
  z-index: 2;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .overlay {
  opacity: 1;
}

.btn-explore {
  background: white;
  color: #0f172a;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.product-card:hover .btn-explore {
  transform: translateY(0);
}

.card-content h3 {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.card-content p {
  color: #64748b;
  font-size: 16px;
}

@media (max-width: 768px) {
  .section-header {
    align-items: flex-start;
  }
  
  .view-all {
    position: static;
    margin-top: 16px;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
