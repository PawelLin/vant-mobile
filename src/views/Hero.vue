<template>
    <section class="hero">
        <van-nav-bar title="英雄" left-arrow @click-left="handleClick"></van-nav-bar>
        <div class="contain">
            <van-sidebar ref="side" class="side" v-model="active">
                <van-sidebar-item @click="handleActive(type)" v-for="{ title, type } in side" :title="title" :key="type" />
            </van-sidebar>
            <van-grid ref="grid" class="grid" :column-num="3">
                <van-grid-item v-for="{ name, image, show } in list" v-show="show" :key="name" icon="photo-o">
                    <van-image :ref="(show && 'images') || null" class="hero-image" :src="image" @click="handleToPage(name)" lazy-load />
                </van-grid-item>
            </van-grid>
        </div>
    </section>
</template>

<script>
import data from './data'
export default {
    name: 'hero',
    data () {
        return {
            active: '0',
            // type 0-全部 1-坦克 2-战士 3-刺客 4-法师 5-射手 6-辅助 tiger-五虎 beauty-四大美女
            side: [
                { title: '全部', type: '0' },
                { title: '坦克', type: '1' },
                { title: '战士', type: '2' },
                { title: '刺客', type: '3' },
                { title: '法师', type: '4' },
                { title: '射手', type: '5' },
                { title: '辅助', type: '6' },
                { title: '五虎', type: 'tiger' },
                { title: '四大美女', type: 'beauty' }
            ],
            list: []
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
            this.list = data.hero.map(item => (item.show = true) && item)
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
