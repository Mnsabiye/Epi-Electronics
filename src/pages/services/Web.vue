<template>
  <div class="service-page">
    <div class="service-hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Sites Web & IA</h1>
        <p>Alliez design moderne et puissance de l'intelligence artificielle pour une présence en ligne performante</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="content-grid">
        <div class="main-text">
          <p class="lead">
            Votre site web est la vitrine de votre entreprise. À l'ère du numérique, il ne suffit plus d'être présent ; il faut se démarquer. Chez EpiElectronics, nous concevons des sites web sur-mesure, esthétiques et fonctionnels, propulsés par l'intelligence artificielle et boostés par des stratégies de marketing digital performantes.
          </p>
          
          <h2>Design Web Moderne et Réactif</h2>
          <p>
            Nous créons des expériences utilisateurs fluides et captivantes. Que ce soit pour un site vitrine, une boutique en ligne ou une application web complexe, nos designs sont entièrement adaptatifs (responsive), garantissant une consultation optimale sur tous les appareils (ordinateurs, tablettes, smartphones). Nous mettons l'accent sur l'ergonomie (UI/UX) pour maximiser l'engagement de vos visiteurs.
          </p>

          <h2>Intégration de l'Intelligence Artificielle</h2>
          <p>
            Prenez une longueur d'avance en intégrant l'IA à votre site. Nous proposons des solutions innovantes telles que des chatbots intelligents pour le service client 24/7, des moteurs de recommandation personnalisés, et l'automatisation de tâches répétitives. L'IA permet d'analyser le comportement de vos utilisateurs pour optimiser continuellement votre plateforme et augmenter vos taux de conversion.
          </p>

          <h2>Performance et Référencement (SEO)</h2>
          <p>
            Un beau site ne sert à rien s'il n'est pas vu. Nous optimisons la structure technique et le contenu de votre site pour un référencement naturel (SEO) optimal sur les moteurs de recherche comme Google. De plus, nous assurons des temps de chargement ultra-rapides, critère essentiel pour l'expérience utilisateur et le classement dans les résultats de recherche.
          </p>

          <h2>Publicité en Ligne (Google Ads & Meta Ads)</h2>
          <p>
            Accélérez votre croissance avec des campagnes publicitaires ciblées. Nous gérons vos campagnes marketing sur Google Ads (Search, Display) et Meta Ads (Facebook, Instagram) pour attirer du trafic qualifié dès le lancement de votre site. Notre expertise nous permet d'optimiser votre budget pour obtenir le meilleur retour sur investissement (ROI) possible.
          </p>
        </div>

        <div class="cta-sidebar">
          <div class="cta-card">
            <h3>Besoin d'un accompagnement ?</h3>
            <p>Discutons de vos projets et définissons ensemble la meilleure stratégie pour votre entreprise.</p>
            <router-link :to="{ name: 'QuoteRequest', query: { type: 'service', service: 'Sites Web & IA' }}" class="btn btn-primary">
              Demander un Devis Web
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
  background-image: url('/assets/img/african-dev-standing.png');
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
