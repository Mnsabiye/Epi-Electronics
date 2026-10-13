<script setup>
import { ref } from 'vue'

const isReduced = ref(false)
</script>

<template>
  <aside
    class="fixed bottom-5 z-50 transition-all duration-300"
    :class="isReduced ? 'right-0' : 'right-5'"
    aria-label="Contact WhatsApp"
  >
    <!-- Reduced / Docked State -->
    <button
      v-if="isReduced"
      type="button"
      class="flex items-center gap-1 pl-2.5 pr-1.5 py-2 rounded-l-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5d] transition-all"
      title="Afficher le bouton WhatsApp"
      aria-label="Afficher le bouton WhatsApp"
      @click="isReduced = false"
    >
      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.556 4.122 1.527 5.853l-1.527 5.574 5.712-1.498c1.682.912 3.606 1.431 5.656 1.431 6.627 0 12-5.373 12-12s-5.373-12-11.368-11.36z" />
      </svg>
    </button>

    <!-- Full Logo-Only State with Interactive Reduce Control -->
    <div v-else class="relative group flex items-center">
      <button
        type="button"
        class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container-highest shadow-sm flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity z-10"
        title="Réduire le bouton WhatsApp"
        aria-label="Réduire le bouton WhatsApp"
        @click.stop.prevent="isReduced = true"
      >
        <span class="material-symbols-outlined text-[13px] leading-none">remove</span>
      </button>

      <a
        class="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] hover:bg-[#1ebe5d] hover:scale-105 transition-all"
        href="https://wa.me/25767405262?text=Bonjour%20EPI%20Electronics,%20je%20souhaite%20un%20devis"
        rel="noopener"
        target="_blank"
        title="WhatsApp Direct (+257 67 40 52 62)"
        aria-label="Contacter sur WhatsApp"
      >
        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.556 4.122 1.527 5.853l-1.527 5.574 5.712-1.498c1.682.912 3.606 1.431 5.656 1.431 6.627 0 12-5.373 12-12s-5.373-12-11.368-11.36z" />
        </svg>
      </a>
    </div>
  </aside>
</template>
