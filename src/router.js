import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    // scrollBehavior (to, from, savedPosition) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if (savedPosition) {
    //                 resolve(savedPosition)
    //             } else {
    //                 resolve({ x: 0, y: 0 })
    //             }
    //         }, 2000)
    //     })
    // },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/my',
            name: 'my',
            component: () => import(/* webpackChunkName: "my" */ './views/My.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import(/* webpackChunkName: "demo" */ './components/demo/index.vue')
        },
        {
            path: '/page1',
            name: 'page1',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page1.vue')
        },
        {
            path: '/page2',
            name: 'page2',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page2.vue')
        },
        {
            path: '/page3',
            name: 'page3',
            component: () => import(/* webpackChunkName: "demo" */ './views/Page3.vue')
        },
        {
            path: '/hero',
            name: 'hero',
            component: () => import(/* webpackChunkName: "demo" */ './views/Hero.vue')
        },
        {
            path: '/hero/detail',
            name: 'hero_detail',
            component: () => import(/* webpackChunkName: "demo" */ './views/HeroDetail.vue')
        },
        {
            path: '/skin',
            name: 'skin',
            component: () => import(/* webpackChunkName: "demo" */ './views/Skin.vue')
        },
        {
            path: '/wallpaper',
            name: 'wallpaper',
            component: () => import(/* webpackChunkName: "demo" */ './views/Wallpaper.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit('setRoutes', { to, from })
    if (store.state.forward) {
        const scrollTop = document.querySelector('#app > section > .contain').scrollTop || 0
        store.commit('setRoute', { name: from.name, scrollTop })
    }
    next()
})
router.afterEach(to => {
})

export default router
