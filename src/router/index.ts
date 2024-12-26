import { createRouter, createWebHashHistory } from 'vue-router';
import SignIn from '@/vue/SignIn.vue';
import Home from '@/vue/home.vue';
import KakaoCallback from '@/vue/KakaoCallback.vue';

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
    },
    {
        path: '/auth',
        name: 'KakaoCallback',
        component: KakaoCallback,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (to.name === 'KakaoCallback') {
        next();
        return;
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLoggedIn) {
            console.warn('🔒 Access denied. Redirecting to SignIn...');
            next({ name: 'SignIn' });
        } else {
            next();
        }
    } else if (to.name === 'SignIn' && isLoggedIn) {
        console.info('🔄 Already logged in. Redirecting to Main...');
        next({ name: 'Main' });
    } else {
        next();
    }
});

export default router;
