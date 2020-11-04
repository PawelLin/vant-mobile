<template>
    <span class="shop-price">
        <span :style="{ ...emSize, fontWeight: bold ? 'bold' : '' }" lang="en">&#165;&nbsp;</span>
        <span :style="{ ...numSize, fontWeight: bold ? 'bold' : '' }">{{price}}</span>
    </span>
</template>

<script>
export default {
    name: 'shop-price',
    props: {
        price: {
            type: [String, Number],
            default: ''
        },
        fontSize: {
            type: Number,
            default: 0
        },
        bold: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        fixEm: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        emSize () {
            if (!this.fontSize || this.fixEm) return {}
            let fontSize = this.fontSize * this.rateFont
            return {
                fontSize: `${fontSize}px`
            }
        },
        numSize () {
            if (!this.fontSize) return {}
            return {
                fontSize: `${this.fontSize}px`
            }
        }
    },
    data () {
        return {
            rateFont: 12 / 16
        }
    }
}
</script>

<style lang="less" scoped>
.shop-price {
    > span {
        display: inline-block;
        line-height: 0.8;
    }
    > span[lang='en'] {
        position: relative;
        top: -0.3px;
        font-size: 12px;
        // background-color: #999;
    }
    > span:not([lang='en']) {
        font-size: 16px;
        // background-color: #f9c;
    }
}
</style>
