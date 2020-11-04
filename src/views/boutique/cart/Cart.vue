<template>
    <section class="cart">
        <van-nav-bar title="购物车" :left-arrow="!isTabbar" @click-left="handleBack">
            <template #right>
                <a class="manage" href="javascript:;">管理</a>
            </template>
        </van-nav-bar>
        <div class="contain">
            <van-cell title="当前商品" :value="nums" />
            <div v-for="item in list" :key="item.productId" class="product-list">
                <van-checkbox v-model="item.isSelected" @click="!item.disabled && selectedChange(item)" :disabled="item.disabled"></van-checkbox>
                <van-card
                    :price="item.money"
                    :title="item.productName"
                    :thumb="item.productImage"
                    :disabled="item.disabled"
                >
                    <template #num>
                        <span v-if="item.disabled">无效</span>
                        <van-stepper v-else v-model="item.quantity" @change="quantityChange(item)" />
                    </template>
                </van-card>
            </div>
            <van-submit-bar :price="totalAmount" button-text="提交" @submit="handleSubmit" :class="isTabbar ? 'submit-bar' : ''">
                <van-checkbox v-model="selected" @click="allSelectedChange">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <Tabbar v-if="isTabbar" active="cart" />
    </section>
</template>

<script>
import Tabbar from '@/components/boutique/Tabbar.vue'
export default {
    props: {
        isTabbar: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Tabbar
    },
    data () {
        return {
            list: [],
            nums: 0,
            totalAmount: 0,
            selected: false
        }
    },
    created () {
        this.getCartDetail()
    },
    methods: {
        getCartDetail () {
            this.$http.get('/boutique/shoppingCart/cartList').then(res => {
                let nums = 0
                let selected = true
                res.data.data.productList.forEach(item => {
                    item.productImage = this.imageFix(item.productImage)
                    item.money = Number(item.money).toFixed(2)
                    item.disabled = item.status === '2'
                    nums += item.quantity
                    if (!item.disabled && !item.isSelected) {
                        selected = false
                    }
                })
                this.selected = selected
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
                this.selected = !res.data.data.productList.filter(item => item.status !== '2' && !item.isSelected).length
            }).catch(() => {})
        },
        allSelectedChange (e) {
            this.list.forEach(item => {
                if (!item.disabled) {
                    item.isSelected = this.selected
                }
            })
            const selectProducts = this.list.filter(item => !item.disabled).map(item => ({ merchantId: item.merchantId, productId: item.productId, isSelect: this.selected }))
            this.$http.post('/boutique/shoppingCart/select', {
                selectProducts
            }).then(res => {
                this.totalAmount = res.data.data.totalAmount * 100
            }).catch(() => {})
        },
        handleSubmit () {

        },
        handleBack () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.manage {
    color: #1989fa;
}
.contain {
    padding-bottom: 108px;
    background-color: #ffffff;
}
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
    /deep/ .van-card[disabled=disabled]:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.6);
    }
}
.submit-bar {
    bottom: 50px;
}
</style>
