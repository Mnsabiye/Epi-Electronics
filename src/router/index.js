import { createRouter, createWebHistory } from 'vue-router'

// Lazy load pages for better performance
const Home = () => import('../pages/Home.vue')
const CategoryPage = () => import('../pages/CategoryPage.vue')
const ProductDetail = () => import('../pages/ProductDetail.vue')
const AllProducts = () => import('../pages/AllProducts.vue')
const QuoteRequest = () => import('../pages/QuoteRequest.vue')
const NotFound = () => import('../pages/NotFound.vue')
const Consulting = () => import('../pages/services/Consulting.vue')
const Maintenance = () => import('../pages/services/Maintenance.vue')
const Distribution = () => import('../pages/services/Distribution.vue')
const ServicesPage = () => import('../pages/ServicesPage.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'EpiElectronics - Matériel Informatique & Services IT au Burundi (Bujumbura, Gitega, Ngozi)'
        }
    },
    {
        path: '/produits',
        name: 'Products',
        component: AllProducts,
        meta: {
            title: 'Catalogue Produits - Ordinateurs & Accessoires au Burundi'
        }
    },
    {
        path: '/categorie/:slug',
        name: 'Category',
        component: CategoryPage,
        meta: {
            title: 'Catégorie Produits - EpiElectronics Burundi'
        }
    },
    {
        path: '/produit/:slug',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: {
            title: 'Détails Produit - EpiElectronics Burundi'
        }
    },
    {
        path: '/demandez-un-devis',
        name: 'QuoteRequest',
        component: QuoteRequest,
        meta: {
            title: 'Demander un Devis - Matériel & Services IT Burundi'
        }
    },
    {
        path: '/services',
        name: 'ServicesPage',
        component: ServicesPage,
        meta: {
            title: 'Nos Services IT - Maintenance, Conseil & Distribution au Burundi'
        }
    },
    {
        path: '/services/conseil',
        name: 'Consulting',
        component: Consulting,
        meta: {
            title: 'Conseil & Stratégie IT - Bujumbura, Burundi'
        }
    },
    {
        path: '/services/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        meta: {
            title: 'Maintenance Informatique Proactive - Burundi (Bujumbura, Gitega)'
        }
    },
    {
        path: '/services/distribution',
        name: 'Distribution',
        component: Distribution,
        meta: {
            title: 'Vente & Distribution Matériel Informatique - Burundi'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '404 - Page non trouvée'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EpiElectronics'
    next()
})

export default router
