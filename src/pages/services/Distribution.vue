<template>
  <div class="service-page">
    <div class="service-hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Vente & Distribution</h1>
        <p>Accès privilégié aux équipements mondiaux pour votre entreprise</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="content-grid">
        <div class="main-text">
          <p class="lead">
            Au-delà de notre stock local, EpiElectronics est votre passerelle vers le marché mondial des technologies. Nous simplifions l'approvisionnement complexe en vous donnant accès aux meilleurs équipements, où qu'ils se trouvent.
          </p>
          
          <h2>Sourcing International (USA, Dubaï, Chine)</h2>
          <p>
            Vous avez des besoins spécifiques qui ne trouvent pas de réponse sur le marché local ? Grâce à notre réseau de partenaires logistiques établis, nous facilitons l'importation de matériel informatique depuis les hubs technologiques majeurs :
            <ul>
              <li><strong>USA :</strong> Accès aux dernières innovations Apple, Dell, et HP dès leur sortie.</li>
              <li><strong>Dubaï :</strong> Une plateforme idéale pour une large gamme d'équipements électroniques à prix compétitifs.</li>
              <li><strong>Chine :</strong> Sourcing direct pour composants, accessoires et solutions IoT industrielles.</li>
            </ul>
          </p>

          <h2>Commandes Personnalisées</h2>
          <p>
            Chaque entreprise est unique. Si vous avez besoin de configurations sur-mesure (stations de travail haute performance pour le rendu 3D, serveurs avec spécifications précises, ou flottes de laptops avec images disques pré-installées), nous gérons la commande de bout en bout. Nous supervisons la configuration, l'achat, le transport, le dédouanement et la livraison finale sur votre site.
          </p>

          <h2>Logistique et Garantie Locale</h2>
          <p>
            L'importation peut être risquée, mais pas avec EpiElectronics. Nous prenons la responsabilité de la logistique. Plus important encore, nous offrons une garantie locale sur tous les produits que nous distribuons. Vous bénéficiez ainsi de la technologie internationale avec la sécurité et le service après-vente d'un partenaire de proximité.
          </p>
        </div>

        <div class="cta-sidebar">
          <div class="cta-card">
            <h3>Un Besoin Spécifique ?</h3>
            <p>Dites-nous ce que vous cherchez, nous le trouvons et vous le livrons.</p>
            <router-link :to="{ name: 'QuoteRequest', query: { type: 'service', service: 'Vente & Distribution' }}" class="btn btn-primary">
              Commander du Matériel
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
  background-image: url('/assets/img/service-distribution.png');
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
  transform: scale(1.05);
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

.main-text ul {
  margin: 20px 0;
  padding-left: 24px;
}

.main-text li {
  margin-bottom: 12px;
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
