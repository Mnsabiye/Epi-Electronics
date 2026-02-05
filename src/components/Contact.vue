<template>
  <section id="contact" class="contact-section">
    <div class="container contact-container">
      <div class="contact-left">
        <h2>Contactez-nous</h2>
        <p>Passez votre commande avec livraison gratuite — remplissez le formulaire ci-contre et nous vous répondrons rapidement.</p>
        <ul class="contact-list">
          <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
          <li><strong>Email :</strong> contact@epi-electronics.example</li>
          <li><strong>Adresse :</strong> 12 Rue de l'Électronique, 75000 Paris, France</li>
        </ul>
      </div>

      <div class="contact-right">
        <div class="iframe-wrapper">
          <!-- Google Form embed provided by user -->
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd3JMh9d3fBIHD2whMjTkqz0sRcuvfSZYeiWJfhGqb5R9YyIQ/viewform?embedded=true"
                  title="Formulaire de commande"
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                  loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script logic required for static embed
</script>

<style scoped>
.contact-section {
  padding: 80px 20px;
  background: linear-gradient(180deg, rgba(250,250,255,0.02), transparent);
}
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: start;
}
.contact-left h2 {
  font-size: 32px;
  margin-bottom: 12px;
}
.contact-left p {
  margin-bottom: 18px;
  color: var(--color-text-secondary);
}
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: var(--color-text-secondary);
}
.contact-list li {
  margin-bottom: 8px;
}
.contact-right .iframe-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.contact-right iframe {
  width: 100%;
  max-width: 640px; /* user's suggested width */
  height: 1892px; /* user's suggested height */
  border: none;
}

@media (max-width: 968px) {
  .contact-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .contact-right iframe {
    max-width: 100%;
    height: 1600px; /* reduce height on small screens for better UX */
  }
}
</style>
