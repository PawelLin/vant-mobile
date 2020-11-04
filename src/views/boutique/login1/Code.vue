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
            <van-button @click="handleLogin" block type="primary" color="#fea30b">登录</van-button>
        </div>
    </section>
</template>

<script>
import Back from '@/lib/back'
import { dateFormat } from '@/lib/tools'
import { setCookie } from '@/lib/utils'

export default {
    name: 'login1Code',
    data () {
        return {
            form: {
                mobile: '',
                code: ''
            },
            code: {
                text: '获取验证码',
                disabled: false
            },
            isLogin: false
        }
    },
    created () {
        this.form.mobile = this.$route.params.mobile
        this.fromName = this.$route.params.fromName
        this.toName = this.$route.params.toName
        this.backName = this.$route.params.backName
        this.isTabbar = this.$route.params.isTabbar
        // this.handleGetCode()
        this.isTabbar && this.listenBack()
    },
    methods: {
        listenBack () {
            this.Back = new Back()
            this.Back.listen(() => {
                this.$router.go(-2 - (this.isLogin ? 3 : 0))
                // 前一个页面已经监听了物理返回，返回上一页时，需在触发回调时移除监听，避免在本页面触发多次返回监听
                !this.isLogin && this.Back.removeListen()
            }, () => {
                if (this.isLogin && this.$route.name !== this.toName) {
                    this.replaceRoute({ name: this.toName, params: { forward: false } })
                }
                this.Back.removeListen()
            })
        },
        handleClick () {
            this.$router.go(-1)
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
            // this.$http.post('/user/login/mobileCheckLogin', {
            //     code: this.form.code,
            //     createChannel: 'CB_M',
            //     loginTime: dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            //     mobile: this.form.mobile,
            //     token: this.form.token
            // }).then(res => {
            setCookie('u_login_token', 'u_login_token')
            setCookie('memberCode', 'memberCode')
            this.isLogin = true
            if (this.isTabbar) {
                this.$router.go(-1)
            } else {
                this.goBack({ name: this.fromName, refresh: true })
            }
            // }).catch(() => {})
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
