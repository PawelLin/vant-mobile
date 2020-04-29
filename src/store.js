import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        list: [],
        forward: null,
        back: 0,
        routes: {}
    },
    mutations: {
        setList (state, route) {
            const { to, from } = route
            if (!from || !from.name) {
                state.list = [to.name]
                state.forward = null
            } else {
                const toIndex = state.list.indexOf(to.name)
                if (toIndex === -1) {
                    state.list.push(to.name)
                    state.forward = true
                } else {
                    state.forward = false
                    state.back = state.list.length - toIndex - 1
                    state.list = state.list.slice(0, toIndex + 1)
                }
            }
        },
        setRoutes (state, { name, ...params }) {
            state.routes[name] = Object.assign(state.routes[name] || {}, params)
        }
    },
    actions: {

    }
})
