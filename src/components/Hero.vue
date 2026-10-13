<script setup>
</script>

<template>
  <div>
    <!-- HERO PAYSAGE EN ARRIÈRE-PLAN (FULL-BLEED LANDSCAPE BACKGROUND) -->
    <section class="relative min-h-[540px] lg:min-h-[600px] flex items-center py-space-xl overflow-hidden bg-[#07162c]">
      <!-- Landscape Background Picture with WebP + Progressive JPEG Fallback -->
      <picture class="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <source srcset="/assets/img/hero-coworking-sunset.webp" type="image/webp" />
        <img
          src="/assets/img/hero-coworking-sunset.jpg"
          alt="Espace de travail moderne équipé par EPI Electronics à Bujumbura au coucher du soleil"
          class="w-full h-full object-cover object-center blur-[2.5px] scale-[1.03] transform transition-transform"
          fetchpriority="high"
        />
      </picture>

      <!-- Directional Contrast Overlay to keep Left Text Crisp and Right Landscape Clear -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-[#061429]/92 via-[#061429]/72 to-[#061429]/20 pointer-events-none"
      ></div>

      <div class="relative z-10 max-w-[1440px] w-full mx-auto px-gutter-mobile md:px-gutter">
        <div class="max-w-2xl flex flex-col items-start">
          <h1 class="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-white tracking-tight mb-space-lg leading-tight drop-shadow-xs">
            La Révolution Technologique au Burundi
          </h1>

          <div class="flex flex-wrap items-center gap-3 mb-space-xl">
            <router-link
              to="/demandez-un-devis"
              class="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container font-label-md px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <span>Demander un devis</span>
              <span class="material-symbols-outlined text-lg">arrow_forward</span>
            </router-link>

            <router-link
              to="/produits"
              class="inline-flex items-center gap-2 bg-white/12 hover:bg-white/20 backdrop-blur-md text-white font-label-md px-5 py-3 rounded-xl border border-white/25 transition-all"
            >
              <span class="material-symbols-outlined text-base">inventory_2</span>
              <span>Voir le catalogue</span>
            </router-link>
          </div>

          <!-- Institutional Trust Metrics -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-space-md border-t border-white/15">
            <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div class="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
                <span class="material-symbols-outlined text-lg">verified_user</span>
              </div>
              <div class="flex flex-col">
                <span class="font-headline-sm text-white font-bold leading-tight">+500</span>
                <span class="font-label-sm text-xs text-white/80">Entreprises, ONG &amp; Banques</span>
              </div>
            </div>

            <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div class="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
                <span class="material-symbols-outlined text-lg">receipt_long</span>
              </div>
              <div class="flex flex-col">
                <span class="font-headline-sm text-white font-bold leading-tight">100%</span>
                <span class="font-label-sm text-xs text-white/80">Conforme OBR &amp; NIF (BIF)</span>
              </div>
            </div>

            <div class="flex items-center gap-2.5 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
              <div class="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0">
                <span class="material-symbols-outlined text-lg">local_shipping</span>
              </div>
              <div class="flex flex-col">
                <span class="font-headline-sm text-white font-bold leading-tight">24/48h</span>
                <span class="font-label-sm text-xs text-white/80">Livraison provinciale</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION SOLUTIONS (3 CATÉGORIES ÉPURÉES) -->
    <section class="py-space-xl bg-surface-container-low/60 border-y border-surface-container-highest/40">
      <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
        <div class="mb-space-lg">
          <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight font-bold">
            Solutions
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <!-- 1: Laptops -->
          <router-link
            to="/categorie/ordinateurs-portables-stations"
            class="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div class="w-full h-44 rounded-xl overflow-hidden mb-space-md bg-surface-container">
                <img
                  alt="Laptops"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/assets/img/stitch/03-laptops-b2b.jpg"
                />
              </div>
              <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-primary text-lg">laptop_mac</span>
                <h3 class="font-title-md text-title-md text-on-surface font-bold">Laptops</h3>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-sm font-light">
                Parcs informatiques d'entreprise HP, Dell, Lenovo et Apple prêts au déploiement.
              </p>
            </div>
            <div class="font-label-md text-xs text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Découvrir</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </router-link>

          <!-- 2: Impression -->
          <router-link
            to="/categorie/imprimantes-scanners-pro"
            class="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div class="w-full h-44 rounded-xl overflow-hidden mb-space-md bg-surface-container">
                <img
                  alt="Impression"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/assets/img/stitch/04-impression-bureau.jpg"
                />
              </div>
              <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-primary text-lg">print</span>
                <h3 class="font-title-md text-title-md text-on-surface font-bold">Impression</h3>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-sm font-light">
                Systèmes laser et réservoirs EcoTank économiques avec consommables d'origine.
              </p>
            </div>
            <div class="font-label-md text-xs text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Découvrir</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </router-link>

          <!-- 3: Réseaux -->
          <router-link
            to="/categorie/reseau-securite-entreprise"
            class="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container-highest/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div class="w-full h-44 rounded-xl overflow-hidden mb-space-md bg-surface-container">
                <img
                  alt="Réseaux"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src="/assets/img/stitch/05-r-seaux-amp-nergie.jpg"
                />
              </div>
              <div class="flex items-center gap-2 mb-1">
                <span class="material-symbols-outlined text-primary text-lg">router</span>
                <h3 class="font-title-md text-title-md text-on-surface font-bold">Réseaux</h3>
              </div>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-space-sm font-light">
                Switches, routeurs d'entreprise Cisco et protection de puissance APC Smart-UPS.
              </p>
            </div>
            <div class="font-label-md text-xs text-primary font-semibold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Découvrir</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
