<template>
  <div class="service-page">
    <div class="service-hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Conseil & Stratégie</h1>
        <p>Expertise technique et vision stratégique pour votre transformation numérique</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="content-grid">
        <div class="main-text">
          <p class="lead">
            Dans un environnement technologique en constante évolution, faire les bons choix stratégiques est crucial pour la compétitivité de votre entreprise. Chez EpiElectronics, nous ne nous contentons pas de fournir du matériel ; nous vous accompagnons dans la définition et la mise en œuvre de votre stratégie IT.
          </p>
          
          <h2>Audit et Diagnostic</h2>
          <p>
            Notre approche commence par une compréhension approfondie de votre infrastructure existante et de vos objectifs d'affaires. Nos experts réalisent des audits complets de votre parc informatique, de vos réseaux et de vos systèmes de sécurité. Nous identifions les goulots d'étranglement, les vulnérabilités potentielles et les opportunités d'optimisation pour garantir que votre technologie soutient efficacement votre croissance.
          </p>

          <h2>Stratégie de Transformation Numérique</h2>
          <p>
            Nous élaborons des feuilles de route technologiques alignées sur vos ambitions. Que vous soyez une startup en pleine expansion ou une grande entreprise cherchant à moderniser ses opérations, nous vous guidons dans le choix des solutions logicielles et matérielles les plus adaptées. Nous vous aidons à anticiper les besoins futurs, à scalabilité votre infrastructure et à intégrer les nouvelles technologies de manière fluide et sécurisée.
          </p>

          <h2>Sécurité et Conformité</h2>
          <p>
            La protection de vos données est notre priorité. Nous vous conseillons sur les meilleures pratiques de cybersécurité, la mise en place de politiques de sauvegarde robustes et la conformité aux normes internationales. Notre objectif est de minimiser les risques tout en maximisant la productivité de vos équipes.
          </p>
        </div>

        <div class="cta-sidebar">
          <div class="cta-card">
            <h3>Besoin d'un accompagnement ?</h3>
            <p>Discutons de vos projets et définissons ensemble la meilleure stratégie pour votre entreprise.</p>
            <router-link :to="{ name: 'QuoteRequest', query: { type: 'service', service: 'Conseil & Stratégie' }}" class="btn btn-primary">
              Demander une Consultation
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-page {
  background: white;
}

.service-hero {
  height: 60vh;
  min-height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: hidden;
  margin-bottom: -60px; /* Overlap effect like Quote page */
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/img/service-consulting.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
  transform: scale(1.05); /* Slight zoom for impact */
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 32px;
  max-width: 800px;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.hero-content h1 {
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  margin-bottom: 16px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.6);
  color: #ffffff !important;
}

.hero-content p {
  font-size: clamp(18px, 3vw, 24px);
  opacity: 1;
  font-weight: 500;
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

.content-section {
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
}

.main-text {
  font-size: 16px;
  line-height: 1.8;
  color: #334155;
}

.lead {
  font-size: 20px;
  font-weight: 500;
  color: #1e3a8a;
  margin-bottom: 40px;
  border-left: 4px solid #3b82f6;
  padding-left: 20px;
}

h2 {
  font-size: 28px;
  color: #0f172a;
  margin: 40px 0 20px;
  font-weight: 700;
}

p {
  margin-bottom: 20px;
}

.cta-card {
  background: #f8fafc;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  position: sticky;
  top: 100px;
}

.cta-card h3 {
  font-size: 24px;
  margin-bottom: 16px;
  color: #0f172a;
}

.cta-card p {
  margin-bottom: 24px;
  color: #64748b;
}

.btn-primary {
  display: block;
  text-align: center;
  background: #1e3a8a;
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #172554;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(30, 58, 138, 0.2);
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-card {
    position: static;
    margin-top: 40px;
  }
}
</style>
