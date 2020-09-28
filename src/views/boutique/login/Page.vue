<template>
    <Login :is-login.sync="isLogin" />
</template>

<script>
import Back from '@/lib/back'
import Login from './Login.vue'

export default {
    name: 'loginPage',
    components: {
        Login
    },
    data () {
        return {
            isLogin: false
        }
    },
    created () {
        this.Back = new Back()
        this.Back.listen(() => {
            this.goBackListen({ name: this.fromName, refresh: this.isLogin, num: 1 })
        }, () => {
            this.Back.removeListen()
        })
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fromName = from.name
        })
    }
}
</script>
