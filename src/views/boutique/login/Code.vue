<template>
    <section class="login-code">
        <van-nav-bar title="" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <div class="title">
                <p>您好，</p>
                <p>已向{{form.mobile}}发送短信验证码</p>
            </div>
            <van-field
                v-model="form.code"
                center
                clearable
                maxlength="6"
                placeholder="请输入验证码"
                class="input"
                >
                <template #button>
                    <van-button size="small" type="primary" color="#fea30b" :disabled="code.disabled">{{code.text}}</van-button>
                </template>
            </van-field>
            <van-button @click="handleLogin" block type="primary" color="#fea30b" :disabled="form.code.length !== 6">登录</van-button>
        </div>
    </section>
</template>

<script>
import { dateFormat } from '@/lib/tools'
import { setCookie } from '@/lib/utils'

export default {
    name: 'loginCode',
    data () {
        return {
            form: {
                mobile: '',
                code: ''
            },
            code: {
                text: '获取验证码',
                disabled: false
            }
        }
    },
    created () {
        this.form.mobile = this.$route.params.mobile
        this.fromName = this.$route.params.fromName
        this.handleGetCode()
    },
    methods: {
        handleClick () {
            this.goBack({ name: this.fromName })
        },
        handleGetCode () {
            this.code.disabled = true
            this.$http.post('/user/code/check_send_sms', {
                mobile: this.form.mobile,
                smsType: '1313'
            }).then(res => {
                this.form.token = res.data.smsToken
                this.code.text = '重新获取'
            }).catch(() => {
                this.code.disabled = false
            })
        },
        handleLogin () {
            this.$http.post('/user/login/mobileCheckLogin', {
                code: this.form.code,
                createChannel: 'CB_M',
                loginTime: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                mobile: this.form.mobile,
                token: this.form.token
            }).then(res => {
                setCookie('u_login_token', 'u_login_token')
                setCookie('memberCode', 'memberCode')
                this.goBack({ name: this.fromName })
            }).catch(() => {})
        }
    }
}
</script>

<style lang="less" scoped>
#app > .login-code {
    background-color: #ffffff;
}
.contain {
    padding: 50px 25px 0;
}
.title > p {
    &:nth-child(1) {
        font-size: 24px;
        color: #333;
        font-weight: bold;
    }
    &:nth-child(2) {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
    }
}
.input {
    padding: 25px 0;
    font-size: 18px;
}
</style>
