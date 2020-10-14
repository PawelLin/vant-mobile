<template>
    <section>
        <van-nav-bar title="设置" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <van-cell title="单元格" icon="location-o" />
            <van-cell title="单元格" icon="location-o" />
            <van-cell title="单元格" icon="location-o" />
            <van-cell title="单元格" icon="location-o" />
            <van-button @click="handleLogout" type="primary">退出登录</van-button>
            <van-button @click="handleLogin" type="primary">登录</van-button><br/>
            <van-button @click="handleLogout1" type="primary">退出登录(需二级页面(验证码))</van-button>
            <van-button @click="handleLogin1" type="primary">登录(需二级页面(验证码))</van-button>
        </div>
    </section>
</template>

<script>
import { setCookie } from '@/lib/utils'

export default {
    name: 'mySetup',
    created () {
        console.log('mySetup created')
    },
    methods: {
        handleClick () {
            this.goBack({ name: 'my' })
        },
        handleLogout () {
            setCookie('u_login_token', '')
            setCookie('memberCode', '')
            this.replaceRoute({ name: 'loginTabbar', params: { backName: 'home' } })
        },
        handleLogout1 () {
            setCookie('u_login_token', '')
            setCookie('memberCode', '')
            this.replaceRoute({ name: 'login1Tabbar', params: { backName: 'home' } })
        },
        handleLogin () {
            this.$router.push({ name: 'loginPage' })
        },
        handleLogin1 () {
            this.$router.push({ name: 'login1Page' })
        }
    }
}
</script>
