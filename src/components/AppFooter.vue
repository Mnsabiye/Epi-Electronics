<script setup>
</script>

<template>
  <footer class="w-full bg-surface-container-low text-on-surface-variant pt-space-xl pb-space-lg shadow-[0_-1px_4px_rgba(0,0,0,0.02)] border-t border-surface-container-highest/40 mt-auto">
    <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg mb-space-xl">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <router-link to="/" class="inline-block mb-space-md group">
            <img
              src="/assets/img/epi-logo-full.png"
              alt="EPI Electronics - Computers devices and Equipments"
              class="h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </router-link>
          <p class="font-body-sm text-body-sm mb-space-md text-on-surface-variant">
            Leader de la distribution informatique, équipements télécoms, matériel réseau d'entreprise et solutions numériques en République du Burundi.
          </p>
          <div class="flex items-center gap-space-xs text-primary font-semibold">
            <span class="material-symbols-outlined text-sm">verified</span>
            <span class="font-label-sm text-label-sm">Fournisseur Agréé Entreprises &amp; ONG</span>
          </div>
        </div>

        <!-- Partenaires Certifiés -->
        <div>
          <h4 class="font-title-md text-title-md text-on-surface mb-space-md font-bold">Partenaires Certifiés</h4>
          <ul class="space-y-space-xs font-body-sm text-body-sm">
            <li>
              <router-link to="/produits?brand=HP" class="text-on-surface-variant hover:text-primary transition-colors">
                HP Inc. &amp; Hewlett Packard Ent.
              </router-link>
            </li>
            <li>
              <router-link to="/produits?brand=Dell" class="text-on-surface-variant hover:text-primary transition-colors">
                Dell Technologies Direct
              </router-link>
            </li>
            <li>
              <router-link to="/produits?brand=Lenovo" class="text-on-surface-variant hover:text-primary transition-colors">
                Lenovo Authorized Partner
              </router-link>
            </li>
            <li>
              <router-link to="/produits?brand=Epson" class="text-on-surface-variant hover:text-primary transition-colors">
                Epson Pro Print Solutions
              </router-link>
            </li>
            <li>
              <router-link to="/produits?brand=Cisco" class="text-on-surface-variant hover:text-primary transition-colors">
                Cisco Networking &amp; Meraki
              </router-link>
            </li>
            <li>
              <router-link to="/produits?brand=APC" class="text-on-surface-variant hover:text-primary transition-colors">
                APC by Schneider Electric
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Navigation Rapide -->
        <div>
          <h4 class="font-title-md text-title-md text-on-surface mb-space-md font-bold">Navigation Rapide</h4>
          <ul class="space-y-space-xs font-body-sm text-body-sm">
            <li>
              <router-link to="/produits" class="hover:text-primary transition-colors">
                Catalogue Matériel
              </router-link>
            </li>
            <li>
              <router-link to="/demandez-un-devis" class="hover:text-primary transition-colors">
                Demande de Devis
              </router-link>
            </li>
            <li>
              <router-link to="/services" class="hover:text-primary transition-colors">
                Maintenance &amp; Infogérance
              </router-link>
            </li>
            <li>
              <router-link to="/services/distribution" class="hover:text-primary transition-colors">
                Distribution &amp; Équipement
              </router-link>
            </li>
            <li>
              <router-link to="/services/maintenance" class="hover:text-primary transition-colors">
                Service Après-Vente (SAV)
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Siège & Showroom -->
        <div>
          <h4 class="font-title-md text-title-md text-on-surface mb-space-md font-bold">Siège &amp; Showroom</h4>
          <div class="space-y-space-sm font-body-sm text-body-sm">
            <div>
              <span class="font-label-sm text-label-sm text-primary uppercase block font-bold">Bujumbura (Siège)</span>
              <p class="text-on-surface-variant">Boulevard de l'Uprona, Rohero I</p>
            </div>
          </div>
        </div>

        <!-- Heures & Assistance -->
        <div>
          <h4 class="font-title-md text-title-md text-on-surface mb-space-md font-bold">Heures &amp; Assistance</h4>
          <div class="space-y-space-xs font-body-sm text-body-sm">
            <p class="text-on-surface-variant">Lun - Ven: 08h00 - 18h00 (Sans interruption)</p>
            <p class="text-on-surface-variant">Samedi: 08h30 - 13h30</p>
            <p class="font-label-md text-label-md text-primary mt-space-sm font-bold">
              Service Client: <a href="tel:+25767405262" class="hover:underline">+257 67 40 52 62</a>
            </p>
            <p class="text-on-surface-variant">
              Email: <a href="mailto:commercial@epielectronics.bi" class="hover:text-primary">commercial@epielectronics.bi</a>
            </p>
            <div class="mt-space-md pt-space-xs">
              <span class="inline-block px-space-sm py-1 bg-surface-container rounded font-label-sm text-label-sm text-primary font-semibold">
                Livraison Provinciale Sécurisée
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Legal & OBR Bar -->
      <div class="pt-space-md border-t border-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm">
        <p>© {{ new Date().getFullYear() }} EPI Electronics Burundi. Tous droits réservés. Registre de Commerce Bujumbura.</p>
        <p class="text-on-surface-variant">
          Tarifs affichés en BIF (Francs Burundais) avec options HTVA et TTC conformes OBR.
        </p>
      </div>
    </div>
  </footer>
</template>
