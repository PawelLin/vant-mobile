export default {
    methods: {
        getBackNumber (name) {
            const include = this.$store.state.include
            const backIndex = include.indexOf(name)
            return include.length - backIndex - 1
        },
        // 页面上有监听物理返回时，点击按钮触发的num=2，点击物理返回的num=1
        goBackListen (params) {
            const { name, refresh = false, num = 2 } = params
            this.$store.commit('setRoute', { name, refresh })
            this.$router.go(-this.getBackNumber(name) - num)
        },
        // 页面上没有监听物理返回
        goBack (params) {
            const { name, refresh = false } = params
            this.$store.commit('setRoute', { name, refresh })
            this.$router.go(-this.getBackNumber(name))
        },
        replaceRoute (params) {
            this.$router.replace({ ...params, ...{ params: { replace: true } } })
        }
    }
}
