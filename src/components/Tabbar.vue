<template>
    <van-tabbar :value="active">
        <van-tabbar-item @click="handleReplace('home')" name="home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item @click="handleReplace('my')" name="my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    props: {
        active: String
    },
    methods: {
        handleReplace (name) {
            if (name !== this.active) {
                this.replaceRoute({
                    name
                })
            }
        }
    }
}
</script>
