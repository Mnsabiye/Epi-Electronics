<template>
  <footer>
    <div class="footer-container">
      <div class="footer-section">
        <h3>EPI Electronics</h3>
        <div class="social-icons">
          <a href="https://wa.me/72013010" target="_blank"><img src="/assets/img/wtsp.png" alt="WhatsApp"></a>
          <a href="https://www.facebook.com/epielectronics" target="_blank"><img src="/assets/img/fb1.png" alt="Facebook"></a>
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
        <p>Telephone: (+257) 71 98 79 35</p>
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
  </footer>
</template>

<style scoped>
footer {
  background: var(--gray-50);
  padding: 60px 24px 40px;
  border-top: 1px solid var(--gray-100);
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 40px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.footer-section h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li,
.footer-section p {
  font-size: 14px;
  color: var(--gray-400);
}

.footer-section a {
  color: var(--gray-400);
  transition: var(--transition-fast);
}

.footer-section a:hover {
  color: var(--gray-900);
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: 8px;
  transition: var(--transition-base);
}

.social-icons a:hover {
  background: var(--gray-900);
  border-color: var(--gray-900);
}

.social-icons a:hover img {
  filter: brightness(10);
}

.social-icons img {
  width: 18px;
  height: 18px;
  transition: var(--transition-base);
}
</style>
