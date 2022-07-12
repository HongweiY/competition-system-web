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
        name: '/rank_h5',
        path: '/rank_h5',
        meta: {
            title: '排行榜',
        },
        component: () => import('../views/h5/Rank.vue'),
    },
    {
        name: 'answer_pc',
        path: '/answer_pc',
        meta: {
            title: '"互联网+保密”全民云端知识竞赛',
        },
        component: () => import('../views/pc/AnswerExercise.vue'),
    },
    {
        name: 'competition_pc',
        path: '/competition_pc',
        meta: {
            title: '"互联网+保密”全民云端知识竞赛',
        },
        component: () => import('../views/pc/Answer.vue'),
    },
    {
        name: 'answer_h5',
        path: '/answer_h5',
        meta: {
            title: ' 竞赛演练',
        },
        component: () => import('../views/h5/AnswerExercise.vue'),
    },
    {
        name: 'competition_h5',
        path: '/competition_h5',
        meta: {
            title: '"互联网+保密”全民云端知识竞赛',
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
        if(!store.state.ws) {
            store.commit('initWebSocket', {})
        }
        next()
    } else {
        next('/404')
    }
})

export default router
