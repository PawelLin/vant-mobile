<template>
    <section>
        <div class="contain">
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
            <h1>我的</h1>
        </div>
        <van-tabbar value="my">
            <van-tabbar-item @click="handleReplaceHome" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="my" icon="search">我的</van-tabbar-item>
        </van-tabbar>
    </section>
</template>

<script>
export default {
    name: 'my',
    data () {
        return {
        }
    },
    methods: {
        handleReplaceHome () {
            this.replaceRoute({
                name: 'home'
            })
        }
    }
}
</script>
