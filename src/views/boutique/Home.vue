<template>
    <section class="home">
        <div class="header">
            <van-nav-bar ref="navBar" class="nav-bar" :class="navBarBorderBottom" :style="{ backgroundColor: navBarBackgroundColor }">
                <template #left>
                    <van-icon name="arrow-left" size="22" :color="navBarIconColor" />
                </template>
                <template #right>
                    <van-icon name="search" size="22" :color="navBarIconColor" />
                </template>
            </van-nav-bar>
            <van-swipe class="swipe-banner" :autoplay="3000">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <img v-lazy="item.path" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="contain" @scroll="scrollListen">
            <div class="sticky-space"></div>
            <van-swipe
                ref="swipeType"
                class="swipe-type"
                :loop="false"
                :style="{ borderTopLeftRadius: swipeTypeBorderRadius, borderTopRightRadius: swipeTypeBorderRadius }"
            >
                <van-swipe-item v-for="(imgs, index) in types" :key="'type-' + index">
                    <div class="swipe-type-img" v-for="(item, inde) in imgs" :key="'type-img-' + index + inde">
                        <van-image v-if="item.icoUrl" :src="item.icoUrl"></van-image>
                        <p>{{item.name}}</p>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <div class="container">
                <van-grid class="top-image" v-for="(topImgs, index) in topImages" :border="false" :column-num="index === 0 ? 1 : 2" :key="'top-' + index">
                    <van-grid-item v-for="(item, inde) in topImgs" :key="'top-img-' + index + inde">
                        <van-image :src="item.path" />
                    </van-grid-item>
                </van-grid>
                <div class="floor">
                    <div v-for="floor in floors1" :key="'floor1' + floor.floorIndex">
                        <van-swipe class="floor-swipe">
                            <van-swipe-item v-for="(item, index) in floor.floorImageList" :key="'floor1-swpie' + floor.floorIndex + index">
                                <lazy-background-image :image="item.imgUrl" class="floor-background" />
                            </van-swipe-item>
                        </van-swipe>
                        <div class="floor-item">
                            <div v-for="(item, index) in floor.floorProductList" @click="handleToDetail(item.productId)" :key="'floor1-item' + floor.floorIndex + index">
                                <lazy-background-image :image="item.imageUrl" class="floor-image" />
                                <p class="floor-name">{{item.name}}</p>
                                <p class="floor-price"><shop-price :price="item.price" /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <van-swipe class="mid-swipe">
                    <van-swipe-item v-for="(item, index) in midImages" :key="'mid-image-' + index">
                        <img v-lazy="item.path" />
                    </van-swipe-item>
                </van-swipe>
                <div class="floor-bottom">
                    <div v-for="floor in floors2" :key="'floors2' + floor.floorIndex">
                        <van-swipe class="floor-bottom-swipe">
                            <van-swipe-item v-for="(item, index) in floor.floorImageList" :key="'floors2-swpie' + floor.floorIndex + index">
                                <lazy-background-image :image="item.imgUrl" class="floor-bottom-background" />
                            </van-swipe-item>
                        </van-swipe>
                        <div class="floor-bottom-item">
                            <div class="floor-item">
                                <div v-for="(item, index) in floor.floorProductList" @click="handleToDetail(item.productId)" :key="'floors2-item' + floor.floorIndex + index">
                                    <lazy-background-image :image="item.imageUrl" class="floor-image" />
                                    <p class="floor-name">{{item.name}}</p>
                                    <p class="floor-price"><shop-price :price="item.price" /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <Test /> -->
            </div>
        </div>
        <Tabbar active="home" />
    </section>
</template>

<script>
import Tabbar from '@/components/boutique/Tabbar.vue'
import LazyBackgroundImage from '@/components/LazyBackgroundImage.vue'
import Test from './Test.vue'

