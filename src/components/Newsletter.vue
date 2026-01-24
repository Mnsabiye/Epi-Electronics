<script setup>
import { ref } from 'vue'

const email = ref('')
const showSuccess = ref(false)

const subscribe = () => {
  if (!email.value) return
  
  // Simulate API call
  setTimeout(() => {
    showSuccess.value = true
    email.value = ''
    
    // Reset after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  }, 1000)
}
</script>

<template>
  <section class="newsletter">
    <div class="newsletter-container">
      <div class="newsletter-content">
        <h2>Restez informé</h2>
        <p>Recevez nos dernières actualités et offres spéciales directement dans votre boîte mail</p>
        
        <form class="newsletter-form" @submit.prevent="subscribe">
          <div class="form-group" v-if="!showSuccess">
            <input type="email" v-model="email" placeholder="Votre adresse email" required>
            <button type="submit" class="newsletter-btn">
              <i class="fas fa-paper-plane"></i>
              S'abonner
            </button>
          </div>
          
          <div class="newsletter-success" v-else>
            <i class="fas fa-check-circle"></i>
            Merci ! Vous êtes maintenant abonné à notre newsletter.
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  padding: 80px 24px;
  background: var(--gray-900);
  text-align: center;
}

.newsletter-container {
  max-width: 560px;
  margin: 0 auto;
}

.newsletter h2 {
  font-size: clamp(32px, 4vw, 44px);
  color: var(--white);
  margin-bottom: 16px;
}

.newsletter p {
  font-size: 17px;
  color: var(--gray-300);
  margin-bottom: 32px;
}

.newsletter-form {
  max-width: 440px;
  margin: 0 auto;
  height: 60px; /* Min height */
}

.form-group {
  display: flex;
  background: var(--white);
  border-radius: 980px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: fadeIn 0.3s ease;
}

input[type="email"] {
  flex: 1;
  padding: 16px 24px;
  border: none;
  outline: none;
  font-size: 16px;
  font-family: var(--font-primary, sans-serif);
  color: var(--gray-900);
  background: transparent;
}

.newsletter-btn {
  padding: 16px 28px;
  background: var(--blue-primary);
  border: none;
  color: var(--white);
  font-family: var(--font-primary, sans-serif);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition-base);
}

.newsletter-btn:hover {
  background: var(--blue-hover);
}

.newsletter-success {
  margin-top: 0;
  padding: 16px;
  background: rgba(52, 199, 89, 0.15);
  border-radius: 12px;
  color: #34c759;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .form-group {
    flex-direction: column;
    border-radius: 12px;
  }
  
  input[type="email"] {
    text-align: center;
  }
  
  .newsletter-btn {
    justify-content: center;
  }
}
</style>
