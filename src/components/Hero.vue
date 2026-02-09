<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const heroSection = ref(null)
const heroContent = ref(null)
const heroImage = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.fromTo(heroContent.value.children, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2 }
  )
  .fromTo(heroImage.value,
    { x: 30, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2 },
    "-=0.8"
  )
})
</script>

<template>
  <section class="hero" id="home" ref="heroSection">
    <div class="container hero-container">
      <div class="hero-content" ref="heroContent">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>Solutions Technologiques d'Entreprise</span>
        </div>
        
        <h1>
          L'Électronique <br>
          <span class="highlight">d'Excellence</span> <br>
          au Burundi
        </h1>
        
        <p>
          Demandez votre devis maintenant ou contactez-nous sur WhatsApp pour une collaboration directe.
        </p>

        <div class="hero-actions">
          <router-link to="/demandez-un-devis" class="btn btn-primary">
            Demander un Devis
          </router-link>
          <router-link to="/produits" class="btn btn-secondary">
            Voir le Catalogue
          </router-link>
        </div>

        <div class="trust-indicators">
          <div class="indicator">
            <i class="fas fa-check-circle"></i>
            <span>Matériel Certifié</span>
          </div>
          <div class="indicator">
            <i class="fas fa-shield-alt"></i>
            <span>Garantie Incluse</span>
          </div>
          <div class="indicator">
            <i class="fas fa-headset"></i>
            <span>Support Expert</span>
          </div>
        </div>
      </div>
      
      <div class="hero-visual" ref="heroImage">
        <div class="image-wrapper">
          <img src="/assets/img/hero-quote.png" alt="Équipement électronique professionnel" />
          <div class="gradient-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-top: 100px;
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
}

.hero-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Content Styles */
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: white;
  border-radius: 100px;
  box-shadow: 0 2px 10px rgba(30, 58, 138, 0.05);
  margin-bottom: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  border: 1px solid rgba(30, 58, 138, 0.1);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

h1 {
  font-size: clamp(48px, 4.5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  color: #0f172a;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.highlight {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #64748b;
  margin-bottom: 40px;
  max-width: 540px;
}

/* Actions */
.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
}

.btn {
  padding: 16px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: #1e3a8a;
  color: white;
  box-shadow: 0 4px 15px rgba(30, 58, 138, 0.2);
}

.btn-primary:hover {
  background: #172554;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
}

.btn-secondary {
  background: white;
  color: #1e3a8a;
  border: 1px solid rgba(30, 58, 138, 0.1);
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: rgba(30, 58, 138, 0.2);
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  gap: 32px;
  border-top: 1px solid #e2e8f0;
  padding-top: 32px;
  width: 100%;
}

.indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
}

.indicator i {
  color: #3b82f6;
  font-size: 16px;
}

/* Visual Styles */
.hero-visual {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(30, 58, 138, 0.1);
  background: white;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.02);
  transition: transform 0.8s ease;
}

.hero-visual:hover img {
  transform: scale(1.05);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(30, 58, 138, 0.1) 0%, transparent 100%);
  pointer-events: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
    padding-top: 40px;
  }

  .hero-content {
    align-items: center;
  }

  p {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .trust-indicators {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  h1 {
    font-size: 40px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
  
  .trust-indicators {
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