export default {
    name: 'home',
    components: {
        Tabbar,
        LazyBackgroundImage,
        Test
    },
    data () {
        return {
            banner: [],
            types: [],
            topImages: [],
            midImages: [],
            floors1: [],
            floors2: [],
            navBarBackgroundColor: '',
            navBarIconColor: '#ffffff',
            swipeTypeBorderRadius: ''
        }
    },
    computed: {
        navBarBorderBottom () {
            return this.swipeTypeBorderRadius === '' ? 'none' : ''
        }
    },
    beforeCreate () {
        this.listen = {}
    },
    created () {
        this.getAdvertises()
        this.getTypes()
        this.getFloors()
    },
    methods: {
        getAdvertises () {
            this.$http.post('/user/ad/multipleResults', {
                adParamVos: [
                    { positionPage: 'banner', terminalType: 500 },
                    { positionPage: 'topAd', terminalType: 500 },
                    { positionPage: 'midAd', terminalType: 500 }
                ]
            }).then(res => {
                const topImages = []
                this.banner = res.data.banner.adList.map(item => {
                    item.path = this.imageFix(item.path)
                    return item
                })
                res.data.topAd.adList.forEach((item, index) => {
                    item.path = this.imageFix(item.path)
                    if (index === 0) {
                        topImages[0] = [item]
                    } else {
                        topImages[1] = topImages[1] || []
                        topImages[1].push(item)
                    }
                })
                this.topImages = topImages
                this.midImages = res.data.midAd.adList.map(item => {
                    item.path = this.imageFix(item.path)
                    return item
                })
            })
        },
        getTypes () {
            this.$http.get('/boutique/home/category').then(res => {
                const types = []
                res.data.data.forEach((item, index) => {
                    let num = Math.floor(index / 5)
                    item.icoUrl = this.imageFix(item.icoUrl)
                    types[num] = types[num] || []
                    types[num].push(item)
                })
                types[types.length - 1].push(new Array(5 - types[types.length - 1].length))
                this.types = types
            }).catch(() => {})
        },
        getFloors () {
            this.$http.get('/boutique/home/floor').then(res => {
                const floors1 = []
                const floors2 = []
                res.data.data.forEach(item => {
                    item.floorProductList.forEach(item => {
                        item.imageUrl = this.imageFix(item.imageUrl)
                    })
                    item.floorType === '01' && floors1.push(item)
                    item.floorType === '02' && floors2.push(item)
                })
                this.floors1 = floors1
                this.floors2 = floors2
            }).catch(() => {})
        },
        scrollListen (e) {
            this.listen.swipeTypeOffsetTop = this.listen.swipeTypeOffsetTop || this.$refs.swipeType.$el.offsetTop
            this.listen.navbarOffsetHeight = this.listen.navbarOffsetHeight || this.$refs.navBar.$el.offsetHeight
            let opacity = e.target.scrollTop / (this.listen.swipeTypeOffsetTop - this.listen.navbarOffsetHeight)
            this.navBarBackgroundColor = `rgba(255, 255, 255, ${opacity})`
            this.navBarIconColor = opacity >= 1 ? '#646566' : '#ffffff'
            this.swipeTypeBorderRadius = opacity >= 1 ? '0' : ''
        },
        handleToDetail (productId) {
            this.$router.push({
                name: 'productDetail',
                params: {
                    productId
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home {
    padding-bottom: 50px;
    .header {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .nav-bar {
        background-color: transparent;
        z-index: 2;
        &.none:after {
            border-bottom-width: 0;
        }
    }
    .swipe-banner {
        margin-top: -46px;
        height: 450px;
        /deep/ img {
            width: 100%;
            height: 100%;
            object-position: top;
            object-fit: cover;
        }
    }
    .sticky-space {
        height: 450px;
    }
    .swipe-type {
        position: sticky;
        top: 46px;
        margin-top: -20px;
        padding: 20px 0;
        font-size: 12px;
        text-align: center;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #ffffff;
        transition: border-radius 0.3s;
        z-index: 2;
        /deep/ .van-swipe-item {
            display: flex;
            > div {
                flex: 1;
            }
        }
        &-img {
            padding: 0 12px;
            > p {
                margin-top: 5px;
                color: #333;
            }
        }
    }
    .top-image {
        padding: 0 6px;
        background-color: #ffffff;
        &:first-child {
            /deep/ .van-image {
                height: 110px;
            }
        }
        /deep/ .van-grid-item > div {
            padding: 4px;
        }
        /deep/ .van-image {
            height: 85px;
        }
        /deep/ img {
            border-radius: 6px;
            object-fit: cover;
        }
    }
    .container {
        position: relative;
        background-color: #f5f5f5;
        z-index: 1;
        .floor {
            padding: 20px 12px 10px;
            background-color: #ffffff;
            > div + div {
                margin-top: 30px;
            }
            &-background {
                height: 102px;
            }
            &-item {
                margin-top: 20px;
                padding: 0 10px;
                display: grid;
                grid-template-columns: repeat(3, 33.333%);
                grid-row-gap: 12px;
                > div {
                    padding: 0 10px;
                }
            }
            &-image {
                width: 100%;
                height: 86px;
            }
            &-name {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
                line-clamp: 3;
                -webkit-line-clamp: 3;
                height: 45px;
                line-height: 15px;
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
            &-price {
                margin-top: 5px;
                color: #333333;
            }
        }
        .mid-swipe {
            padding: 15px 0;
            height: 193px;
            background-color: #ffffff;
            /deep/ img {
                padding: 0 12px;
                width: 100%;
                height: 100%;
                object-position: top;
                object-fit: cover;
            }
        }
        .floor-bottom {
            padding: 0 12px;
            background: linear-gradient(180deg, #fff 0%, #f9f9f9 20%, #f8f8f8 100%);
            > div {
                padding-bottom: 20px;
            }
            &-background {
                height: 80px;
            }
            &-item {
                position: relative;
                margin-top: -10px;
                padding: 15px 0;
                background-color: #ffffff;
                border-radius: 10px;
                z-index: 1;
            }
            .floor-item {
                margin-top: 0;
            }
        }
    }
}
</style>
