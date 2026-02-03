<template>
  <footer>
    <div class="footer-gradient-line"></div>
    <div class="footer-container">
      <div class="footer-section">
        <h3>EPI Electronics</h3>
        <p class="footer-tagline">Votre partenaire technologique de confiance</p>
        <div class="social-icons">
          <a href="https://wa.me/72013010" target="_blank"><img src="/assets/img/wtsp.png" alt="WhatsApp"></a>
          <a href="https://www.facebook.com/profile.php?id=100087368895547" target="_blank"><img src="/assets/img/fb1.png" alt="Facebook"></a>
          <a href="https://www.instagram.com/epielectronics" target="_blank"><img src="/assets/img/ig.svg" alt="Instagram"></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Services</h3>
        <ul>
          <li>Reparation d'ordinateurs</li>
          <li>Services Electroniques</li>
          <li>Recuperations des donnees</li>
          <li>Diagnostiques</li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact</h3>
        <p>Telephone: (+257) 72 01 30 10</p>
        <p>Email: <a href="mailto:contact@epielectronics.store">contact@epielectronics.store</a></p>
        <p>Adresse : Bujumbura, Burundi</p>
      </div>
      <div class="footer-section">
        <h3>Horaires</h3>
        <p>Lun - Ven: 8h - 19h</p>
        <p>Samedi: 10h - 18h</p>
        <p>Dimanche: 12h - 17h</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 EPI Electronics. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--color-background-elevated);
  padding: 0 24px 40px;
  position: relative;
}

.footer-gradient-line {
  height: 4px;
  background: var(--gradient-cta);
  margin-bottom: 80px;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  max-width: 1280px;
  margin: 0 auto;
}

.footer-section h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.footer-tagline {
  font-size: 14px;
  color: var(--color-text-muted);
  margin-bottom: 24px;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section ul li,
.footer-section p {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.footer-section a {
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  text-decoration: none;
}

.footer-section a:hover {
  color: var(--color-primary-light);
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 12px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}

.social-icons a:hover img {
  filter: brightness(0) invert(1);
}

.social-icons img {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  opacity: 0.8;
}

.footer-bottom {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
  text-align: center;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

.footer-bottom p {
  font-size: 14px;
  color: var(--color-text-muted);
}
</style>
