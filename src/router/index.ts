import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '@/vue/SignIn.vue';
import Home from '@/vue/home.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            { name: 'HomeMain', component: () => import('@/views/home-main.vue'), path: '/' },
            { name: 'HomePopular', component: () => import('@/views/home-popular.vue'), path: 'popular' },
            { name: 'HomeWishList', component: () => import('@/views/home-wishlist.vue'), path: 'wishlist' },
            { name: 'HomeSearch', component: () => import('@/views/home-search.vue'), path: 'search' }
        ]
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    },
    {
        path: '/auth',
        name: 'KakaoAuth',
        component: () => import('@/vue/KakaoAuth.vue'), // 카카오 로그인 리다이렉트 처리
    },
];

const router = createRouter({
    history: createWebHashHistory('/24-02-WSD-Assignment-02-Demo/'),
    routes
});

router.beforeEach((to, _from, next): void => {
    const isAuthenticated = localStorage.getItem('TMDb-Key') !== null;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else {
        if (to.name === 'SignIn' && isAuthenticated) {
            next({ name: '/' });
        } else {
            next();
        }
    }
});

export default router;
