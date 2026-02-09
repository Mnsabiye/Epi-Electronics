<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="contact-wrapper">
        <div class="contact-content">
          <span class="badg">Besoin d'aide ?</span>
          <h2>Prêt à équiper votre entreprise ?</h2>
          <p>Nos experts sont à votre disposition pour analyser vos besoins et vous proposer les meilleures solutions matérielles et logicielles. Devis gratuit sous 24h.</p>
          
          <div class="contact-actions">
            <router-link to="/demandez-un-devis" class="btn btn-primary">
              Demander un Devis <i class="fas fa-arrow-right"></i>
            </router-link>
            <a href="https://wa.me/25767405262" target="_blank" class="btn btn-secondary">
              <i class="fab fa-whatsapp"></i> Discuter sur WhatsApp
            </a>
          </div>

          <div class="features-grid">
            <div class="feature-item">
              <i class="fas fa-check-circle"></i>
              <span>Réponse rapide</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-check-circle"></i>
              <span>Conseils d'experts</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-check-circle"></i>
              <span>Garantie incluse</span>
            </div>
          </div>
        </div>
        
        <div class="contact-image">
          <img src="/assets/img/hero-services.png" alt="Support Client EpiElectronics" />
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 100px 0;
  background: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.contact-wrapper {
  background: #0f172a;
  border-radius: 32px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.15);
}

.contact-content {
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.badg {
  display: inline-block;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  width: fit-content;
}

h2 {
  font-size: 42px;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  line-height: 1.2;
}

p {
  font-size: 18px;
  color: #94a3b8;
  margin-bottom: 40px;
  line-height: 1.6;
}

.contact-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn {
  padding: 16px 32px;
  border-radius: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.features-grid {
  display: flex;
  gap: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #cbd5e1;
  font-size: 14px;
  font-weight: 500;
}

.feature-item i {
  color: #3b82f6;
}

.contact-image {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 400px;
}

.contact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.contact-wrapper:hover .contact-image img {
  transform: scale(1.05);
}

@media (max-width: 968px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }

  .contact-content {
    padding: 40px;
  }

  .contact-image {
    height: 300px;
    min-height: auto;
  }
  
  h2 {
    font-size: 32px;
  }
}

@media (max-width: 640px) {
  .contact-actions {
    flex-direction: column;
  }
  
  .features-grid {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
