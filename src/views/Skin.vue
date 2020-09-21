<template>
    <section class="hero">
        <van-nav-bar title="皮肤" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <van-sidebar ref="side" class="side" v-model="active">
                <van-sidebar-item @click="handleActive(type)" v-for="{ title, type } in side" :title="title" :key="type" />
            </van-sidebar>
            <van-grid ref="grid" class="grid" :column-num="2">
                <van-grid-item v-for="{ name, image, show } in list" v-show="show" :key="name" icon="photo-o">
                    <van-image :ref="(show && 'images') || null" class="hero-image" :src="image" @click="handleToPage(name)" lazy-load />
                </van-grid-item>
            </van-grid>
        </div>
    </section>
</template>

<script>
import image1 from '@/assets/skin/嫦娥-如梦令.jpg'
import image2 from '@/assets/skin/后羿-如梦令.jpg'
import image3 from '@/assets/skin/大乔-猫狗日记.jpg'
import image4 from '@/assets/skin/孙策-猫狗日记.jpg'
import image5 from '@/assets/skin/貂蝉-圣诞恋歌.jpg'
import image6 from '@/assets/skin/吕布-圣诞狂欢.jpg'
import image7 from '@/assets/skin/王昭君-凤凰于飞.jpg'
import image8 from '@/assets/skin/李白-凤求凰.jpg'
import image9 from '@/assets/skin/孙尚香-时之恋人.jpg'
import image10 from '@/assets/skin/刘备-时之恋人.jpg'
import image11 from '@/assets/skin/小乔-纯白花嫁.jpg'
import image12 from '@/assets/skin/周瑜-真爱至上.jpg'
import image13 from '@/assets/skin/孙悟空-大圣娶亲.jpg'
import image14 from '@/assets/skin/露娜-一生所爱.jpg'
import image15 from '@/assets/skin/孙悟空-至尊宝.jpg'
import image16 from '@/assets/skin/露娜-紫霞仙子.jpg'
export default {
    name: 'skin',
    data () {
        return {
            active: '0',
            // type 0-全部 1-坦克 2-战士 3-刺客 4-法师 5-射手 6-辅助 tiger-五虎 beauty-四大美女
            side: [
                { title: '全部', type: '0' },
                { title: '伴生', type: '1' },
                { title: '勇者', type: '2' },
                { title: '史诗', type: '3' },
                { title: '传说', type: '4' },
                { title: '世冠', type: '5' },
                { title: '情侣', type: '6' },
                { title: '六元', type: 'tiger' },
                { title: '限定', type: 'beauty' }
            ],
            list: [
                { name: '凤求凰', image: image8, show: true },
                { name: '凤凰于飞', image: image7, show: true },
                { name: '时之恋人', image: image10, show: true },
                { name: '时之恋人', image: image9, show: true },
                { name: '如梦令', image: image1, show: true },
                { name: '如梦令', image: image2, show: true },
                { name: '猫狗日记', image: image3, show: true },
                { name: '猫狗日记', image: image4, show: true },
                { name: '圣诞恋歌', image: image5, show: true },
                { name: '圣诞狂欢', image: image6, show: true },
                { name: '纯白花嫁', image: image11, show: true },
                { name: '真爱至上', image: image12, show: true },
                { name: '一生所爱', image: image14, show: true },
                { name: '大圣娶亲', image: image13, show: true },
                { name: '紫霞仙子', image: image16, show: true },
                { name: '至尊宝', image: image15, show: true }
            ]
        }
    },
    activated () {
        console.log('Hero activated')
        this.$refs.side.$el.scrollTop = this.scroll.side
        this.$refs.grid.$el.scrollTop = this.scroll.grid
    },
    beforeCreate () {
        console.log('Hero beforeCreate')
        this.scroll = { side: 0, grid: 0 }
    },
    created () {
        this.delayInit(() => {
            // this.list = data.hero.map(item => (item.show = true) && item)
        })
    },
    mounted () {
        console.log('Hero mounted')
        console.log(this.$refs)
    },
    methods: {
        handleClick () {
            this.goBack({ name: 'home' })
        },
        handleActive (active) {
            this.scroll.grid = this.$refs.grid.$el.scrollTop = 0
            this.list.forEach(item => { item.show = active === '0' || item.type.indexOf(active) > -1 })
            if (active !== '0') {
                this.$nextTick(() => {
                    this.$refs.images.forEach(image => {
                        image.$forceUpdate()
                    })
                })
            }
        },
        handleToPage (title) {
            this.scroll.side = this.$refs.side.$el.scrollTop
            this.scroll.grid = this.$refs.grid.$el.scrollTop
            this.$router.push({ name: 'hero_detail', query: { title } })
        }
    }
}
</script>

<style lang="less" scoped>
.hero {
    .contain {
        display: flex;
        align-items: flex-start;
        height: 100%;
        .side{
            max-height: 100%;
            /deep/ .van-sidebar-item--select {
                border-color: #258DF2;
            }
        }
        .grid {
            flex: 1;
            max-height: 100%;
            overflow-y: auto;
            /deep/ .van-grid-item__content {
                height: auto;
            }
            &:after {
                border-top-width: 0;
            }
        }
    }
    &-image {
        width: 69px;
        height: 69px;
        /deep/ img {
            border: 2px solid #258DF2;
            border-radius: 10px 0 10px 0;
        }
    }
}
</style>
