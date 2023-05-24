import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        }, {
            path: '/work/list',
            name: 'workList',
            component: () => import('@/views/works/WorksBase.vue')
        }, {
            path: '/work/:workId/detail',
            name: 'workDetail',
            component: () => import('@/views/works/WorkDetail.vue')

        },
    ]
})

export default router
