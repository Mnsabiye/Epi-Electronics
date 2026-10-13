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
        <span class="text-primary font-bold">Maintenance Préventive &amp; Infogérance</span>
      </nav>

      <!-- Hero Section -->
      <section class="bg-surface-container-lowest rounded-3xl p-space-lg md:p-space-xl border border-surface-container-highest/60 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
        <div class="lg:col-span-7 space-y-space-md">
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight">
            Maintenance Préventive &amp; Infogérance de Parcs IT
          </h1>
          <p class="font-body-lg text-body-md text-on-surface-variant leading-relaxed">
            Maintien en conditions opérationnelles pour éliminer les arrêts de travail coûteux et prolonger la durée de vie de vos investissements informatiques au Burundi.
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <router-link
              to="/demandez-un-devis"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold shadow-sm hover:bg-primary-container transition-all"
            >
              <span>Demander un Contrat de Maintenance</span>
              <span class="material-symbols-outlined text-base">arrow_forward</span>
            </router-link>
            <a
              href="https://wa.me/25767405262?text=Bonjour%20EPI%20Electronics,%20urgence%20SAV%20/%20Maintenance%20IT"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#dcfce7] text-[#15803d] hover:bg-[#22c55e] hover:text-white font-label-md text-xs font-bold transition-all"
            >
              <span class="material-symbols-outlined text-base">chat</span>
              <span>Assistance Urgente WhatsApp</span>
            </a>
          </div>
        </div>
        <div class="lg:col-span-5">
          <img
            alt="Maintenance préventive et infogérance matérielle à Bujumbura"
            src="/assets/img/stitch/13-it-systems-administrator-and-hardware-re.jpg"
            class="w-full h-72 object-cover rounded-2xl shadow-md"
          />
        </div>
      </section>

      <!-- Key Pillars -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">timer</span>
          <h2 class="font-title-md text-on-surface font-bold">Délais d'Intervention Garantis</h2>
          <p class="font-body-sm text-on-surface-variant">
            Intervention garantie sous 2h ouvrées et mise à disposition rapide d'équipement de secours en cas d'immobilisation en atelier.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">cleaning_services</span>
          <h2 class="font-title-md text-on-surface font-bold">Visites Préventives Périodiques</h2>
          <p class="font-body-sm text-on-surface-variant">
            Dépoussiérage thermique complet, remplacement de pâte thermique, diagnostic SMART des SSD/disques et test de charge des batteries d'onduleurs APC.
          </p>
        </div>
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 shadow-sm space-y-2">
          <span class="material-symbols-outlined text-primary text-3xl">memory</span>
          <h2 class="font-title-md text-on-surface font-bold">Pièces d'Origine en Stock</h2>
          <p class="font-body-sm text-on-surface-variant">
            Batteries HP/Dell/Lenovo, chargeurs certifiés, barrettes DDR4/DDR5, SSD NVMe et kits de maintenance d'imprimantes LaserJet &amp; EcoTank disponibles sur place.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
