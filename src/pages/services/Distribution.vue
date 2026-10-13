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
        <span class="text-primary font-bold">Distribution &amp; Équipement de Parcs</span>
      </nav>

      <!-- Hero Section -->
      <section class="bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl border border-surface-container-highest/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div class="lg:col-span-7 space-y-space-md">
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight">
            Distribution &amp; Approvisionnement de Parcs Informatiques
          </h1>
          <p class="font-body-lg text-body-md text-on-surface-variant leading-relaxed">
            Approvisionnement massif et sécurisé de matériel informatique officiel pour banques, ONG internationales, ministères et entreprises au Burundi, avec facturation normalisée OBR et livraison multi-sites.
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <router-link
              to="/demandez-un-devis"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
            >
              <span>Demander un devis personnalisé</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </router-link>
            <router-link
              to="/produits"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container text-primary font-label-md text-xs font-bold hover:bg-surface-container-high transition-all"
            >
              <span class="material-symbols-outlined text-base">inventory_2</span>
              <span>Consulter le Catalogue</span>
            </router-link>
          </div>
        </div>
        <div class="lg:col-span-5">
          <img
            alt="Distribution et équipement de parcs informatiques au Burundi"
            src="/assets/img/stitch/12-warehouse-and-it-procurement-supply-chai.jpg"
            class="w-full h-72 object-cover rounded-2xl shadow-md"
          />
        </div>
      </section>

      <!-- Key Pillars -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">verified</span>
          <h2 class="font-title-md text-on-surface font-bold">Canaux Constructeurs Agréés</h2>
          <p class="font-body-sm text-on-surface-variant">
            Traçabilité intégrale des numéros de série HP, Dell, Lenovo, Epson, Cisco et APC avec certificats d'origine et garanties internationales valables au Burundi.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">receipt_long</span>
          <h2 class="font-title-md text-on-surface font-bold">Dossiers Administratifs Complets</h2>
          <p class="font-body-sm text-on-surface-variant">
            Factures proforma et définitives conformes OBR (HTVA / TTC / Exonération ONG &amp; diplomatique), attestations fiscales, bordereaux de livraison et PV de réception.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">settings_suggest</span>
          <h2 class="font-title-md text-on-surface font-bold">Préparation &amp; Déploiement</h2>
          <p class="font-body-sm text-on-surface-variant">
            Pré-installation et configuration des systèmes (Windows 11 Pro, outils bureautiques, sécurité réseau) en atelier avant livraison dans vos bureaux.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
