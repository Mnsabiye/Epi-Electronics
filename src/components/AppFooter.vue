<template>
  <footer>
    <div class="footer-gradient-line"></div>
    <div class="footer-container">
      <div class="footer-section">
        <h3>EPI Electronics</h3>
        <p class="footer-tagline">Votre partenaire technologique de confiance</p>
        <div class="social-icons">
          <a href="https://wa.me/25767405262" target="_blank"><img src="/assets/img/wtsp.png" alt="WhatsApp"></a>
          <a href="https://www.facebook.com/profile.php?id=100087368895547" target="_blank"><img src="/assets/img/fb1.png" alt="Facebook"></a>
          <a href="https://www.instagram.com/epi_electronics?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><img src="/assets/img/ig.svg" alt="Instagram"></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Produits</h3>
        <ul>
          <li><router-link to="/categorie/ordinateurs-portables">Ordinateurs Portables</router-link></li>
          <li><router-link to="/categorie/imprimantes">Imprimantes & Scanners</router-link></li>
          <li><router-link to="/categorie/accessoires-peripheriques">Accessoires & Périphériques</router-link></li>
          <li><router-link to="/produits">Voir tout le catalogue</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Services</h3>
        <ul>
          <li><router-link to="/services/web">Sites Web & IA</router-link></li>
          <li><router-link to="/services/maintenance">Maintenance Proactive</router-link></li>
          <li><router-link to="/services/distribution">Vente & Distribution</router-link></li>
          <li><router-link to="/services">Tous nos services</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contact</h3>
        <p>Telephone: (+257) 72 01 30 10</p>
        <p>Email: <a href="mailto:contact@epielectronics.store">contact@epielectronics.store</a></p>
        <p>Adresse : <a href="https://maps.app.goo.gl/jcVT9Qf5ZZKwjJ9y7"> Bujumbura av. de la RDC, Maison du Tresor</a></p>
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
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.15);
}

.social-icons a:hover {
  background: #ffffff;
  border-color: transparent;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.25);
}

.social-icons a:hover img {
  filter: none;
}

.social-icons img {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  opacity: 1;
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
