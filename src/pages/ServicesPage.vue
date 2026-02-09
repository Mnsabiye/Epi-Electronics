<template>
  <div class="services-page">
    <div class="services-hero">
      <div class="hero-bg-wrapper">
        <img src="/assets/img/hero-services.png" alt="EpiElectronics Services Team" class="hero-bg-img" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1>Nos Services</h1>
        <p>Des solutions technologiques complètes pour votre entreprise</p>
      </div>
    </div>

    <div class="container">
      <div class="services-grid">
        <div class="service-card" @click="navigateTo('/services/conseil')">
          <div class="card-image consulting-bg"></div>
          <div class="card-content">
            <div class="icon-box"><i class="fas fa-chart-line"></i></div>
            <h3>Conseil & Stratégie</h3>
            <p>Audit, diagnostic et feuille de route pour votre transformation numérique.</p>
            <span class="link-text">En savoir plus <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>

        <div class="service-card" @click="navigateTo('/services/maintenance')">
          <div class="card-image maintenance-bg"></div>
          <div class="card-content">
            <div class="icon-box"><i class="fas fa-tools"></i></div>
            <h3>Maintenance Proactive</h3>
            <p>Support technique et maintenance pour assurer la continuité de vos opérations.</p>
            <span class="link-text">En savoir plus <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>

        <div class="service-card" @click="navigateTo('/services/distribution')">
          <div class="card-image distribution-bg"></div>
          <div class="card-content">
            <div class="icon-box"><i class="fas fa-shopping-bag"></i></div>
            <h3>Vente & Distribution</h3>
            <p>Fourniture d'équipements informatiques de grandes marques.</p>
            <span class="link-text">En savoir plus <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.services-page {
  padding-top: 80px;
  background: #f8fafc;
  min-height: 100vh;
}

.services-hero {
  height: 50vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: 60px;
  overflow: hidden;
}

.hero-bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.8));
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #ffffff !important;
}

.hero-content p {
  font-size: 20px;
  opacity: 0.9;
  color: #ffffff !important;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 80px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.service-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border-color: #3b82f6;
}

.card-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.consulting-bg { background-image: url('/assets/img/service-consulting.png'); }
.maintenance-bg { background-image: url('/assets/img/service-maintenance.png'); }
.distribution-bg { background-image: url('/assets/img/service-distribution.png'); }

.card-content {
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.icon-box {
  width: 50px;
  height: 50px;
  background: #eff6ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
  font-size: 24px;
  margin-bottom: 20px;
}

.service-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #0f172a;
}

.service-card p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
}

.link-text {
  color: #2563eb;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
