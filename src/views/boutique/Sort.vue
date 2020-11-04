<template>
    <section class="sort">
        <van-nav-bar title="分类">
            <template #right>
                <van-icon name="search" size="22" />
            </template>
        </van-nav-bar>
        <div class="contain">
            <van-sidebar ref="side" class="side van-hairline--right" v-model="active" @change="handleActive">
                <van-sidebar-item v-for="{ name, id } in sides" :title="name" :key="id" />
            </van-sidebar>
            <van-grid ref="grid" class="grid" :column-num="3" :border="false">
                <van-grid-item v-for="{ name, id, icoUrl, show } in grids" v-show="show === active" :key="id + '' + show">
                    <van-image :ref="(show === active && 'images') || null" :src="icoUrl" class="image" lazy-load />
                    <p class="name">{{name}}</p>
                </van-grid-item>
            </van-grid>
        </div>
        <Tabbar active="sort" />
    </section>
</template>

<script>
import Tabbar from '@/components/boutique/Tabbar.vue'
export default {
    name: 'sort',
    components: {
        Tabbar
    },
    data () {
        return {
            active: 0,
            sides: [],
            grids: []
        }
    },
    activated () {
        console.log('activated', this.scroll)
        this.$refs.side.$el.scrollTop = this.scroll.side
        this.$refs.grid.$el.scrollTop = this.scroll.grid
    },
    beforeCreate () {
        this.scroll = { side: 0, grid: 0 }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            this.$http.get('/boutique/product/categoryIndex').then(res => {
                const sides = []
                const grids = []
                res.data.data.categoryList.forEach((item, index) => {
                    grids.push(...item.subCategroyList.map(ite => ({ ...ite, show: index, icoUrl: this.imageFix(ite.icoUrl) })))
                    delete item.subCategroyList
                    sides.push(item)
                })
                this.sides = sides
                this.grids = grids
            }).catch(() => {})
        },
        handleActive (index) {
            if (index !== 0) {
                this.$nextTick(() => {
                    this.$refs.images.forEach(image => {
                        image.$forceUpdate()
                    })
                })
            }
        }
    },
    beforeRouteLeave (to, from, next) {
        this.scroll.side = this.$refs.side.$el.scrollTop
        this.scroll.grid = this.$refs.grid.$el.scrollTop
        next()
    }
}
</script>

<style lang="less" scoped>
#app > .sort {
    padding-bottom: 50px;
    background-color: #ffffff;
    .contain {
        display: flex;
        align-items: flex-start;
        height: 100%;
        .side {
            width: auto;
            height: 100%;
            /deep/ .van-sidebar-item {
                padding: 12px;
                background-color: transparent;
                border-left: 0;
                > div {
                    padding: 2px 5px;
                    white-space: nowrap;
                }
            }
            /deep/ .van-sidebar-item--select {
                border-color: #258DF2;
                > div {
                    background-color: #E64920;
                    border-radius: 12px;
                    color: #ffffff;
                }
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
            .image {
                width: 60px;
                height: 60px;
                pointer-events: none;
            }
            .name {
                margin-top: 5px;
                font-size: 12px;
                color: #787878;
            }
        }
    }
}
</style>
