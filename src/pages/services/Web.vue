<script setup>
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter py-space-xl space-y-space-xl">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-label-sm text-xs text-on-surface-variant flex-wrap">
        <router-link to="/" class="hover:text-primary transition-colors">Accueil</router-link>
        <span>/</span>
        <router-link to="/services" class="hover:text-primary transition-colors">Services</router-link>
        <span>/</span>
        <span class="text-primary font-bold">Réseaux, Sécurité &amp; Web</span>
      </nav>

      <!-- Hero Section -->
      <section class="bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl border border-surface-container-highest/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div class="lg:col-span-7 space-y-space-md">
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight">
            Réseaux d'Entreprise, Cybersécurité &amp; Plateformes Digitales
          </h1>
          <p class="font-body-lg text-body-md text-on-surface-variant leading-relaxed">
            Conception et déploiement d'infrastructures réseau haute disponibilité (Cat 6A/Fibre, Cisco, MikroTik, Fortinet) et développement de portails web et applicatifs métiers sécurisés au Burundi.
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <router-link
              to="/services#audit-express"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
            >
              <span>Planifier un Audit Réseau / SI</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </router-link>
            <router-link
              to="/demandez-un-devis"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container text-primary font-label-md text-xs font-bold hover:bg-surface-container-high transition-all"
            >
              <span class="material-symbols-outlined text-base">request_quote</span>
              <span>Chiffrer un Projet</span>
            </router-link>
          </div>
        </div>
        <div class="lg:col-span-5">
          <img
            alt="Câblage structuré fibre et baie de serveurs sécurisée"
            src="/assets/img/stitch/14-fiber-optic-structured-network-cabling-i.jpg"
            class="w-full h-72 object-cover rounded-2xl shadow-md"
          />
        </div>
      </section>

      <!-- Key Pillars -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">settings_ethernet</span>
          <h2 class="font-title-md text-on-surface font-bold">Câblage Structuré &amp; Baies 19"</h2>
          <p class="font-body-sm text-on-surface-variant">
            Installation propre de baies de brassage, tirage cuivre Cat6/6A et fibre optique, étiquetage normalisé et rapport de certification Fluke Networks.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">shield_lock</span>
          <h2 class="font-title-md text-on-surface font-bold">Interconnexion VPN &amp; Pare-Feu</h2>
          <p class="font-body-sm text-on-surface-variant">
            Segmentation VLAN, pare-feu Cisco/Fortinet/MikroTik, bascule automatique double FAI (Failover 4G/Fibre) et interconnexion sécurisée Bujumbura - Provinces.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">cloud_done</span>
          <h2 class="font-title-md text-on-surface font-bold">Portails Web &amp; Cloud Hybride</h2>
          <p class="font-body-sm text-on-surface-variant">
            Développement d'applications web institutionnelles, déploiement Microsoft 365 / Google Workspace avec nom de domaine `.bi` et sauvegardes automatisées.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
