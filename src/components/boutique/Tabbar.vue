<template>
    <van-tabbar :value="active">
        <van-tabbar-item @click="handleReplace('home')" name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item @click="handleReplace('sort')" name="sort" icon="label-o">分类</van-tabbar-item>
        <van-tabbar-item @click="handleReplace('cart')" name="cart" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item @click="handleReplace('my')" name="my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { isLogin } from '@/lib/utils'

export default {
    props: {
        active: String
    },
    methods: {
        handleReplace (name) {
            if (name !== this.active) {
                if (isLogin() || (name !== 'my' && name !== 'cart')) {
                    this.$store.commit('setTransition', false)
                    this.replaceRoute({
                        name
                    })
                } else {
                    if (name === 'my') {
                        this.$router.push({ name: 'loginTabbar', params: { toName: name } })
                    } else {
                        this.$router.push({ name: 'login1Tabbar', params: { toName: name } })
                    }
                }
            }
        }
    }
}
</script>
