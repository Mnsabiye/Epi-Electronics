<template>
  <div class="service-page">
    <div class="service-hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>Maintenance Proactive</h1>
        <p>Assurez la continuité de vos opérations avec notre support technique expert</p>
      </div>
    </div>

    <div class="container content-section">
      <div class="content-grid">
        <div class="main-text">
          <p class="lead">
            Une panne informatique ne devrait jamais paralyser votre activité. Chez EpiElectronics, nous transformons la maintenance informatique : nous passons de la réaction à la proactivité pour garantir une disponibilité maximale de vos outils de travail.
          </p>
          
          <h2>Installation et Déploiement</h2>
          <p>
            La performance commence par une installation rigoureuse. Nos équipes techniques prennent en charge le déploiement complet de votre infrastructure :
            <ul>
              <li><strong>Postes de travail :</strong> Installation, configuration et mise en réseau de vos ordinateurs de bureau et portables.</li>
              <li><strong>Serveurs et Réseaux :</strong> Mise en place de baies de serveurs, configuration de routeurs, switchs et solutions Wi-Fi d'entreprise.</li>
              <li><strong>Périphériques :</strong> Intégration d'imprimantes, scanners et systèmes de visioconférence.</li>
            </ul>
             Nous assurons une mise en route conforme aux standards de l'industrie, avec une gestion des câbles (cable management) soignée pour des installations propres et durables.
          </p>

          <h2>Contrats de Maintenance Préventive</h2>
          <p>
            Mieux vaut prévenir que guérir. Nos contrats de maintenance incluent des visites régulières sur site et une supervision à distance pour anticiper les défaillances. Nous effectuons les mises à jour critiques, le nettoyage physique des équipements, la vérification des sauvegardes et l'optimisation des performances système. Cette approche permet de prolonger la durée de vie de votre matériel et d'éviter les interruptions coûteuses.
          </p>

          <h2>Support Technique Réactif</h2>
          <p>
            En cas d'incident, notre équipe réagit rapidement. Que ce soit pour une intervention sur site ou une assistance à distance, nous mettons tout en œuvre pour rétablir vos services dans les plus brefs délais. Nous couvrons le diagnostic matériel, la résolution de conflits logiciels et la récupération de données, vous offrant ainsi une tranquillité d'esprit totale.
          </p>
        </div>

        <div class="cta-sidebar">
          <div class="cta-card">
            <h3>Besoin d'assistance ?</h3>
            <p>Ne laissez pas les problèmes techniques ralentir votre entreprise. Optez pour la sérénité.</p>
            <router-link :to="{ name: 'QuoteRequest', query: { type: 'service', service: 'Maintenance & Installation' }}" class="btn btn-primary">
              Demander un Devis Maintenance
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
  background-image: url('/assets/img/service-maintenance.png');
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
