<template>
    <section class="wallpaper">
        <van-nav-bar title="壁纸" left-arrow fixed @click-left="handleClick"></van-nav-bar>
        <van-tabs v-model="active">
            <van-tab title="英雄原画">
                <ul class="images">
                    <li v-for="({ name, image }, index) in hero" :key="image">
                        <lazy-background-image @click.native="handlePreview('hero', index)" :image="image" />
                    </li>
                </ul>
                <!-- <van-image v-for="{ name, image } in hero" :key="image" :src="image" height="200" /> -->
            </van-tab>
            <van-tab title="皮肤原画">
                <ul class="images">
                    <li v-for="({ name, image }, index) in skin" :key="image">
                        <lazy-background-image @click.native="handlePreview('skin', index)" :image="image" />
                    </li>
                </ul>
            </van-tab>
            <van-tab title="Q版原画">
                <ul class="images">
                    <li v-for="({ name, image }, index) in cute" :key="image">
                        <lazy-background-image @click.native="handlePreview('cute', index)" :image="image" />
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
        <van-image-preview v-model="show" :startPosition="startPosition" :images="images" minZoom="1">
            <van-button class="preview-download" slot="cover" icon="down" size="small">下载</van-button>
        </van-image-preview>
    </section>
</template>

<script>
import XBack from '@/lib/back'
import data from './data'
import yaoLu from '@/assets/yao-lu.jpg'
import LazyBackgroundImage from '@/components/LazyBackgroundImage.vue'
export default {
    name: 'wallpaper',
    components: {
        LazyBackgroundImage
    },
    data () {
        return {
            active: 0,
            show: false,
            startPosition: 0,
            hero: [],
            skin: [],
            cute: [],
            images: []
        }
    },
    created () {
        XBack.listen(() => {
            if (this.show) {
                this.show = false
                XBack.perRecord()
            } else {
                this.goBack('home', 1)
            }
        })
        this.hero = data.wallpaper.filter(item => item.type === '1')
        this.skin = data.wallpaper.filter(item => item.type === '2').concat({ name: '瑶', type: '2', image: yaoLu })
        this.cute = data.wallpaper.filter(item => item.type === '3')
    },
    methods: {
        handleClick () {
            this.goBack('home')
        },
        handlePreview (key, index) {
            this.images = this[key].map(item => item.image)
            this.startPosition = index
            this.show = true
        }
    }
}
</script>

<style lang="less" scoped>
.wallpaper {
    padding-top: 46px;
    .images {
        display: flex;
        padding: 5px 5px 0;
        flex-wrap: wrap;
        > li {
            flex-basis: 33.3333%;
            height: 200px;
            margin-bottom: 5px;
            &:nth-child(3n + 1) {
                padding-right: 2.5px;
            }
            &:nth-child(3n + 2) {
                padding-left: 2.5px;
                padding-right: 2.5px;
            }
            &:nth-child(3n + 3) {
                padding-left: 2.5px;
            }
        }
    }
    .preview-download {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
