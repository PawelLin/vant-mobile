<template>
    <Login :is-login.sync="isLogin" />
</template>

<script>
import Back from '@/lib/back'
import Login from './Login.vue'

export default {
    name: 'loginTabbar',
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
            console.log(1)
            this.$router.go(-2)
        }, () => {
            if (this.isLogin) {
                if (this.$route.name !== 'my') {
                    this.replaceRoute({ name: 'my', params: { forward: false } })
                }
            } else {
                if (this.$route.name !== this.fromName) {
                    this.replaceRoute({ name: this.backName || this.fromName, params: { forward: false } })
                }
            }
            this.Back.removeListen()
        })
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fromName = from.name
            vm.backName = vm.$route.params.backName
        })
    }
}
</script>

<style lang="less" scoped>
#app > .login {
    background-color: #ffffff;
}
.contain {
    padding: 50px 25px 0;
}
.title > p {
    color: #333;
    font-weight: bold;
    &:nth-child(1) {
        font-size: 24px;
    }
    &:nth-child(2) {
        margin-top: 5px;
        font-size: 18px;
    }
}
.input {
    padding: 25px 0;
    font-size: 18px;
}
</style>
