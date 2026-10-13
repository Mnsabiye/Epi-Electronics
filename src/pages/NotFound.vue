<script setup>
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen flex items-center justify-center px-gutter">
    <div class="max-w-lg w-full bg-surface-container-lowest rounded-3xl p-space-xl text-center shadow-sm border border-surface-container-highest/60 space-y-space-md">
      <div class="w-16 h-16 rounded-2xl bg-surface-container text-primary flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-4xl">explore_off</span>
      </div>
      <span class="font-code-num text-xs uppercase tracking-widest text-primary font-bold block">
        Erreur 404 • Portail EPI Electronics
      </span>
      <h1 class="font-headline-md text-on-surface font-bold">
        Cette page est introuvable
      </h1>
      <p class="font-body-sm text-on-surface-variant">
        L'adresse demandée n'existe pas ou a été déplacée.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
        >
          <span class="material-symbols-outlined text-base">home</span>
          <span>Retour à l'Accueil</span>
        </router-link>
        <router-link
          to="/produits"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-primary font-label-md text-xs font-bold hover:bg-surface-container-high transition-all"
        >
          <span class="material-symbols-outlined text-base">inventory_2</span>
          <span>Catalogue</span>
        </router-link>
      </div>
    </div>
  </main>
</template>
