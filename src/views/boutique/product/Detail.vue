<template>
    <section class="product">
        <van-nav-bar title="商品详情" left-arrow @click-left="handleBack">
            <template #right>
                <van-icon @click="handleToCart" name="cart-o" size="22" :badge="nums.cart" />
            </template>
        </van-nav-bar>
        <div class="contain">
            <van-swipe class="product-banner" :autoplay="3000">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <lazy-background-image :image="item" />
                </van-swipe-item>
            </van-swipe>
            <div class="product-message">
                <p class="product-name">{{detail.fullName}}</p>
                <p class="product-desc">{{detail.briefIntroduction}}</p>
                <p class="product-price van-hairline--bottom"><shop-price :price="detail.price" :font-size="22" bold /></p>
            </div>
            <van-cell>
                <template #title>
                    <span class="cell-gray">运输费用</span>
                    <span class="cell-black">免邮费 为您而省</span>
                </template>
            </van-cell>
            <van-cell @click="handleShowService" is-link>
                <template #title>
                    <span class="cell-gray">基础服务</span>
                    <span class="cell-black">7天无理由退换货，正品保障</span>
                </template>
            </van-cell>
            <van-tabs class="product-contain" v-model="active">
                <van-tab title="商品详情">
                    <lazy-component v-html="detail.introduction" class="product-detail">
                    </lazy-component>
                </van-tab>
                <van-tab title="售后服务">
                    <lazy-component v-html="detail.afterShop">
                    </lazy-component>
                </van-tab>
            </van-tabs>
            <van-goods-action class="product-bottom van-hairline--top">
                <van-stepper v-model="nums.add" disable-input />
                <van-goods-action-button @click="handleAddCart" type="warning" text="加入购物车" />
                <van-goods-action-button @click="handleBuy" type="danger" text="立即购买" />
            </van-goods-action>
        </div>
        <van-action-sheet v-model="showService" title="基础服务">
            <div class="product-service">
                <div v-for="item in services" :key="item.type">
                    <div class="product-service-image" :class="`product-service-image-${item.type}`"></div>
                    <div>
                        <p class="product-service-title">{{item.title}}</p>
                        <p class="product-service-desc" v-html="item.desc"></p>
                    </div>
                </div>
            </div>
        </van-action-sheet>
    </section>
</template>

<script>
import { isLogin } from '@/lib/utils'
import LazyBackgroundImage from '@/components/LazyBackgroundImage.vue'
export default {
    name: 'productDetail',
    components: {
        LazyBackgroundImage
    },
    data () {
        return {
            active: 0,
            showService: false,
            detail: {},
            banner: [],
            nums: {
                cart: '',
                add: 1
            }
        }
    },
    beforeCreate () {
        this.services = [
            { title: '正品保障', desc: '52商超承诺所售商品均为正品', type: 'genuine' },
            { title: '积分抵扣', desc: '52商超商品可使用积分进行现金抵扣', type: 'integral' },
            { title: '7天无理由退换货', desc: '购买商品签收7天内，在保证商品不影响<br/>二次销售的情况下，可申请无理由退换货', type: 'return' },
            { title: '全场包邮', desc: '52商超商品全场包邮', type: 'transport' }
        ]
    },
    created () {
        this.getDetail(this.$route.params.productId)
        this.getCartNumber()
    },
    methods: {
        getDetail (productId) {
            this.$http.get('/boutique/products/product/detail', {
                params: { productId }
            }).then(res => {
                // res.data.data.productDetail.introduction = this.setIntroduction(res.data.data.productDetail.introduction)
                this.detail = res.data.data.productDetail
                this.banner = res.data.data.productDetail.imageUrls.map(item => this.imageFix(item))
                console.log(res.data)
            }).catch(() => {})
        },
        getCartNumber () {
            this.$http.get('/boutique/shoppingCart/productCount').then(res => {
                this.nums.cart = res.data.data.cartProductCount
            }).catch(() => {})
        },
        handleShowService () {
            this.showService = true
        },
        setIntroduction (html) {
            const dom = document.createElement('div')
            dom.innerHTML = html
            Array.from(dom.querySelectorAll('img')).forEach(img => {
                img.setAttribute('v-lazy', img.src)
                img.removeAttribute('src')
            })
            return dom.innerHTML
        },
        handleToCart () {
            this.$router.push({
                name: 'cartPage'
            })
        },
        handleBack () {
            this.$router.go(-1)
        },
        handleAddCart () {
            this.$http.post('/boutique/shoppingCart/add', {
                merchantId: this.detail.merchantId,
                num: this.nums.add,
                productId: this.detail.productId
            }).then(res => {
                this.nums.cart += this.nums.add
                this.$toast(res.data.message)
            }).catch(() => {})
        },
        handleBuy () {
            this.$router.push({
                name: 'orderConfirm',
                params: {
                    productId: this.detail.productId,
                    quantity: this.nums.add
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.product {
    padding-bottom: 50px;
    &-banner {
        height: 375px;
    }
    &-message {
        padding: 16px 16px 0;
        background-color: #ffffff;
    }
    &-name {
        font-size: 18px;
        color: #333;
    }
    &-desc {
        margin-top: 5px;
        font-size: 16px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &-price {
        margin-top: 5px;
        padding-bottom: 5px;
        font-size: 22px;
        color: #F4430D;
    }
    &-contain {
        margin: 5px 0 10px;
        background-color: #ffffff;
        /deep/ img {
            max-width: 100%;
        }
    }
    &-detail {
        padding: 16px;
    }
    &-bottom {
        padding: 0 16px;
    }
    &-service {
        padding: 0 16px;
        color: #333;
        > div {
            display: flex;
            align-items: center;
            padding: 18px 25px;
        }
        > div:nth-child(2n + 1) {
            background-color: #FBFBFB;
        }
        &-image {
            margin-right: 15px;
            width: 36px;
            height: 36px;
            background-size: cover;
            @servicesTypes: genuine, integral, return, transport;
            each(@servicesTypes, {
                &-@{value} {
                    background-image: url('~@/assets/boutique/product/icon-@{value}.png');
                }
            })
        }
        &-title {
            font-size: 15px;
            font-weight: bold;
        }
        &-desc {
            margin-top: 8px;
            font-size: 12px;
            line-height: 1.3;
        }
    }
}
.cell-gray {
    color: #999;
    font-size: 12px;
}
.cell-black {
    margin-left: 15px;
    color: #333;
    font-size: 12px;
}
</style>
