<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>Page non trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
      
      <div class="actions">
        <button @click="goHome" class="btn btn-primary">
          <i class="fas fa-home"></i>
          Retour à l'accueil
        </button>
        <router-link to="/#products" class="btn btn-secondary">
          <i class="fas fa-shopping-bag"></i>
          Voir nos produits
        </router-link>
      </div>

      <div class="illustration">
        <i class="fas fa-box-open"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.not-found-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.05) 0%, transparent 70%);
}

.not-found-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 600px;
}

.error-code {
  font-size: clamp(80px, 15vw, 160px);
  font-weight: 900;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 24px;
  letter-spacing: -0.05em;
}

.not-found-content h1 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.not-found-content p {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin-bottom: 40px;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.btn {
  padding: 16px 32px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: var(--gradient-cta);
  color: white;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.illustration {
  font-size: 120px;
  color: var(--color-border);
  opacity: 0.3;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .illustration {
    font-size: 80px;
  }
}
</style>
