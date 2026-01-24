<script setup>
</script>

<template>
  <section class="services" id="services">
    <h2>Nos Services</h2>
    <div class="service-container">
      <div class="service-card">
        <img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" alt="Conseil">
        <h3>Conseil & Expertise</h3>
        <p>Nous vous accompagnons dans le choix et l’intégration des meilleures solutions électroniques.</p>
      </div>
      <div class="service-card">
        <img src="https://cdn-icons-png.flaticon.com/512/3094/3094850.png" alt="Maintenance">
        <h3>Maintenance</h3>
        <p>Un suivi technique et une maintenance proactive pour garantir la performance de vos équipements.</p>
      </div>
      <div class="service-card">
        <img src="https://cdn-icons-png.flaticon.com/512/1903/1903162.png" alt="Formation">
        <h3>Ventes</h3>
        <p>Pour tous vos besoin techniques ou technologiques pour de grandes entreprises ou pour usage personnel. Contactez-nous!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding: var(--section-padding);
  background: var(--gray-50);
  text-align: center;
}

.services h2 {
  font-size: clamp(40px, 5vw, 56px);
  margin-bottom: 60px;
  color: var(--gray-900);
}

.service-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px;
}

.service-card {
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: 48px 32px;
  text-align: center;
  transition: var(--transition-slow);
  border: 1px solid var(--gray-100);
  /* Glass effect preparation if needed */
}

.service-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: transparent;
}

.service-card img {
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  opacity: 0.9;
}

.service-card h3 {
  font-size: 22px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.service-card p {
  font-size: 15px;
  color: var(--gray-400);
  line-height: 1.6;
}
</style>
