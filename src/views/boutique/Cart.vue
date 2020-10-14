<template>
    <section class="cart">
        <van-nav-bar title="购物车">
            <template #right>
                <van-icon name="search" size="22" />
            </template>
        </van-nav-bar>
        <div class="contain">
            <van-cell title="当前商品" :value="nums" />
            <div v-for="item in list" :key="item.productId" class="product-list">
                <van-checkbox v-model="item.isSelected" @click="selectedChange(item)"></van-checkbox>
                <van-card
                    :price="item.money"
                    :title="item.productName"
                    :thumb="item.productImage"
                >
                    <template #num>
                        <van-stepper v-model="item.quantity" @click="quantityChange(item)" />
                    </template>
                </van-card>
            </div>
            <van-submit-bar :price="totalAmount" button-text="提交" @submit="handleSubmit" class="submit-bar">
                <van-checkbox v-model="selected" @click="allSelectedChange">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <Tabbar active="cart" />
    </section>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
    name: 'cart',
    components: {
        Tabbar
    },
    data () {
        return {
            list: [],
            nums: 0,
            totalAmount: 0,
            selected: true
        }
    },
    created () {
        this.getCartDetail()
    },
    methods: {
        getCartDetail () {
            this.$http.get('/boutique/shoppingCart/cartList').then(res => {
                let nums = 0
                res.data.data.productList.forEach(item => {
                    item.productImage = process.env.VUE_APP_QINIU + item.productImage
                    item.money = Number(item.money).toFixed(2)
                    this.$set(item, 'checked', true)
                    nums += item.quantity
                    if (!item.isSelected) {
                        this.selected = false
                    }
                })
                this.totalAmount = res.data.data.totalAmount * 100
                this.nums = nums
                this.list = res.data.data.productList
            }).catch(() => {})
        },
        quantityChange (item) {
            this.$http.post('/boutique/shoppingCart/update', {
                updateProducts: [{
                    merchantId: item.merchantId,
                    productId: item.productId,
                    num: item.quantity
                }]
            }).then(res => {
                this.totalAmount = res.data.data.totalAmount * 100
                this.nums = res.data.data.productList.reduce((total, item) => total + item.quantity, 0)
                console.log(res.data.data.totalAmount)
            }).catch(() => {})
        },
        selectedChange (item) {
            this.$http.post('/boutique/shoppingCart/select', {
                selectProducts: [{
                    merchantId: item.merchantId,
                    productId: item.productId,
                    isSelect: item.isSelected
                }]
            }).then(res => {
                this.totalAmount = res.data.data.totalAmount * 100
                this.selected = !res.data.data.productList.filter(item => !item.isSelected).length
            }).catch(() => {})
        },
        allSelectedChange (e) {
            this.list.forEach(item => {
                item.isSelected = this.selected
            })
            // const selectProducts = this.list.map(item => ({ merchantId: item.merchantId, productId: item.productId, isSelect: checked }))
            // this.$http.post('/boutique/shoppingCart/select', {
            //     selectProducts
            // }).then(res => {
            //     this.totalAmount = res.data.data.totalAmount * 100
            // }).catch(() => {})
        },
        handleSubmit () {

        }
    }
}
</script>

<style lang="less" scoped>
.product-list {
    display: flex;
    padding: 0 10px;
    > div {
        &:first-child {
            width: 30px;
            text-align: center;
        }
        &:last-child {
            flex: 1;
        }
    }
}
.submit-bar {
    bottom: 50px;
}
</style>
