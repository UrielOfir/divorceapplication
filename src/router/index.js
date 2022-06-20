import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta:{authNotRequired: false},
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta:{authNotRequired: false},
    },
    {
        path: `/login`,
        name: `Login`,
        component: () => import('../views/Login.vue'),
        meta:{authNotRequired: true},
    },
    {
        path: `/updatePersonalDetails`,
        name: `UpdatePersonalDetails`,
        component: () => import('../views/UpdatePersonalDetails.vue'),
        meta:{authNotRequired: false},
    },
    {
        path: `/summaryTable`,
        name: `FinancialSummary`,
        component: () => import('../views/FinancialSummary'),
        meta:{authNotRequired: false},
    },
    {
        path: `/updateFinancialDetails`,
        name: `UpdateFinancialDetails`,
        component: () => import('../views/UpdateFinancialDetails.vue'),
        meta:{authNotRequired: false},
    },
    {
        path: '*',
        name: '404',
        component: () => import('../views/Home.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE,
    routes
})

router.beforeEach((to,from,next)=>{
    const user = window.user;
    if (!user && !to.meta.authNotRequired){
        return next('/login');
    }
    return next();
})

export default router
