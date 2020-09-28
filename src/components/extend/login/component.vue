<template>
    <section class="login">
        <van-nav-bar></van-nav-bar>
        <div class="contain">
            <div class="title">
                <p>您好，</p>
                <p>欢迎登录</p>
            </div>
            <van-field
                v-model="mobile"
                center
                clearable
                maxlength="11"
                placeholder="请输入手机号"
                class="input"
                >
            </van-field>
            <van-button @click="handleLogin" block type="primary" color="#fea30b" :disabled="mobile.length !== 11">下一步</van-button>
            <van-button @click="handleLogin" block type="primary" color="#fea30b">下一步</van-button>
        </div>
    </section>
</template>

<script>
import Back from '@/lib/back'
import { setCookie } from '@/lib/utils'

export default {
    props: {
        router: Object,
        callback: Function,
        backCallBack: Function,
        back: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            mobile: ''
        }
    },
    created () {
        this.Back = new Back()
        this.Back.listen(() => {
            console.log(1)
            this.router.go(-this.back)
        }, () => {
            console.log(2)
            this.isLogin && this.callback()
            !this.isLogin && this.backCallBack && this.backCallBack()
            this.Back.removeListen()
            this.$destroy()
        })
    },
    methods: {
        handleGetCode () {
            this.$router.push({
                name: 'loginCode',
                params: {
                    mobile: this.mobile,
                    fromName: this.fromName
                }
            })
        },
        handleLogin () {
            this.$http.post('/user/login/mobileCheckLogin', {
            }).then(res => {
                setCookie('u_login_token', 'u_login_token')
                setCookie('memberCode', 'memberCode')
                this.isLogin = true
                this.router.go(-this.back - 1)
            }).catch(() => {})
        }
    },
    beforeDestroy () {
        document.body.removeChild(this.$el)
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fromName = from.name
        })
    }
}
</script>

<style lang="less" scoped>
.login {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 2;
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
