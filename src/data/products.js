import { ref } from 'vue'

// Shared Quote Batch (Lot Devis) state
export const quoteBatch = ref([])

export const addToQuoteBatch = (product, count = 1) => {
  const existing = quoteBatch.value.find(
    (item) => item.id === product.id || item.slug === product.slug
  )
  if (existing) {
    existing.qty = (existing.qty || existing.quantity || 1) + count
    existing.quantity = existing.qty
  } else {
    quoteBatch.value.push({
      id: product.id,
      slug: product.slug || product.id,
      name: product.name,
      ref: (product.ref || '').replace(/^REF:\s*/i, ''),
      price: product.price || 2500000,
      qty: count,
      quantity: count
    })
  }
}

export const removeFromQuoteBatch = (slugOrId) => {
  quoteBatch.value = quoteBatch.value.filter(
    (item) => item.id !== slugOrId && item.slug !== slugOrId
  )
}

export const clearQuoteBatch = () => {
  quoteBatch.value = []
}

export const formatBIF = (num) => {
  if (num === null || num === undefined) return 'Sur devis'
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatPrice = (price, currency = 'BIF') => {
  if (price === null || price === undefined) {
    return 'Sur devis'
  }
  return `${formatBIF(price)} ${currency}`
}

export const productCategories = {
  laptops: {
    id: 'laptops',
    slug: 'ordinateurs-portables',
    title: 'Ordinateurs Portables',
    shortTitle: 'Laptops & Stations de travail',
    badge: '18+ Modèles',
    icon: 'laptop_mac',
    description: 'Séries professionnelles HP ProBook/EliteBook, Dell Latitude, Lenovo ThinkPad & Stations de travail pour directeurs, ingénieurs et équipes terrain.',
    heroImage: '/assets/img/stitch/03-laptops-b2b.jpg',
    products: [
      {
        id: 'hp-elitebook-840-g10',
        ref: 'REF: HP-EB840-G10-BDI',
        brand: 'HP',
        brandLabel: 'HP Enterprise',
        name: 'HP EliteBook 840 G10',
        slug: 'hp-elitebook-840-g10',
        price: 2850000,
        showPrice: true,
        priceNote: 'Tarif HTVA (Facturation OBR)',
        currency: 'BIF',
        featuredHome: true,
        homeCategory: 'laptops',
        description: 'Intel Core i7 13th Gen • 16GB RAM • 512GB SSD NVMe • Clavier rétroéclairé AZERTY',
        longDescription: 'L\'HP EliteBook 840 G10 est l\'ultrabook d\'entreprise de référence au Burundi. Châssis aluminium haute résistance, processeur Intel Core i7 de 13e génération, mémoire DDR5 rapide et sécurité matérielle HP Wolf Security.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i7 13e Gén' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB DDR5 • 512 GB NVMe' },
          { icon: 'verified_user', label: 'Garantie EPI', value: '24 Mois Direct HP' }
        ],
        homeSpecs: [
          { label: 'Écran :', value: '14" FHD IPS Antireflet' },
          { label: 'Garantie :', value: '24 Mois Direct HP' }
        ],
        features: [
          'Écran 14" FHD IPS Antireflet (1920x1080)',
          'Processeur Intel Core i7-1355U (13e génération)',
          '16 GB RAM DDR5 • SSD 512 GB PCIe NVMe',
          'Clavier AZERTY rétroéclairé résistant aux éclaboussures',
          'Sécurité matérielle HP Wolf Pro Security',
          'Garantie constructeur 24 Mois Direct HP à Bujumbura'
        ],
        images: [
          { src: '/assets/img/stitch/06-hp-elitebook-840-g10.jpg', alt: 'HP EliteBook 840 G10' },
          { src: '/assets/img/products/Elitebook 840 G8/IMG_0984.JPG', alt: 'HP EliteBook 840 - Vue' },
          { src: '/assets/img/products/Elitebook 840 G8/IMG_0985.JPG', alt: 'HP EliteBook 840 - Ouvert' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i7',
        ramTag: '16GB',
        warrantyMonths: 24,
        category: 'laptops'
      },
      {
        id: 'dell-latitude-3540',
        ref: 'REF: DELL-LAT3540-BDI',
        brand: 'Dell',
        brandLabel: 'Dell Technologies',
        name: 'Dell Latitude 3540 Pro',
        slug: 'dell-latitude-3540',
        price: 2150000,
        showPrice: true,
        priceNote: 'Tarif HTVA (Facturation OBR)',
        currency: 'BIF',
        featuredHome: true,
        homeCategory: 'laptops',
        description: 'Intel Core i5 13th Gen • 16GB RAM DDR4 • 512GB SSD • Pavé numérique dédié',
        longDescription: 'Le Dell Latitude 3540 Pro est conçu pour la productivité financière, comptable et administrative. Son grand écran 15.6" Full HD et son pavé numérique dédié en font le standard des banques et ONG au Burundi.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i5 13e Gén' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB RAM • 512 GB SSD' },
          { icon: 'tv', label: 'Écran & OS', value: '15.6" FHD • Win 11 Pro' }
        ],
        homeSpecs: [
          { label: 'Écran :', value: '15.6" Full HD WVA' },
          { label: 'OS :', value: 'Windows 11 Pro Licence' }
        ],
        features: [
          'Écran 15.6" Full HD WVA Antireflet',
          'Processeur Intel Core i5-1335U (13e génération)',
          '16 GB RAM • 512 GB SSD NVMe',
          'Pavé numérique intégré pour saisie comptable',
          'Licence officielle Windows 11 Professionnel',
          'Connectivité Wi-Fi 6E, RJ45 Gigabit Ethernet, HDMI, USB-C'
        ],
        images: [
          { src: '/assets/img/stitch/07-dell-latitude-3540.jpg', alt: 'Dell Latitude 3540 Pro' },
          { src: '/assets/img/products/Dell Latitude 5480/IMG_1013.JPG', alt: 'Dell Latitude - Vue' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i5',
        ramTag: '16GB',
        warrantyMonths: 24,
        category: 'laptops'
      },
      {
        id: 'lenovo-thinkpad-t14-gen4',
        ref: 'REF: 21AH00BUJ-TP',
        brand: 'Lenovo',
        brandLabel: 'Lenovo',
        name: 'Lenovo ThinkPad T14 Gen 4 Pro',
        slug: 'lenovo-thinkpad-t14-gen4',
        price: 3450000,
        showPrice: true,
        priceNote: 'Remise dégressive dès 5 unités (Parc IT)',
        currency: 'BIF',
        featuredHome: false,
        description: 'Ultrabook d\'entreprise ultra-robuste avec châssis magnésium.',
        longDescription: 'Certifié MIL-STD-810H pour résister aux déplacements sur le terrain dans toutes les provinces du Burundi, le Lenovo ThinkPad T14 Gen 4 Pro offre une autonomie longue durée et des performances de premier plan.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i7-1355U (10 Cores)' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB DDR5 • 512 GB NVMe SSD' },
          { icon: 'verified_user', label: 'Garantie EPI', value: '36 Mois Sur Site Premier' }
        ],
        features: [
          'Processeur Intel Core i7-1355U (10 Cœurs)',
          '16 GB DDR5 • 512 GB SSD PCIe Gen4 NVMe',
          'Châssis hybride magnésium/carbone certifié MIL-STD-810H',
          'Garantie 36 Mois Sur Site Premier à Bujumbura',
          'Double batterie haute autonomie RapidCharge'
        ],
        images: [
          { src: '/assets/img/products/T460S/IMG_1002.JPG', alt: 'Lenovo ThinkPad T14 Gen 4 Pro' },
          { src: '/assets/img/products/T460S/IMG_1003.JPG', alt: 'Lenovo ThinkPad T14 - Ouvert' },
          { src: '/assets/img/products/T460S/IMG_1004.JPG', alt: 'Lenovo ThinkPad T14 - Clavier' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i7',
        ramTag: '16GB',
        warrantyMonths: 36,
        category: 'laptops'
      },
      {
        id: 'hp-probook-450-g10',
        ref: 'REF: HP-PB450-G10-BDI',
        brand: 'HP',
        brandLabel: 'HP Inc.',
        name: 'HP ProBook 450 G10 Entreprise',
        slug: 'hp-probook-450-g10',
        price: 2650000,
        showPrice: true,
        priceNote: 'Tarif spécial administration & ONG',
        currency: 'BIF',
        featuredHome: false,
        description: 'Ordinateur portable standard bureautique et administration.',
        longDescription: 'Le HP ProBook 450 G10 offre aux entreprises en croissance et aux ONG des performances de niveau professionnel, une sécurité multicouche et une durabilité éprouvée dans un châssis aluminium compact.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i5-1335U' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB RAM • 512 GB SSD PCIe' },
          { icon: 'tv', label: 'Écran', value: '15.6" Full HD Antireflet' }
        ],
        features: [
          'Processeur Intel Core i5-1335U',
          '16 GB RAM • 512 GB SSD PCIe NVMe',
          'Écran 15.6" Full HD Antireflet avec pavé numérique',
          'Port RJ-45 Ethernet intégré, USB-C, HDMI 2.1',
          'Garantie matérielle 12 à 24 mois'
        ],
        images: [
          { src: '/assets/img/products/Probook 650G5/IMG_0993.JPG', alt: 'HP ProBook 450 G10' },
          { src: '/assets/img/products/Probook 650G5/IMG_0994.JPG', alt: 'HP ProBook 450 G10 - Ouvert' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i5',
        ramTag: '16GB',
        warrantyMonths: 12,
        category: 'laptops'
      },
      {
        id: 'dell-latitude-5540-vpro',
        ref: 'REF: LAT-5540-PRO-BIF',
        brand: 'Dell',
        brandLabel: 'Dell Direct',
        name: 'Dell Latitude 5540 vPro',
        slug: 'dell-latitude-5540-vpro',
        price: 3890000,
        showPrice: true,
        priceNote: 'Contrat support Dell ProSupport 24/7',
        currency: 'BIF',
        featuredHome: false,
        description: 'Sécurité matérielle maximale et télégestion d\'équipe IT.',
        longDescription: 'Conçu pour les DSI et les environnements bancaires exigeants, le Dell Latitude 5540 vPro intègre Intel vPro Enterprise, lecteur SmartCard, chiffrement TPM 2.0 et 32 GB de RAM.',
        specs: [
          { icon: 'memory', label: 'CPU Intel vPro', value: 'Core i7-1365U vPro' },
          { icon: 'storage', label: 'RAM & SSD', value: '32 GB RAM • 1 TB NVMe' },
          { icon: 'security', label: 'Chiffrement', value: 'TPM 2.0 • Lecteur SmartCard' }
        ],
        features: [
          'Intel Core i7-1365U avec plateforme Intel vPro',
          '32 GB DDR4/DDR5 • 1 TB SSD NVMe Classe 40',
          'Puce de sécurité TPM 2.0 & Lecteur SmartCard',
          'Deux ports Thunderbolt 4 + RJ45 Gigabit',
          'Support Dell ProSupport 24/7'
        ],
        images: [
          { src: '/assets/img/products/Dell Latitude 5480/IMG_1013.JPG', alt: 'Dell Latitude 5540 vPro' },
          { src: '/assets/img/products/Dell Latitude 5480/IMG_1014.JPG', alt: 'Dell Latitude 5540 - Ouvert' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i7',
        ramTag: '32GB',
        warrantyMonths: 24,
        category: 'laptops'
      },
      {
        id: 'lenovo-legion-pro-5-cao',
        ref: 'REF: LNV-LEGION-PRO5-CAD',
        brand: 'Lenovo',
        brandLabel: 'Station CAO',
        name: 'Lenovo Legion Pro 5 (Workstation / CAO)',
        slug: 'lenovo-legion-pro-5-cao',
        price: 4900000,
        showPrice: true,
        priceNote: 'Idéal calcul intensif, logiciels AutoCAD & Revit',
        currency: 'BIF',
        featuredHome: false,
        description: 'Puissance dédiée aux bureaux d\'études, SIG, architectes et data.',
        longDescription: 'Station de travail mobile haute performance équipée d\'un processeur AMD Ryzen 7 7745HX et d\'une carte graphique dédiée NVIDIA RTX 4070 8GB pour les bureaux de génie civil, d\'architecture et d\'analyse SIG au Burundi.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'AMD Ryzen 7 7745HX (8C/16T)' },
          { icon: 'videocam', label: 'Carte Graphique', value: 'NVIDIA RTX 4070 8GB GDDR6' },
          { icon: 'storage', label: 'RAM & Dalle', value: '32 GB DDR5 • 16" WQXGA 240Hz' }
        ],
        features: [
          'Processeur AMD Ryzen 7 7745HX (8 Cœurs / 16 Threads)',
          'GPU NVIDIA GeForce RTX 4070 8GB GDDR6',
          '32 GB DDR5 • SSD 1 TB NVMe PCIe 4.0',
          'Dalle 16" WQXGA (2560x1600) IPS 100% sRGB',
          'Certifié pour AutoCAD, ArchiCAD, Revit, ArcGIS et QGIS'
        ],
        images: [
          { src: '/assets/img/products/victus/IMG_0974.JPG', alt: 'Workstation CAO / Architecture' },
          { src: '/assets/img/products/victus/IMG_0975.JPG', alt: 'Workstation CAO - Ouvert' }
        ],
        inStock: true,
        stockBadge: 'Commande Express 48h',
        hub: 'express',
        cpuTag: 'ryzen',
        ramTag: '32GB',
        warrantyMonths: 24,
        category: 'laptops'
      },
      {
        id: 'hp-elitebook-x360-g8',
        ref: 'REF: HP-EBX360-G8-BDI',
        brand: 'HP',
        brandLabel: 'HP Executive',
        name: 'HP EliteBook x360 G8 Tactile',
        slug: 'hp-elitebook-x360-g8',
        price: 2450000,
        showPrice: true,
        priceNote: 'Stylet actif HP inclus • Stock Rohero I',
        currency: 'BIF',
        featuredHome: false,
        description: 'Convertible 2-en-1 premium avec écran tactile 360° et stylet.',
        longDescription: 'L\'HP EliteBook x360 G8 est un ordinateur portable convertible haut de gamme conçu pour les cadres dirigeants. Son design 360° permet de l\'utiliser en ordinateur portable ou en tablette de présentation avec stylet.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i7 11e Gén' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB RAM • 512 GB NVMe' },
          { icon: 'touch_app', label: 'Format', value: '13.3" Tactile 360° + Stylet' }
        ],
        features: [
          'Écran tactile 13.3" Full HD Corning Gorilla Glass',
          'Processeur Intel Core i7 11ème génération',
          '16 GB RAM DDR4 • SSD 512 GB NVMe',
          'Charnière 360° en aluminium usiné CNC',
          'Windows 11 Pro & lecteur d\'empreintes digitales'
        ],
        images: [
          { src: '/assets/img/products/EliteBook x380 G8/IMG_0978.JPG', alt: 'HP EliteBook x360 G8 - Vue principale' },
          { src: '/assets/img/products/EliteBook x380 G8/IMG_0979.JPG', alt: 'HP EliteBook x360 G8 - Mode tablette' },
          { src: '/assets/img/products/EliteBook x380 G8/IMG_0980.JPG', alt: 'HP EliteBook x360 G8 - Clavier' },
          { src: '/assets/img/products/EliteBook x380 G8/IMG_0981.JPG', alt: 'HP EliteBook x360 G8 - Ports' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i7',
        ramTag: '16GB',
        warrantyMonths: 12,
        category: 'laptops'
      },
      {
        id: 'hp-elitebook-840-g8',
        ref: 'REF: HP-EB840-G8-BDI',
        brand: 'HP',
        brandLabel: 'HP Pro',
        name: 'HP EliteBook 840 G8',
        slug: 'hp-elitebook-840-g8',
        price: 1950000,
        showPrice: true,
        priceNote: 'Disponible en lot flotte dès 5 unités',
        currency: 'BIF',
        featuredHome: false,
        description: 'Ordinateur portable professionnel ultra-léger et puissant.',
        longDescription: 'L\'HP EliteBook 840 G8 combine performance, sécurité et mobilité avec son châssis en aluminium ultra-léger (1.3kg), ses 16GB de RAM et ses ports Thunderbolt 4.',
        specs: [
          { icon: 'memory', label: 'Processeur', value: 'Intel Core i5/i7 11e Gén' },
          { icon: 'storage', label: 'Mémoire & Disque', value: '16 GB RAM • 512 GB NVMe' },
          { icon: 'verified_user', label: 'Garantie EPI', value: '12 Mois Garantie Locale' }
        ],
        features: [
          'Écran 14" Full HD (1920x1080)',
          'Processeur Intel Core i5/i7 11ème génération',
          '16GB RAM DDR4 • SSD 512GB NVMe',
          'Châssis en aluminium ultra-léger (1.3kg)',
          'Ports Thunderbolt 4, HDMI, USB 3.2'
        ],
        images: [
          { src: '/assets/img/products/Elitebook 840 G8/IMG_0984.JPG', alt: 'HP EliteBook 840 G8 - Vue principale' },
          { src: '/assets/img/products/Elitebook 840 G8/IMG_0985.JPG', alt: 'HP EliteBook 840 G8 - Ouvert' },
          { src: '/assets/img/products/Elitebook 840 G8/IMG_0986.JPG', alt: 'HP EliteBook 840 G8 - Clavier' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'i5',
        ramTag: '16GB',
        warrantyMonths: 12,
        category: 'laptops'
      }
    ]
  },
  printers: {
    id: 'printers',
    slug: 'imprimantes',
    title: 'Imprimantes & Scanners',
    shortTitle: 'Impression & Multifonctions',
    badge: 'Originaux certifiés',
    icon: 'print',
    description: 'Imprimantes laser réseau, photocopieuses grand format et imprimantes économiques Epson EcoTank. Consommables et toners 100% authentiques.',
    heroImage: '/assets/img/stitch/04-impression-bureau.jpg',
    products: [
      {
        id: 'epson-ecotank-l3250',
        ref: 'REF: EPS-L3250-WIFI',
        brand: 'Epson',
        brandLabel: 'Epson Pro Print',
        name: 'Epson EcoTank L3250 WiFi',
        slug: 'epson-ecotank-l3250',
        price: 780000,
        showPrice: true,
        priceNote: 'Encres d\'origine incluses',
        currency: 'BIF',
        featuredHome: true,
        homeCategory: 'printers',
        description: 'Imprimante 3-en-1 (Impression, Copie, Scan) avec réservoirs d\'encre haute capacité',
        longDescription: 'L\'Epson EcoTank L3250 réduit jusqu\'à 90% vos coûts d\'impression bureautique. Livrée avec un jeu complet de bouteilles d\'encre permettant d\'imprimer jusqu\'à 8 100 pages en noir et 6 500 en couleur.',
        specs: [
          { icon: 'water_drop', label: 'Rendement', value: 'Jusqu\'à 8 100 pages noir' },
          { icon: 'wifi', label: 'Connectivité', value: 'Wi-Fi & Wi-Fi Direct' },
          { icon: 'print', label: 'Fonctions', value: 'Impression, Scan, Copie' }
        ],
        homeSpecs: [
          { label: 'Rendement :', value: 'Jusqu\'à 8 100 pages noir' },
          { label: 'Connectivité :', value: 'Wi-Fi & Wi-Fi Direct' }
        ],
        features: [
          'Multifonction 3-en-1 avec réservoirs rechargeables',
          'Jusqu\'à 8 100 pages en noir et 6 500 pages en couleur',
          'Connectivité Wi-Fi, Wi-Fi Direct & application Epson Smart Panel',
          'Résolution 5760 x 1440 dpi',
          'Bouteilles d\'encre authentiques Epson incluses'
        ],
        images: [
          { src: '/assets/img/stitch/08-epson-ecotank-l3250.jpg', alt: 'Epson EcoTank L3250 WiFi' },
          { src: '/assets/img/products/Ecotank L3250/IMG_1018.JPG', alt: 'Epson L3250 - Vue magasin' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      },
      {
        id: 'epson-ecotank-l6270',
        ref: 'REF: C11CJ61403-BIF',
        brand: 'Epson',
        brandLabel: 'Epson Pro',
        name: 'Epson EcoTank L6270 3-en-1 Wi-Fi',
        slug: 'epson-ecotank-l6270',
        price: 1850000,
        showPrice: true,
        priceNote: 'Kit de 4 bouteilles d\'encre d\'origine fourni',
        currency: 'BIF',
        featuredHome: false,
        description: 'Système à réservoir d\'encre rechargeable ultra-économique.',
        longDescription: 'Conçue pour les groupes de travail exigeants, l\'Epson EcoTank L6270 intègre un chargeur automatique de documents (ADF), l\'impression recto-verso automatique, un port Ethernet RJ45 et une tête PrecisionCore rapide.',
        specs: [
          { icon: 'print', label: 'Vitesse & Type', value: '33 ppm • Recto/Verso Auto' },
          { icon: 'wifi', label: 'Connectivité', value: 'Wi-Fi Direct • Ethernet RJ45' },
          { icon: 'water_drop', label: 'Rendement Box', value: 'Jusqu\'à 14 000 pages incluses' }
        ],
        features: [
          'Vitesse d\'impression rapide jusqu\'à 33 ppm',
          'Impression Recto/Verso automatique & chargeur ADF 30 feuilles',
          'Réseau Ethernet RJ45 + Wi-Fi Direct',
          'Jusqu\'à 14 000 pages en noir et 5 200 en couleur incluses',
          'Tête d\'impression PrecisionCore sans chaleur'
        ],
        images: [
          { src: '/assets/img/products/EPSON M338a/IMG_1015.JPG', alt: 'Epson EcoTank L6270' },
          { src: '/assets/img/products/EPSON M338a/IMG_1016.JPG', alt: 'Epson EcoTank - Panneau' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      },
      {
        id: 'hp-laserjet-pro-mfp-4103fdw',
        ref: 'REF: 2Z629A-HP-BDI',
        brand: 'HP',
        brandLabel: 'HP Pro',
        name: 'HP LaserJet Pro MFP 4103fdw (4-en-1)',
        slug: 'hp-laserjet-pro-mfp-4103fdw',
        price: 2150000,
        showPrice: true,
        priceNote: 'Cartouche toner initiale HP 139A incluse',
        currency: 'BIF',
        featuredHome: false,
        description: 'Imprimante laser monochrome ultra-rapide avec Fax & Chargeur DADF.',
        longDescription: 'L\'imprimante multifonction laser HP LaserJet Pro MFP 4103fdw est taillée pour les services administratifs, banques et cabinets juridiques avec une cadence de 40 pages/minute et une numérisation recto-verso en un seul passage.',
        specs: [
          { icon: 'speed', label: 'Cadence Papier', value: '40 ppm • Recto-Verso 1-Pass' },
          { icon: 'security', label: 'HP Wolf Pro', value: 'Sécurité terminal intégrée' },
          { icon: 'share', label: 'Réseau', value: 'Gigabit LAN, Wi-Fi 2.4/5GHz, BLE' }
        ],
        features: [
          'Impression laser monochrome jusqu\'à 40 ppm',
          'Numérisation recto-verso en un seul passage (DADF 50 feuilles)',
          'Écran tactile couleur intuitif de 6.8 cm',
          'Gigabit Ethernet, Wi-Fi double bande et USB',
          'Compatible toners haute capacité HP 149A / 149X'
        ],
        images: [
          { src: '/assets/img/stitch/04-impression-bureau.jpg', alt: 'HP LaserJet Pro MFP 4103fdw' },
          { src: '/assets/img/products/EPSON M338a/IMG_1015.JPG', alt: 'Multifonction Pro' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      },
      {
        id: 'epson-l8050',
        ref: 'REF: EPS-L8050-PRO',
        brand: 'Epson',
        brandLabel: 'Epson Photo Pro',
        name: 'Epson EcoTank L8050 Couleur 6 Encres',
        slug: 'epson-ecotank-l8050',
        price: 3200000,
        showPrice: true,
        priceNote: 'Idéal badges PVC, cartes & graphisme',
        currency: 'BIF',
        featuredHome: false,
        description: 'Imprimante professionnelle 6 couleurs avec impression directe sur cartes PVC.',
        longDescription: 'L\'Epson EcoTank L8050 offre une qualité photo et graphique exceptionnelle grâce à son système 6 couleurs et son bac d\'impression directe sur cartes d\'identité PVC.',
        specs: [
          { icon: 'palette', label: 'Système Encre', value: '6 Couleurs EcoTank Pro' },
          { icon: 'badge', label: 'Supports', value: 'Papier Photo, Cartes PVC, CD' },
          { icon: 'wifi', label: 'Connectivité', value: 'Wi-Fi & Epson Smart Panel' }
        ],
        features: [
          'Système de réservoirs d\'encre 6 couleurs',
          'Impression directe sur cartes d\'identification PVC',
          'Résolution 5760 x 1440 dpi',
          'Connectivité Wi-Fi & Wi-Fi Direct'
        ],
        images: [
          { src: '/assets/img/products/Epson L8050/IMG_1020.JPG', alt: 'Epson L8050 - Vue principale' }
        ],
        inStock: true,
        stockBadge: 'Hub Gitega & Ngozi',
        hub: 'gitega',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      },
      {
        id: 'epson-ecotank-l3210',
        ref: 'REF: EPS-L3210-USB',
        brand: 'Epson',
        brandLabel: 'Epson EcoTank',
        name: 'Epson EcoTank L3210 3-en-1',
        slug: 'epson-ecotank-l3210',
        price: 1100000,
        showPrice: true,
        priceNote: 'Facture normalisée OBR disponible',
        currency: 'BIF',
        featuredHome: false,
        description: 'Imprimante multifonction couleur économique par USB.',
        longDescription: 'L\'Epson EcoTank L3210 est la solution idéale pour les postes individuels et secrétariats souhaitant réduire drastiquement le coût à la page.',
        specs: [
          { icon: 'print', label: 'Fonctions', value: 'Impression, Copie, Scan' },
          { icon: 'water_drop', label: 'Autonomie', value: '4 500p Noir • 7 500p Couleur' },
          { icon: 'usb', label: 'Interface', value: 'USB 2.0 Haute Vitesse' }
        ],
        features: [
          'Impression couleur et noir & blanc haute capacité',
          'Jusqu\'à 4 500 pages en noir, 7 500 en couleur',
          'Format A4 compact et robuste'
        ],
        images: [
          { src: '/assets/img/products/Ecotank L3210/IMG_1019.JPG', alt: 'Epson L3210 - Vue principale' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      },
      {
        id: 'epson-m338a',
        ref: 'REF: EPS-M338A-MONO',
        brand: 'Epson',
        brandLabel: 'Epson Monochrome',
        name: 'Epson EcoTank M338a Monochrome ADF',
        slug: 'epson-ecotank-m338a',
        price: 1650000,
        showPrice: true,
        priceNote: 'Jusqu\'à 11 000 pages noir incluses',
        currency: 'BIF',
        featuredHome: false,
        description: 'Multifonction monochrome haute cadence avec chargeur ADF.',
        longDescription: 'L\'Epson EcoTank M338a combine la rapidité d\'une imprimante laser (20 ppm) avec le coût ultra-réduit d\'un réservoir d\'encre pigmentée monochrome.',
        specs: [
          { icon: 'speed', label: 'Vitesse', value: '20 ppm • Recto-Verso Auto' },
          { icon: 'water_drop', label: 'Rendement', value: '11 000 pages avec 1 bouteille' },
          { icon: 'settings_ethernet', label: 'Réseau', value: 'Ethernet RJ45 & USB' }
        ],
        features: [
          'Impression monochrome pigmentée résistante à l\'eau',
          'Chargeur automatique de documents (ADF)',
          'Impression recto-verso automatique'
        ],
        images: [
          { src: '/assets/img/products/EPSON M338a/IMG_1015.JPG', alt: 'Epson M338a - Vue principale' },
          { src: '/assets/img/products/EPSON M338a/IMG_1016.JPG', alt: 'Epson M338a - Panneau' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'printers'
      }
    ]
  },
  infrastructure: {
    id: 'infrastructure',
    slug: 'serveurs-reseaux',
    title: 'Serveurs & Réseaux',
    shortTitle: 'Serveurs, Réseaux & Baies',
    badge: 'Entreprise',
    icon: 'router',
    description: 'Serveurs HPE ProLiant, Dell PowerEdge, commutateurs Cisco managés, routeurs MikroTik et baies de brassage 19" pour infrastructures d\'entreprise.',
    heroImage: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg',
    products: [
      {
        id: 'dell-poweredge-t150',
        ref: 'REF: PE-T150-XEON-E2324G',
        brand: 'Dell',
        brandLabel: 'Dell Enterprise',
        name: 'Serveur Dell PowerEdge T150 Tour',
        slug: 'serveur-dell-poweredge-t150',
        price: 14500000,
        showPrice: true,
        priceNote: 'Télégestion à distance iDRAC9 Basic incluse',
        currency: 'BIF',
        featuredHome: false,
        description: 'Serveur d\'entreprise local pour PME, banque, logiciel ERP.',
        longDescription: 'Le serveur tour Dell PowerEdge T150 propulsé par Intel Xeon E-2324G est conçu pour héberger vos bases de données comptables (Sage, Odoo), contrôleurs de domaine Active Directory et partages de fichiers sécurisés en RAID matériel.',
        specs: [
          { icon: 'dns', label: 'Processeur Dédié', value: 'Intel Xeon E-2324G (4C/4T)' },
          { icon: 'memory', label: 'RAM Serveur', value: '32 GB ECC UDIMM (Ext. 128G)' },
          { icon: 'hard_drive', label: 'Stockage RAID', value: '2x 2TB Enterprise SATA RAID-1' }
        ],
        features: [
          'Processeur Intel Xeon E-2324G 3.1GHz',
          '32 GB RAM DDR4 ECC UDIMM (extensible jusqu\'à 128 GB)',
          'Contrôleur RAID PERC avec 2x 2TB Enterprise HDD en RAID-1',
          'Administration à distance iDRAC9 Basic dédiée',
          'Installation et configuration sur site disponible à Bujumbura'
        ],
        images: [
          { src: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg', alt: 'Serveur Dell PowerEdge T150 Tour' },
          { src: '/assets/img/stitch/11-modern-telecommunications-and-it-server.jpg', alt: 'Salle Serveur Bujumbura' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'xeon',
        ramTag: '32GB',
        warrantyMonths: 36,
        category: 'infrastructure'
      },
      {
        id: 'hpe-proliant-dl380-gen10',
        ref: 'REF: HPE-DL380-G10-SILVER',
        brand: 'HP',
        brandLabel: 'HPE Enterprise',
        name: 'Serveur HPE ProLiant DL380 Gen10 Rack 2U',
        slug: 'serveur-hpe-proliant-dl380-gen10',
        price: 23400000,
        showPrice: true,
        priceNote: 'Contrôleur RAID P408i-a 2GB FBWC & double alimentation 800W',
        currency: 'BIF',
        featuredHome: true,
        description: 'Serveur rack 2U biprocesseur pour virtualisation VMware, ERP et bases de données.',
        longDescription: 'Le serveur rack 2U HPE ProLiant DL380 Gen10 propulsé par processeur Intel Xeon Silver 4310 (12 Coeurs / 24 Threads) avec 64 GB de mémoire ECC SmartMemory DDR4 et contrôleur RAID matériel Smart Array P408i-a est la référence mondiale de résilience pour les banques, institutions et datacenters d\'entreprise au Burundi.',
        specs: [
          { icon: 'dns', label: 'Processeur Dédié', value: 'Intel Xeon Silver 4310 (12C/24T)' },
          { icon: 'memory', label: 'RAM Serveur', value: '64 GB DDR4 ECC (Ext. 1.5 TB)' },
          { icon: 'hard_drive', label: 'Stockage SAS RAID', value: '4x 1.2TB SAS 10K Enterprise SFF' }
        ],
        features: [
          'Processeur Intel Xeon Silver 4310 (12 cœurs, 24 threads, 2.1 GHz Turbo 3.3 GHz)',
          '64 GB de mémoire vive DDR4 ECC Registered SmartMemory HPE',
          'Contrôleur matériel HPE Smart Array P408i-a 12G SAS avec 2GB de cache FBWC (RAID 0, 1, 5, 6, 10)',
          'Baie 8 disques SFF 2.5" avec 4x 1.2TB SAS 10K Hot-Plug installés',
          'Double alimentation redondante 800W Flex Slot Platinum Hot-Plug',
          'Carte réseau 4 ports Gigabit Ethernet 331i intégrée',
          'Gestion à distance HPE iLO 5 Advanced avec sécurité Silicon Root of Trust',
          'Garantie constructeur officielle 36 mois avec support technique à Bujumbura'
        ],
        images: [
          { src: '/assets/img/stitch/11-modern-telecommunications-and-it-server.jpg', alt: 'Serveur HPE ProLiant DL380 Gen10 Rack 2U' },
          { src: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg', alt: 'Baie Rack Serveur Datacenter' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'xeon',
        ramTag: '64GB',
        warrantyMonths: 36,
        category: 'infrastructure'
      },
      {
        id: 'hpe-proliant-ml350-gen10',
        ref: 'REF: HPE-ML350-G10-4210R',
        brand: 'HP',
        brandLabel: 'HPE Enterprise',
        name: 'Serveur HPE ProLiant ML350 Gen10 Tour 4U',
        slug: 'serveur-hpe-proliant-ml350-gen10',
        price: 19800000,
        showPrice: true,
        priceNote: 'Châssis tour convertible en rack 4U avec double alimentation',
        currency: 'BIF',
        featuredHome: false,
        description: 'Serveur tour d\'entreprise haute capacité pour agences bancaires, ONG et sièges régionaux.',
        longDescription: 'Le serveur tour HPE ProLiant ML350 Gen10 offre une puissance de calcul et une évolutivité remarquables grâce au processeur Intel Xeon Silver 4210R (10C/20T) et 32 GB de RAM ECC. Son format tour convertible en rack 4U en fait le choix privilégié des entreprises nécessitant une grande capacité de disques durs et un silence de fonctionnement optimal.',
        specs: [
          { icon: 'dns', label: 'Processeur Dédié', value: 'Intel Xeon Silver 4210R (10C/20T)' },
          { icon: 'memory', label: 'RAM Serveur', value: '32 GB DDR4 ECC (Ext. 3 TB)' },
          { icon: 'hard_drive', label: 'Stockage RAID', value: '2x 2.4TB SAS 10K Hot-Plug SFF' }
        ],
        features: [
          'Processeur Intel Xeon Silver 4210R 2.4GHz Turbo 3.2GHz (10 cœurs / 20 threads)',
          '32 GB RAM DDR4 ECC SmartMemory (extensible jusqu\'à 3 TB)',
          'Contrôleur HPE Smart Array E208i-a SR Gen10 12Gb SAS (RAID 0, 1, 5, 10)',
          'Double alimentation redondante 800W Hot-Plug Platinum',
          '4 ports réseau 1GbE intégrés (HPE 369i)',
          'Module de télégestion distant HPE iLO 5 intégré',
          'Format tour convertible en baie 4U',
          'Garantie constructeur officielle 36 mois'
        ],
        images: [
          { src: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg', alt: 'Serveur HPE ProLiant ML350 Gen10' },
          { src: '/assets/img/stitch/11-modern-telecommunications-and-it-server.jpg', alt: 'Serveur Tour ProLiant' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'xeon',
        ramTag: '32GB',
        warrantyMonths: 36,
        category: 'infrastructure'
      },
      {
        id: 'dell-poweredge-r750xs',
        ref: 'REF: PE-R750XS-SILVER4314',
        brand: 'Dell',
        brandLabel: 'Dell Enterprise',
        name: 'Serveur Dell PowerEdge R750xs Rack 2U',
        slug: 'serveur-dell-poweredge-r750xs',
        price: 27900000,
        showPrice: true,
        priceNote: 'iDRAC9 Enterprise & contrôleur PERC H755 8GB NV Cache inclus',
        currency: 'BIF',
        featuredHome: true,
        description: 'Serveur biprocesseur 2U pour charges de travail intensives, cloud privé et virtualisation critique.',
        longDescription: 'Le Dell PowerEdge R750xs est un serveur rack 2U optimisé pour les centres de données d\'entreprise et banques commerciales au Burundi. Équipé d\'un processeur Intel Xeon Silver 4314 de 3ème génération (16C/32T) et de 64 GB de mémoire vive RDIMM ECC, il offre une bande passante mémoire et I/O exceptionnelle avec contrôleur RAID matériel PERC H755 sécurisé.',
        specs: [
          { icon: 'dns', label: 'Processeur Dédié', value: 'Intel Xeon Silver 4314 (16C/32T)' },
          { icon: 'memory', label: 'RAM Serveur', value: '64 GB RDIMM 3200MT/s ECC' },
          { icon: 'hard_drive', label: 'Stockage SSD Entreprise', value: '4x 960GB Enterprise SATA SSD' }
        ],
        features: [
          'Processeur Intel Xeon Silver 4314 (16 cœurs, 32 threads, 2.4 GHz, 24MB Cache)',
          '64 GB RDIMM DDR4 3200MT/s ECC Dual Rank (extensible jusqu\'à 1 TB)',
          'Contrôleur RAID matériel PERC H755 avec 8GB de cache non-volatile (RAID 0, 1, 5, 6, 10)',
          '4 disques SSD 960GB SATA Read Intensive 6Gbps 2.5" Hot-Plug',
          'Double alimentation redondante 800W Hot-Plug Platinum',
          'Contrôleur de gestion à distance iDRAC9 Enterprise avec OpenManage',
          'Kit de rails coulissants ReadyRails 2U pour armoire 19" inclus',
          'Garantie constructeur Dell ProSupport 36 mois sur site NBD'
        ],
        images: [
          { src: '/assets/img/stitch/11-modern-telecommunications-and-it-server.jpg', alt: 'Serveur Dell PowerEdge R750xs Rack 2U' },
          { src: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg', alt: 'Baie Rack Dell' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: 'xeon',
        ramTag: '64GB',
        warrantyMonths: 36,
        category: 'infrastructure'
      },
      {
        id: 'cisco-catalyst-1000-24p',
        ref: 'REF: C1000-24T-4G-L-BDI',
        brand: 'Cisco',
        brandLabel: 'Cisco Partner',
        name: 'Switch Cisco Catalyst 1000 24-Ports',
        slug: 'switch-cisco-catalyst-1000-24p',
        price: 3100000,
        showPrice: true,
        priceNote: 'Certification & support déploiement réseau inclus',
        currency: 'BIF',
        featuredHome: false,
        description: 'Commutateur managé Gigabit Ethernet haute résilience d\'entreprise.',
        longDescription: 'Le commutateur Cisco Catalyst 1000 24 ports Gigabit avec 4 emplacements SFP fibre optique assure une segmentation VLAN irréprochable et une sécurité 802.1X de niveau bancaire.',
        specs: [
          { icon: 'lan', label: 'Ports Réseau', value: '24x 10/100/1000 + 4x SFP 1G' },
          { icon: 'settings_ethernet', label: 'Débit / Trame', value: '56 Gbps switching cap.' },
          { icon: 'lock', label: 'Sécurité', value: '802.1X • Port Security • VLANs' }
        ],
        features: [
          '24 ports Gigabit Ethernet RJ45 + 4 uplinks SFP 1G',
          'Capacité de commutation de 56 Gbps sans blocage',
          'Cisco IOS CLI et interface Web intuitive',
          'Segmentation VLAN, ACLs, Spanning Tree et 802.1X',
          'Conception sans ventilateur silencieuse pour armoire 19"'
        ],
        images: [
          { src: '/assets/img/stitch/14-fiber-optic-structured-network-cabling-i.jpg', alt: 'Switch Cisco Catalyst 1000 24-Ports' },
          { src: '/assets/img/stitch/05-r-seaux-amp-nergie.jpg', alt: 'Baie Réseau Cisco' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 24,
        category: 'infrastructure'
      },
      {
        id: 'cudy-router',
        ref: 'REF: CUDY-AC1200-PRO',
        brand: 'Cisco',
        brandLabel: 'Réseau Pro',
        name: 'Routeur Wi-Fi Dual-Band Cudy AC1200 Gigabit',
        slug: 'routeur-wifi-cudy',
        price: 280000,
        showPrice: true,
        priceNote: 'Support VPN WireGuard / OpenVPN intégré',
        currency: 'BIF',
        featuredHome: false,
        description: 'Routeur Wi-Fi haute performance pour bureaux et agences.',
        longDescription: 'Routeur Wi-Fi Gigabit Cudy AC1200 offrant une couverture étendue grâce à ses 4 antennes à gain élevé et le support natif des clients VPN d\'entreprise.',
        specs: [
          { icon: 'wifi', label: 'Standard Wi-Fi', value: 'AC1200 Dual-Band (2.4 / 5GHz)' },
          { icon: 'lan', label: 'Ports Ethernet', value: 'Full Gigabit WAN/LAN' },
          { icon: 'vpn_key', label: 'Sécurité VPN', value: 'WireGuard • OpenVPN • IPsec' }
        ],
        features: [
          'Wi-Fi AC1200 (300Mbps + 867Mbps)',
          '4 antennes externes 5dBi haute performance',
          'Ports Gigabit Ethernet',
          'Client/Serveur VPN intégré pour télétravail et inter-agences'
        ],
        images: [
          { src: '/assets/img/products/4_router_cudy.JPG', alt: 'Routeur Cudy' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'infrastructure'
      }
    ]
  },
  power: {
    id: 'power',
    slug: 'onduleurs-protection',
    title: 'Onduleurs & Protection',
    shortTitle: 'Énergie & Onduleurs APC',
    badge: 'Régulation AVR',
    icon: 'bolt',
    description: 'Onduleurs APC by Schneider Electric à régulation automatique de tension (AVR) pour protéger vos serveurs et postes contre les coupures et variations de tension.',
    heroImage: '/assets/img/stitch/09-apc-smart-ups-1500va.jpg',
    products: [
      {
        id: 'apc-smart-ups-1500va',
        ref: 'REF: APC-SMT1500I-LCD',
        brand: 'APC',
        brandLabel: 'APC / Schneider',
        name: 'APC Smart-UPS 1500VA LCD',
        slug: 'apc-smart-ups-1500va',
        price: 1450000,
        showPrice: true,
        priceNote: 'Garantie batteries 2 ans • Protection surtensions',
        currency: 'BIF',
        featuredHome: true,
        homeCategory: 'power',
        description: 'Protection sinusoïdale pure 230V pour serveurs, centraux téléphoniques et routeurs',
        longDescription: 'L\'onduleur APC Smart-UPS 1500VA LCD délivre une onde sinusoïdale pure indispensable aux alimentations de serveurs et équipements réseaux critiques face aux coupures et fluctuations de tension à Bujumbura et à l\'intérieur du pays.',
        specs: [
          { icon: 'bolt', label: 'Puissance', value: '1000 Watts / 1500 VA' },
          { icon: 'tune', label: 'Régulation', value: 'AVR Automatique Intégré' },
          { icon: 'battery_charging_full', label: 'Garantie', value: '24 Mois Batteries Incluses' }
        ],
        homeSpecs: [
          { label: 'Puissance :', value: '1000 Watts / 1500 VA' },
          { label: 'Régulation :', value: 'AVR Automatique Intégré' }
        ],
        features: [
          'Puissance nominale : 1000 Watts / 1500 VA',
          'Sortie sinusoïdale pure sur batterie',
          'Régulation automatique de tension (AVR Boost & Trim)',
          'Écran LCD graphique multifonction en façade',
          'Port SmartSlot et gestion réseau PowerChute'
        ],
        images: [
          { src: '/assets/img/stitch/09-apc-smart-ups-1500va.jpg', alt: 'APC Smart-UPS 1500VA LCD' },
          { src: '/assets/img/products/APC UPS 600W/IMG_1012.JPG', alt: 'APC UPS' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 24,
        category: 'power'
      },
      {
        id: 'apc-smart-ups-2200va',
        ref: 'REF: APC-SMT2200I-LCD',
        brand: 'APC',
        brandLabel: 'APC Schneider',
        name: 'Onduleur APC Smart-UPS 2200VA LCD',
        slug: 'apc-smart-ups-2200va',
        price: 4200000,
        showPrice: true,
        priceNote: 'Idéal salle serveur, baie de brassage & labo',
        currency: 'BIF',
        featuredHome: false,
        description: 'Protection contre les coupures et variations de tension réseau.',
        longDescription: 'Conçu pour les baies de serveurs et équipements médicaux ou bancaires sensibles, l\'APC Smart-UPS 2200VA offre 1980 Watts de puissance effective avec régulation AVR et gestion SmartConnect.',
        specs: [
          { icon: 'bolt', label: 'Puissance Sortie', value: '2200 VA / 1980 Watts' },
          { icon: 'tune', label: 'Régulation Tension', value: 'Sinusoïde Pure • SmartConnect' },
          { icon: 'shield', label: 'Prises Sortie', value: '8x IEC C13 + 1x IEC C19' }
        ],
        features: [
          'Capacité de puissance de sortie : 1980 Watts / 2200 VA',
          '8 prises IEC 320 C13 + 1 prise IEC 320 C19 haute intensité',
          'Port Ethernet RJ-45 APC SmartConnect pour supervision cloud',
          'Batteries remplaçables à chaud (Hot-Swap) sans coupure'
        ],
        images: [
          { src: '/assets/img/stitch/09-apc-smart-ups-1500va.jpg', alt: 'Onduleur APC Smart-UPS 2200VA LCD' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 24,
        category: 'power'
      },
      {
        id: 'apc-ups-600w',
        ref: 'REF: APC-BX1000MI-BDI',
        brand: 'APC',
        brandLabel: 'APC Back-UPS',
        name: 'Onduleur APC Back-UPS 1000VA / 600W AVR',
        slug: 'apc-ups-600w',
        price: 550000,
        showPrice: true,
        priceNote: 'Protection poste de travail & routeur',
        currency: 'BIF',
        featuredHome: false,
        description: 'Onduleur APC pour protection des postes bureautiques contre les coupures.',
        longDescription: 'L\'onduleur APC Back-UPS 600W/1000VA protège efficacement les postes de travail individuels, caisses enregistreuses et modems fibre contre les micro-coupures et surtensions.',
        specs: [
          { icon: 'bolt', label: 'Puissance', value: '600 Watts / 1000 VA' },
          { icon: 'schedule', label: 'Autonomie', value: '15 à 30 min (1 poste PC)' },
          { icon: 'tune', label: 'Protection', value: 'Régulation AVR + Parafoudre' }
        ],
        features: [
          'Puissance: 600W / 1000VA',
          'Autonomie: 15-30 minutes pour poste bureautique',
          'Régulation automatique de tension (AVR) intégrée',
          'Garantie 24 mois'
        ],
        images: [
          { src: '/assets/img/products/APC UPS 600W/IMG_1012.JPG', alt: 'APC UPS 600W' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 24,
        category: 'power'
      }
    ]
  },
  accessories: {
    id: 'accessories',
    slug: 'accessoires-peripheriques',
    title: 'Accessoires & Périphériques',
    shortTitle: 'Périphériques & Accessoires Pro',
    badge: 'En Stock',
    icon: 'mouse',
    description: 'Une gamme complète de périphériques certifiés pour équiper vos collaborateurs.',
    heroImage: '/assets/img/products/hp_wireless_mouse.JPG',
    products: [
      {
        id: 'hp-wireless-mouse',
        ref: 'REF: HP-MOUSE-WL200',
        brand: 'HP',
        brandLabel: 'HP Accessoires',
        name: 'Souris Sans Fil HP 200 Pro',
        slug: 'souris-sans-fil-hp',
        price: 45000,
        showPrice: true,
        priceNote: 'Remise sur lot dès 10 unités',
        currency: 'BIF',
        featuredHome: false,
        description: 'Souris sans fil ergonomique 2.4GHz et silencieuse.',
        longDescription: 'Souris sans fil HP conçue pour un confort optimal lors de longues sessions de travail. Connexion sans fil 2.4GHz fiable avec nano-récepteur USB et autonomie jusqu\'à 12 mois.',
        specs: [
          { icon: 'sensors', label: 'Connexion', value: 'Sans fil 2.4 GHz (10m)' },
          { icon: 'ads_click', label: 'Capteur', value: 'Optique Haute Précision' },
          { icon: 'battery_full', label: 'Autonomie', value: 'Jusqu\'à 12 Mois' }
        ],
        features: [
          'Connexion sans fil 2.4GHz avec dongle USB',
          'Design ergonomique ambidextre',
          'Compatible Windows, macOS et Linux'
        ],
        images: [
          { src: '/assets/img/products/hp_wireless_mouse.JPG', alt: 'Souris sans fil HP' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'accessories'
      },
      {
        id: 'hp-corded-mouse',
        ref: 'REF: HP-MOUSE-USB100',
        brand: 'HP',
        brandLabel: 'HP Accessoires',
        name: 'Souris Filaire USB HP 100',
        slug: 'souris-filaire-hp',
        price: 25000,
        showPrice: true,
        priceNote: 'Idéal dotation parcs bureautiques',
        currency: 'BIF',
        featuredHome: false,
        description: 'Souris filaire USB fiable et robuste pour bureaux.',
        longDescription: 'Souris filaire HP simple, robuste et prête à l\'emploi pour équiper durablement les postes fixes et salles de formation.',
        specs: [
          { icon: 'usb', label: 'Interface', value: 'USB Filaire Plug & Play' },
          { icon: 'ads_click', label: 'Résolution', value: '1000 DPI Optique' },
          { icon: 'verified', label: 'Usage', value: 'Dotation Parc Bureautique' }
        ],
        features: [
          'Connexion USB filaire (câble 1.5m)',
          'Capteur optique 1000 DPI',
          'Construction durable HP'
        ],
        images: [
          { src: '/assets/img/products/hp_corded_mouse.JPG', alt: 'Souris filaire HP' }
        ],
        inStock: true,
        stockBadge: 'En Stock Bujumbura',
        hub: 'bujumbura',
        cpuTag: '',
        ramTag: '',
        warrantyMonths: 12,
        category: 'accessories'
      }
    ]
  }
}

const categorySlugAliases = {
  'ordinateurs-portables-stations': 'ordinateurs-portables',
  'imprimantes-scanners-pro': 'imprimantes',
  'reseau-securite-entreprise': 'serveurs-reseaux',
  'onduleurs-energie-apc': 'onduleurs-protection'
}

export const categories = Object.values(productCategories).map((cat) => ({
  ...cat,
  name: cat.shortTitle || cat.title,
  shortName: cat.title,
  materialIcon: cat.icon,
  image: cat.heroImage
}))

export const products = Object.values(productCategories).flatMap((cat) =>
  cat.products.map((p) => ({
    ...p,
    ref: (p.ref || '').replace(/^REF:\s*/i, ''),
    image: p.image || (p.images && p.images[0] ? p.images[0].src : '/assets/img/stitch/06-hp-elitebook-840-g10.jpg'),
    shortDesc: p.shortDesc || p.description,
    description: p.longDescription || p.description,
    priceSubtext: p.priceSubtext || p.priceNote || 'Tarif HTVA (Facture OBR)',
    categorySlug: cat.slug,
    stockType: p.hub === 'express' ? 'express' : 'stock',
    homeSpecs: (p.homeSpecs || (p.specs || []).slice(0, 2)).map((s) => ({
      label: (s.label || '').replace(/\s*:\s*$/, ''),
      value: s.value
    }))
  }))
)

export const getAllProducts = () => products

export const getFeaturedHomeProducts = () => products.filter((p) => p.featuredHome)

export const getProductBySlug = (slug) => products.find((product) => product.slug === slug)

export const getCategoryBySlug = (slug) => {
  const resolvedSlug = categorySlugAliases[slug] || slug
  return categories.find((category) => category.slug === resolvedSlug || category.id === resolvedSlug)
}

export const getProductsByCategory = (slug) => {
  const cat = getCategoryBySlug(slug)
  if (!cat) return []
  return products.filter((p) => p.category === cat.id || p.categorySlug === cat.slug)
}

