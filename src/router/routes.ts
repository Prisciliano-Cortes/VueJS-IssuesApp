import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { 
                path: '', 
                component: () => import('../issues/pages/ListPage.vue'), 
            },
            { 
                path: '/issue/:id', 
                component: () => import('../issues/pages/IssuePage.vue'), 
            }
        ],
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
