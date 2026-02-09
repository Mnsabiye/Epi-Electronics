<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToService = (path) => {
  router.push(path)
}
</script>

<template>
  <section class="services" id="services">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Nos Expertises</span>
        <h2>Des Solutions Complètes pour Votre Entreprise</h2>
        <p>Une gamme de services professionnels pour soutenir votre infrastructure technologique.</p>
      </div>

      <div class="service-container">
        <div class="service-card consulting" @click="navigateToService('/services/conseil')">
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="card-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Conseil & Stratégie</h3>
            <p>Audit de vos besoins et accompagnement sur-mesure pour optimiser votre parc informatique.</p>
          </div>
        </div>

        <div class="service-card maintenance" @click="navigateToService('/services/maintenance')">
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="card-icon">
              <i class="fas fa-tools"></i>
            </div>
            <h3>Maintenance Proactive</h3>
            <p>Support technique réactif et maintenance préventive pour assurer la continuité de vos opérations.</p>
          </div>
        </div>

        <div class="service-card distribution" @click="navigateToService('/services/distribution')">
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="card-icon">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <h3>Vente & Distribution</h3>
            <p>Accès privilégié aux meilleures marques du marché pour vos équipements professionnels.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: 120px 0;
  background: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 80px;
}

.subtitle {
  color: #3b82f6;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 16px;
  display: block;
}

h2 {
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.section-header p {
  font-size: 18px;
  color: #64748b;
  line-height: 1.6;
}

.service-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.service-card {
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  padding: 40px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 400px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.service-card.consulting { background-image: url('/assets/img/service-consulting.png'); }
.service-card.maintenance { background-image: url('/assets/img/service-maintenance.png'); }
.service-card.distribution { background-image: url('/assets/img/service-distribution.png'); }

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%);
  z-index: 1;
  transition: all 0.3s ease;
}

.service-card:hover .card-overlay {
  background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.6) 100%);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.card-content {
  position: relative;
  z-index: 2;
  color: white;
}

.card-icon {
  width: 56px;
  height: 56px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
}

.service-card:hover .card-icon {
  background: #3b82f6;
  border-color: #3b82f6;
  transform: scale(1.1);
}

.card-content h3 {
  font-size: 26px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.card-content p {
  color: #e2e8f0;
  line-height: 1.6;
  font-size: 16px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .services {
    padding: 80px 0;
  }
  
  .container {
    padding: 0 24px;
  }

  h2 {
    font-size: 32px;
  }
  
  .service-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
