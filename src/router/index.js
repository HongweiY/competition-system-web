import {createRouter, createWebHashHistory} from 'vue-router'
import store from "../store";

const routes = [
    {
        name: '/',
        path: '/',
        meta: {
            title: '进入竞赛',
        },
        component: () => import('../App.vue'),
    },
    {
        name: 'answer_pc',
        path: '/answer_pc',
        meta: {
            title: '答题页面',
        },
        component: () => import('../views/pc/Answer.vue'),
    },
    {
        name: 'answer_h5',
        path: '/answer_h5',
        meta: {
            title: '答题页面',
        },
        component: () => import('../views/h5/Answer.vue'),
    },
    {
        name: 'h5_404',
        path: '/h5_404',
        meta: {
            title: '404',
        },
        component: () => import('../views/h5/404.vue'),
    },
    {
        name: 'pc_404',
        path: '/pc_404',
        meta: {
            title: '404',
        },
        component: () => import('../views/pc/404.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 导航守卫
router.beforeEach((to, from, next) => {
    if(router.hasRoute(to.name)) {
        document.title = to.meta.title
        if( !store.state.ws){

            store.commit('initWebSocket',{})
        }

        next()
    } else {
        next('/404')
    }
})

export default router
