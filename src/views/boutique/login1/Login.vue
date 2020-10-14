<template>
    <section class="login">
        <van-nav-bar left-arrow @click-left="handleClick"></van-nav-bar>
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
            <van-button @click="handleGetCode" block type="primary" color="#fea30b">下一步</van-button>
        </div>
    </section>
</template>

<script>

export default {
    props: {
        fromName: {
            type: String,
            default: ''
        },
        toName: {
            type: String,
            default: ''
        },
        backName: {
            type: String,
            default: ''
        },
        isTabbar: {
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
        handleClick () {
            this.$router.go(-1)
        },
        handleGetCode () {
            this.$router.push({
                name: 'login1Code',
                params: {
                    mobile: this.mobile,
                    fromName: this.fromName,
                    backName: this.backName,
                    toName: this.toName,
                    isTabbar: this.isTabbar
                }
            })
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
