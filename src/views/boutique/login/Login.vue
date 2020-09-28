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
            <van-button @click="handleGetCode" block type="primary" color="#fea30b" :disabled="mobile.length !== 11">下一步</van-button>
            <van-button @click="handleLogin" block type="primary" color="#fea30b">下一步</van-button>
        </div>
    </section>
</template>

<script>
import { setCookie } from '@/lib/utils'

export default {
    props: {
        isLogin: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            mobile: ''
        }
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
                this.$emit('update:isLogin', true)
                this.$router.go(-1)
            }).catch(() => {})
        }
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
