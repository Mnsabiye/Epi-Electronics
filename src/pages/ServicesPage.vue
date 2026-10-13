<script setup>
import { ref } from 'vue'

const auditName = ref('')
const auditOrg = ref('')
const auditPhone = ref('')
const auditCity = ref('Bujumbura (Mairie)')
const auditNeed = ref('Audit complet infrastructure & réseau')
const auditSubmitted = ref(false)

function selectSlaPlan(planName) {
  auditNeed.value = `Souscription Contrat de maintenance : ${planName}`
  const el = document.getElementById('audit-express')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function submitAuditForm() {
  if (!auditName.value.trim() || !auditOrg.value.trim() || !auditPhone.value.trim()) return
  auditSubmitted.value = true
  const msg = `Bonjour EPI Electronics (Services IT & Audit),\n*Contact:* ${auditName.value}\n*Organisation:* ${auditOrg.value}\n*Téléphone:* ${auditPhone.value}\n*Localisation:* ${auditCity.value}\n*Besoin:* ${auditNeed.value}`
  window.open(`https://wa.me/25767405262?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
}
</script>

<template>
  <main class="w-full pt-16 bg-background min-h-screen">
    <div class="flex flex-col w-full">
      <!-- SECTION HERO: Services & Solutions IT -->
      <section class="relative w-full bg-surface-container-lowest pt-12 pb-20 border-b border-surface-container overflow-hidden">
        <!-- Ambient tech glow accents -->
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            <div class="lg:col-span-7 flex flex-col items-start">
              <h1 class="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary font-extrabold tracking-tight mb-5 leading-tight">
                Infrastructure IT de Haute Performance, Zéro Interruption.
              </h1>
              <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                Nous concevons, sécurisons et maintenons les systèmes d'information critiques des institutions financières, ONG internationales et entreprises leaders au Burundi.
              </p>
              <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  class="inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md px-6 py-3 rounded-lg shadow-sm transition-all font-semibold"
                  href="#audit-express"
                >
                  <span class="material-symbols-outlined text-lg">analytics</span>
                  <span>Demander un Diagnostic Gratuit</span>
                </a>
                <a
                  class="inline-flex items-center justify-center gap-2 bg-surface-container-lowest border border-surface-container hover:bg-surface-container-low text-on-surface font-label-md text-label-md px-5 py-3 rounded-lg transition-all font-semibold"
                  href="#formules-sla"
                >
                  <span class="material-symbols-outlined text-lg text-primary">verified_user</span>
                  <span>Consulter les Formules</span>
                </a>
              </div>

              <div class="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-surface-container w-full max-w-xl">
                <div>
                  <span class="font-headline-md text-headline-md font-bold text-primary block tracking-tight">99.8%</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Disponibilité garantie</span>
                </div>
                <div>
                  <span class="font-headline-md text-headline-md font-bold text-primary block tracking-tight">&lt; 30 min</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Escalade d'Urgence</span>
                </div>
                <div>
                  <span class="font-headline-md text-headline-md font-bold text-primary block tracking-tight">100%</span>
                  <span class="font-body-sm text-body-sm text-on-surface-variant">Conformité OBR</span>
                </div>
              </div>
            </div>

            <!-- Right Column: Visual Card -->
            <div class="lg:col-span-5">
              <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container border border-surface-container shadow-sm">
                <img
                  alt="Centre de supervision réseau et serveurs informatiques professionnels à Bujumbura"
                  class="w-full h-full object-cover"
                  src="/assets/img/stitch/11-modern-telecommunications-and-it-server.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: NOS TROIS DOMAINES D'INTERVENTION -->
      <section class="w-full py-20 bg-background">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
          <div class="max-w-2xl mb-12">
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold tracking-tight">
              Domaines d'Intervention
            </h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">
              Des solutions bout-en-bout pensées pour la stabilité durable de vos activités au Burundi.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Domaine 01 -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border border-surface-container hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div class="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 bg-surface-container">
                  <img
                    alt="Distribution et équipement de parcs informatiques au Burundi"
                    class="w-full h-full object-cover"
                    src="/assets/img/stitch/12-warehouse-and-it-procurement-supply-chai.jpg"
                  />
                </div>
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Distribution &amp; Déploiement
                </h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-5 leading-relaxed">
                  Fourniture agréée de serveurs, stations de travail et onduleurs d'entreprise avec certification constructeur directe.
                </p>
                <ul class="space-y-2.5 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Partenariat officiel HP, Dell, Lenovo, APC</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Facturation certifiée avec dédouanement OBR</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Installation système et préconfiguration sur site</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
                <span class="text-on-surface-variant">Disponibilité stock : <strong>Sous 24h</strong></span>
                <router-link to="/services/distribution" class="font-bold text-primary hover:underline inline-flex items-center gap-1">
                  <span>Détails</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </router-link>
              </div>
            </div>

            <!-- Domaine 02 -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border border-surface-container hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div class="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 bg-surface-container">
                  <img
                    alt="Maintenance préventive et infogérance matérielle à Bujumbura"
                    class="w-full h-full object-cover"
                    src="/assets/img/stitch/13-it-systems-administrator-and-hardware-re.jpg"
                  />
                </div>
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Maintenance Préventive &amp; Infogérance
                </h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-5 leading-relaxed">
                  Suivi préventif rigoureux pour éliminer les interruptions coûteuses et prolonger la longévité de votre infrastructure.
                </p>
                <ul class="space-y-2.5 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Engagements de délais d'intervention garantis</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Dépoussiérage thermique et tests de composants</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Prêt d'équipement de secours sous 3h</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
                <span class="text-on-surface-variant">Matériel relais : <strong>Inclus Pro</strong></span>
                <router-link to="/services/maintenance" class="font-bold text-primary hover:underline inline-flex items-center gap-1">
                  <span>Détails</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </router-link>
              </div>
            </div>

            <!-- Domaine 03 -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border border-surface-container hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div class="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 bg-surface-container">
                  <img
                    alt="Câblage structuré fibre et baie de serveurs sécurisée"
                    class="w-full h-full object-cover"
                    src="/assets/img/stitch/14-fiber-optic-structured-network-cabling-i.jpg"
                  />
                </div>
                <h3 class="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                  Réseaux, Sécurité &amp; Cloud / Web
                </h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-5 leading-relaxed">
                  Architecture sécurisée des flux réseau, interconnexion d'agences et développement d'applications web d'entreprise.
                </p>
                <ul class="space-y-2.5 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Câblage Cat6/Fibre certifié testeur Fluke</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Pare-feu Cisco/Fortinet avec VPN multi-sites</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check</span>
                    <span>Plateformes web, Microsoft 365 &amp; Cloud privé</span>
                  </li>
                </ul>
              </div>
              <div class="pt-4 border-t border-surface-container flex items-center justify-between font-label-sm text-label-sm">
                <span class="text-on-surface-variant">Certification : <strong>Fluke Networks</strong></span>
                <router-link to="/services/web" class="font-bold text-primary hover:underline inline-flex items-center gap-1">
                  <span>Détails</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: FORMULES DE MAINTENANCE -->
      <section id="formules-sla" class="w-full py-20 bg-surface-container-low border-y border-surface-container">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest block mb-2">
                Contrats de Performance
              </span>
              <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold tracking-tight">
                Formules de Maintenance
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                Engagements contractuels stricts adaptés à la taille et au niveau critique de votre organisation.
              </p>
            </div>
            <div class="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg text-primary font-label-sm text-label-sm">
              <span class="material-symbols-outlined text-base">receipt_long</span>
              <span>Tarifs en BIF HTVA • Facturation trimestrielle/annuelle</span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <!-- Plan 1: Standard Support -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm flex flex-col justify-between">
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    PME &amp; Bureaux
                  </span>
                  <span class="bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm">
                    5 - 15 postes
                  </span>
                </div>
                <h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-2">Standard Support</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">
                  Assistance réactive et maintenance préventive pour structures à parc modéré.
                </p>
                <div class="bg-surface-container-low p-4 rounded-lg mb-6">
                  <div class="flex items-baseline gap-1">
                    <span class="font-label-sm text-label-sm text-on-surface-variant">Dès</span>
                    <span class="font-headline-md text-headline-md font-bold text-primary font-code-num">380 000</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">BIF / mois</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                    Intervention planifiée 5j/7
                  </span>
                </div>
                <ul class="space-y-3 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Intervention sous 4h ouvrées</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>1 visite préventive par mois</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Téléassistance à distance illimitée</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Mises à jour et antivirus</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                class="w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md text-center rounded-lg transition-colors font-semibold"
                @click="selectSlaPlan('Standard Support (380 000 BIF/mois)')"
              >
                Choisir Standard
              </button>
            </div>

            <!-- Plan 2: Pro Entreprise -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border-2 border-primary shadow-md relative flex flex-col justify-between">
              <div class="absolute -top-3 left-6 bg-primary text-on-primary px-3 py-0.5 rounded-full font-label-sm text-label-sm font-bold shadow-sm">
                RECOMMANDÉ
              </div>
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4 mt-2">
                  <span class="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Entreprises Établies
                  </span>
                  <span class="bg-primary-container/20 text-primary px-2 py-0.5 rounded font-label-sm text-label-sm font-bold">
                    15 - 50 postes
                  </span>
                </div>
                <h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-2">Pro Entreprise</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">
                  Pour les structures où chaque indisponibilité nuit directement aux opérations.
                </p>
                <div class="bg-surface-container-low p-4 rounded-lg mb-6">
                  <div class="flex items-baseline gap-1">
                    <span class="font-label-sm text-label-sm text-on-surface-variant">Dès</span>
                    <span class="font-headline-md text-headline-md font-bold text-primary font-code-num">890 000</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">BIF / mois</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-primary block mt-1 font-medium">
                    Priorité niveau 1 &amp; matériel de secours
                  </span>
                </div>
                <ul class="space-y-3 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Intervention garantie sous 2h</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>2 visites préventives mensuelles</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Supervision active réseau et serveurs</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Prêt de PC relais sous 3h inclus</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Sauvegardes et maintenance onduleurs</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                class="w-full py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md text-center rounded-lg shadow-sm transition-all font-semibold"
                @click="selectSlaPlan('Pro Entreprise (890 000 BIF/mois)')"
              >
                Activer Contrat Pro
              </button>
            </div>

            <!-- Plan 3: Mission Critique -->
            <div class="bg-surface-container-lowest rounded-xl p-6 border border-surface-container shadow-sm flex flex-col justify-between">
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Banques &amp; ONG
                  </span>
                  <span class="bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-label-sm text-label-sm">
                    50+ postes / Multi-sites
                  </span>
                </div>
                <h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-2">Mission Critique</h3>
                <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">
                  Haute disponibilité et astreinte continue pour environnements réglementés.
                </p>
                <div class="bg-surface-container-low p-4 rounded-lg mb-6">
                  <div class="flex items-baseline gap-1">
                    <span class="font-label-sm text-label-sm text-on-surface-variant">Sur devis dès</span>
                    <span class="font-headline-md text-headline-md font-bold text-primary font-code-num">2 400 000</span>
                    <span class="font-label-sm text-label-sm text-on-surface-variant font-semibold">BIF / mois</span>
                  </div>
                  <span class="font-label-sm text-label-sm text-on-surface-variant block mt-1">
                    Astreinte 24h/24 &amp; 7j/7 avec ingénieur dédié
                  </span>
                </div>
                <ul class="space-y-3 font-body-sm text-body-sm text-on-surface mb-6">
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Intervention sous 45 minutes</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Technicien résident ou astreinte permanente</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Couverture sur l'ensemble du territoire national</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-base">check</span>
                    <span>Stock de pièces réservé en entrepôt</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                class="w-full py-2.5 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md text-center rounded-lg transition-colors font-semibold"
                @click="selectSlaPlan('Mission Critique (2 400 000+ BIF/mois)')"
              >
                Consulter la Direction
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: PARTENAIRES DE RÉFÉRENCE AU BURUNDI -->
      <section class="w-full py-20 bg-background">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
          <div class="max-w-2xl mb-12">
            <span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest block mb-2">
              Retours d'Expérience
            </span>
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold tracking-tight">
              Partenaires de Référence au Burundi
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
              <p class="font-body-md text-body-md text-on-surface mb-6 italic leading-relaxed">
                « Lors de l’ouverture de notre agence à Gitega, EPI Electronics a géré le réseau et les serveurs sans le moindre retard. Facturation OBR claire et accompagnement irréprochable. »
              </p>
              <div class="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-title-md font-bold text-primary text-sm">
                  DN
                </div>
                <div>
                  <h4 class="font-title-md text-sm text-primary font-bold">Désiré Nkurunziza</h4>
                  <p class="font-body-sm text-[12px] text-on-surface-variant">DSI • Institution Financière, Bujumbura</p>
                </div>
              </div>
            </div>

            <div class="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
              <p class="font-body-md text-body-md text-on-surface mb-6 italic leading-relaxed">
                « Le contrat Pro nous assure une totale sérénité. En cas de dysfonctionnement critique, leurs techniciens interviennent dans l'heure avec une solution de secours. »
              </p>
              <div class="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-title-md font-bold text-primary text-sm">
                  CM
                </div>
                <div>
                  <h4 class="font-title-md text-sm text-primary font-bold">Claire Mukamana</h4>
                  <p class="font-body-sm text-[12px] text-on-surface-variant">Coordination • ONG Internationale Humanitaire</p>
                </div>
              </div>
            </div>

            <div class="bg-surface-container-lowest p-6 rounded-xl border border-surface-container shadow-sm flex flex-col justify-between">
              <p class="font-body-md text-body-md text-on-surface mb-6 italic leading-relaxed">
                « La maintenance préventive mensuelle a réduit nos pannes de bureau de plus de 80%. L'équipe est ponctuelle, polie et techniquement très rigoureuse. »
              </p>
              <div class="flex items-center gap-3 pt-4 border-t border-surface-container">
                <div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-title-md font-bold text-primary text-sm">
                  AB
                </div>
                <div>
                  <h4 class="font-title-md text-sm text-primary font-bold">Audry Baranyikwa</h4>
                  <p class="font-body-sm text-[12px] text-on-surface-variant">Direction Générale • Logistique &amp; Transit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION: AUDIT EXPRESS & DIAGNOSTIC GRATUIT -->
      <section id="audit-express" class="w-full py-20 bg-surface-container-lowest border-t border-surface-container">
        <div class="max-w-[1440px] mx-auto px-gutter-mobile md:px-gutter">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-6 flex flex-col">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm w-fit mb-4">
                <span class="material-symbols-outlined text-sm">security</span>
                <span>Audit Gratuit sans engagement</span>
              </div>
              <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold tracking-tight mb-4">
                Évaluez la Résilience de Votre Système d'Information
              </h2>
              <p class="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Nos ingénieurs certifiés examinent vos armoires réseaux, sauvegardes, sécurité périmétrique et onduleurs pour vous remettre un rapport d'audit clair sous 48h.
              </p>
              <div class="space-y-4 font-body-sm text-body-sm text-on-surface mb-8">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                  <span>Audit des baies de serveurs, switchs et liaisons fibre optique</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                  <span>Contrôle d'autonomie des onduleurs et plans de secours électrique</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-[#10b981] text-lg">check_circle</span>
                  <span>Vérification des accès pare-feu et conformité des licences</span>
                </div>
              </div>
              <div class="flex items-center gap-6 pt-6 border-t border-surface-container font-label-sm text-label-sm text-on-surface-variant">
                <div>
                  <span class="block font-bold text-primary">Bujumbura (Siège)</span>
                  <span>Boulevard de l'Uprona, Rohero I</span>
                </div>
                <div>
                  <span class="block font-bold text-primary">Ligne Directe</span>
                  <span>+257 67 40 52 62</span>
                </div>
              </div>
            </div>

            <div class="lg:col-span-6 bg-surface-container-low p-8 rounded-2xl border border-surface-container">
              <h3 class="font-headline-sm text-headline-sm font-bold text-primary mb-2">
                Demande de Diagnostic
              </h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Renseignez vos coordonnées, un ingénieur vous contactera sous 2h ouvrées.
              </p>
              <form class="space-y-4" @submit.prevent="submitAuditForm">
                <div>
                  <label class="block font-label-md text-label-md text-on-surface mb-1">
                    Nom complet &amp; Fonction *
                  </label>
                  <input
                    v-model="auditName"
                    class="w-full h-11 px-3 bg-surface-container-lowest border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                    placeholder="Ex: Jean-Marie Ndayishimiye"
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface mb-1">
                    Organisation ou Société *
                  </label>
                  <input
                    v-model="auditOrg"
                    class="w-full h-11 px-3 bg-surface-container-lowest border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                    placeholder="Ex: Banque, Agence, ONG"
                    required
                    type="text"
                  />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-1">
                      Téléphone WhatsApp *
                    </label>
                    <input
                      v-model="auditPhone"
                      class="w-full h-11 px-3 bg-surface-container-lowest border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                      placeholder="+257 67 ..."
                      required
                      type="tel"
                    />
                  </div>
                  <div>
                    <label class="block font-label-md text-label-md text-on-surface mb-1">
                      Localisation
                    </label>
                    <select
                      v-model="auditCity"
                      class="w-full h-11 px-3 bg-surface-container-lowest border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                    >
                      <option>Bujumbura (Mairie)</option>
                      <option>Gitega</option>
                      <option>Ngozi</option>
                      <option>Autre Province</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block font-label-md text-label-md text-on-surface mb-1">
                    Objet de l'intervention
                  </label>
                  <input
                    v-model="auditNeed"
                    class="w-full h-11 px-3 bg-surface-container-lowest border border-surface-container rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container"
                    type="text"
                  />
                </div>
                <button
                  class="w-full py-3 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all font-bold flex items-center justify-center gap-2"
                  type="submit"
                >
                  <span class="material-symbols-outlined text-lg">send</span>
                  <span>Planifier l'Audit Technique</span>
                </button>
                <div
                  v-if="auditSubmitted"
                  class="p-3 rounded-lg bg-[#dcfce7] text-[#15803d] text-xs font-medium text-center"
                >
                  Demande enregistrée. Notre ingénieur prendra contact avec vous sans délai.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
