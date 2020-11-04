<template>
    <section class="order-confirm">
        <van-nav-bar title="确认订单" left-arrow @click-left="handleBack"></van-nav-bar>
        <div class="contain">
            <van-cell title="添加收货地址" icon="location-o" is-link />
            <van-card num="2" price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" />
            <van-cell title="数量" value="1件" />
            <van-cell title="总额" value="￥4" />
            <van-coupon-cell :coupons="coupon.useable" :chosen-coupon="coupon.chosen" @click="coupon.show = true" />
            <van-cell title="方豆" label="可用50豆，可抵￥0.50元">
                <template #right-icon>
                    <van-checkbox v-model="bean.use"></van-checkbox>
                </template>
            </van-cell>
            <van-submit-bar :price="3050" label="实付：" button-text="提交订单" @submit="handleSubmit"></van-submit-bar>
            <van-popup v-model="coupon.show" round position="bottom">
                <van-coupon-list :coupons="coupon.useable" :chosen-coupon="coupon.chosen" :disabled-coupons="coupon.disabled" @change="couponChange" @exchange="couponExchange" />
            </van-popup>
        </div>
    </section>
</template>

<script>
export default {
    name: 'orderConfirm',
    data () {
        return {
            detail: {},
            coupon: {
                useable: [],
                disabled: [],
                chosen: -1,
                show: true
            },
            bean: {
                use: false
            }
        }
    },
    created () {
        const { productId, quantity } = this.$route.params
        const data = productId ? { productId, quantity } : {}
        this.getDetail(data)
    },
    // const coupon = {
    //     available: 1,
    //     condition: '无使用门槛\n最多优惠12元',
    //     reason: '',
    //     value: 150,
    //     name: '优惠券名称',
    //     startAt: 1489104000,
    //     endAt: 1514592000,
    //     valueDesc: '1.5',
    //     unitDesc: '元',
    // };
    methods: {
        getDetail (data = {}) {
            this.$http.get('/boutique/ordinary/order/confirm', data).then(res => {
                this.detail = res.data.data
                this.getRedPacket()
            }).catch(() => {})
        },
        getRedPacket () {
            const productList = this.detail.productList.map(({ productId, productStatus: productType, quantity, vipQuantity }) => ({ productId, productType, quantity, vipQuantity }))
            this.$http.post('/boutique/go/redPacket/orderConfirmList', {
                productList
            }).then(res => {
                this.coupon.useable = [...this.couponDataChange(res.data.data.invalidList), ...this.couponDataChange(res.data.data.invalidList)]
                this.coupon.disabled = this.couponDataChange(res.data.data.invalidList)
            }).catch(() => {})
        },
        handleSubmit () {

        },
        couponChange (index) {
            this.coupon.show = false
            this.coupon.chosen = index
        },
        couponExchange () {

        },
        couponDataChange (list = []) {
            return list.map(({ reason, money: valueDesc, name, validTimeStart: startAt, validTimeEnd: endAt, description: condition }) => ({
                reason,
                valueDesc,
                name,
                startAt: startAt / 1000,
                endAt: endAt / 1000,
                unitDesc: '元',
                condition,
                value: valueDesc
            }))
        },
        handleBack () {
            this.$router.go(-1)
        }
    }
}
</script>
