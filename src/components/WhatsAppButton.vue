<template>
  <a 
    href="https://wa.me/25767405262" 
    target="_blank" 
    class="whatsapp-float"
    aria-label="Contactez-nous sur WhatsApp"
  >
    <i class="fab fa-whatsapp"></i>
  </a>
</template>

<style scoped>
.whatsapp-float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #FFF;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.whatsapp-float:hover {
  background-color: #128c7e;
  transform: scale(1.1);
  box-shadow: 2px 2px 10px #666;
}

.whatsapp-float i {
  margin-top: 2px; /* slight visual adjustment */
}

@media (max-width: 768px) {
  .whatsapp-float {
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
    font-size: 24px;
  }
}
</style>
