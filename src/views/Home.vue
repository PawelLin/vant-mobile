<template>
    <section class="home">
        <div class="contain">
            <van-swipe class="my-swipe" :autoplay="autoplay" indicator-color="white">
                <van-swipe-item class="my-swipe-item" v-for="item in banner" :style="{ backgroundImage: `url(${item})` }" :key="item"></van-swipe-item>
            </van-swipe>
            <van-grid :column-num="3">
                <van-grid-item @click="handleTo(name)" v-for="{ name, icon, title } in list" :key="name" :icon="icon" :text="title" />
            </van-grid>
            <van-button @click="handleClick">跳转demo</van-button>
        </div>
        <van-tabbar>
            <van-tabbar-item icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item @click="handleReplaceMy" icon="search">我的</van-tabbar-item>
        </van-tabbar>
    </section>
</template>

<script>

export default {
    name: 'home',
    data () {
        return {
            autoplay: 3000,
            banner: [
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-5.jpg',
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-6.jpg',
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-4.jpg',
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-3.jpg',
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-2.jpg',
                'http://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-1.jpg'
            ],
            list: [
                { name: 'hero', title: '英雄', icon: 'contact' },
                { title: '皮肤', icon: 'user-o' },
                { title: '铭文', icon: 'bulb-o' },
                { title: '攻略', icon: 'label-o' },
                { name: 'wallpaper', title: '壁纸', icon: 'photo-o' },
                { title: '星元', icon: 'star-o' }
            ]
        }
    },
    created () {
        console.log('created home')
    },
    methods: {
        handleClick () {
            this.$router.push({
                name: 'demo'
            })
        },
        handleTo (name) {
            this.$router.push({ name })
        },
        handleReplaceMy () {
            this.replaceRoute({
                name: 'my'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.my-swipe {
    height: 160px;
    &-item {
        background-position: center top;
        background-size: cover;
    }
}
</style>
