<script setup>
</script>

<template>
  <!-- SERVICES IT CERTIFIÉS AÉRÉS -->
  <section id="services-section" class="py-space-xl bg-surface-container-low/60 border-t border-surface-container-highest/40">
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
      <div class="max-w-2xl mx-auto text-center mb-space-xl">
        <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-bold">
          Services
        </h2>
        <p class="font-body-md text-body-md text-on-surface-variant mt-2 font-light">
          Maintenance préventive, infogérance et accompagnement technique au Burundi.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
        <!-- Service 1: Maintenance & Infogérance -->
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
              <span class="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface mb-2">
              Maintenance &amp; Infogérance
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md font-light">
              Support technique dédié aux banques, ONG et entreprises avec délai d'intervention sous 2h.
            </p>
            <ul class="space-y-2 text-xs text-on-surface font-medium">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Intervention garantie sous 2h</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Prêt d'équipement de secours</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Visites préventives périodiques</span>
              </li>
            </ul>
          </div>
          <div class="mt-space-md pt-space-xs border-t border-surface-container-highest/40 flex items-center justify-between">
            <router-link
              to="/services/maintenance"
              class="text-primary font-label-md text-xs inline-flex items-center gap-1 font-bold hover:underline"
            >
              <span>Découvrir nos formules</span>
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </router-link>
            <a
              href="https://wa.me/25767405262?text=Bonjour%20EPI%20Electronics,%20je%20souhaite%20souscrire%20un%20contrat%20de%20maintenance%20IT"
              target="_blank"
              rel="noopener"
              class="text-xs text-[#15803d] font-semibold hover:underline"
            >
              Souscrire
            </a>
          </div>
        </div>

        <!-- Service 2: Distribution -->
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
              <span class="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface mb-2">
              Distribution &amp; Équipement
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md font-light">
              Fourniture de parcs informatiques complets, facturation normalisée et livraison sécurisée.
            </p>
            <ul class="space-y-2 text-xs text-on-surface font-medium">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Facturation conforme OBR</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Livraison sécurisée sur tout le territoire</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Certificats d'origine constructeurs</span>
              </li>
            </ul>
          </div>
          <div class="mt-space-md pt-space-xs border-t border-surface-container-highest/40 flex items-center justify-between">
            <router-link
              to="/services/distribution"
              class="text-primary font-label-md text-xs inline-flex items-center gap-1 font-bold hover:underline"
            >
              <span>Découvrir la distribution</span>
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </router-link>
            <router-link
              to="/demandez-un-devis"
              class="text-xs text-primary font-semibold hover:underline"
            >
              Demander un devis
            </router-link>
          </div>
        </div>

        <!-- Service 3: Réseaux & Systèmes -->
        <div class="bg-surface-container-lowest p-space-lg rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-md">
              <span class="material-symbols-outlined text-2xl">hub</span>
            </div>
            <h3 class="font-headline-sm text-lg font-bold text-on-surface mb-2">
              Réseaux &amp; Systèmes
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-md font-light">
              Câblage structuré certifié, fibre optique, pare-feu, VPN d'agences et solutions applicatives web.
            </p>
            <ul class="space-y-2 text-xs text-on-surface font-medium">
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Audit technique &amp; câblage structuré</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Certification des liaisons réseau</span>
              </li>
              <li class="flex items-center gap-2">
                <span class="material-symbols-outlined text-sm text-[#15803d]">check</span>
                <span>Interconnexion sécurisée de bureaux</span>
              </li>
            </ul>
          </div>
          <div class="mt-space-md pt-space-xs border-t border-surface-container-highest/40 flex items-center justify-between">
            <router-link
              to="/services/web"
              class="text-primary font-label-md text-xs inline-flex items-center gap-1 font-bold hover:underline"
            >
              <span>Solutions Réseaux &amp; Web</span>
              <span class="material-symbols-outlined text-sm">chevron_right</span>
            </router-link>
            <a
              href="https://wa.me/25767405262?text=Bonjour%20EPI%20Electronics,%20je%20souhaite%20contacter%20un%20ing%C3%A9nieur%20r%C3%A9seau"
              target="_blank"
              rel="noopener"
              class="text-xs text-[#15803d] font-semibold hover:underline"
            >
              Ingénieur Direct
            </a>
          </div>
        </div>
      </div>

      <div class="mt-space-lg text-center">
        <router-link
          to="/services"
          class="inline-flex items-center gap-2 text-primary hover:text-primary-container font-label-md text-xs font-bold bg-surface-container-lowest px-5 py-2.5 rounded-xl border border-surface-container-highest/60 shadow-sm transition-all"
        >
          <span>Voir tous nos services &amp; contrats d'assistance</span>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
