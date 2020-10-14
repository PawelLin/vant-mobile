<template>
    <Login :isTabbar="true" :fromName="fromName" :backName="backName" :toName="toName" />
</template>

<script>
import Back from '@/lib/back'
import Login from './Login.vue'

export default {
    name: 'login1Tabbar',
    components: {
        Login
    },
    data () {
        return {
            fromName: '',
            backName: '',
            toName: ''
        }
    },
    activated () {
        this.isPhoneBack = false
        if (this.Back) {
            this.Back.recoverListen()
        } else {
            this.Back = new Back()
            this.Back.listen(() => {
                this.isPhoneBack = true
                this.$router.go(-2)
            }, () => {
                this.backName && this.replaceRoute({ name: this.backName, params: { forward: false } })
                this.Back.removeListen()
            })
        }
    },
    deactivated () {
        !this.isPhoneBack && this.Back.removeListen()
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (from.name !== 'login1Code') {
                vm.fromName = from.name
                vm.backName = vm.$route.params.backName
                vm.toName = vm.$route.params.toName || 'my'
            }
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
