<template>
    <section class="my">
        <van-nav-bar title="我的" class="my-navbar" >
            <template #right>
                <van-icon @click="handleToMessage" name="comment-o" size="20" color="#ffffff" />
            </template>
        </van-nav-bar>
        <div class="my-contain" :style="{ backgroundImage: `url(${detail.banner})` }">
            <div class="image" :style="{ backgroundImage: `url(${detail.userAcct.avatar})` }"></div>
            <div class="phone">
                <span>{{detail.userAcct.mobile}}</span>
                <van-icon name="arrow" size="14" /></div>
            <div class="sign">
                <van-icon name="notes-o" size="22" color="#ffffff" />
                <p>签到有礼</p>
            </div>
        </div>
        <div class="contain">
            <van-grid :column-num="navList.length">
                <van-grid-item v-for="item in navList" icon="photo-o" :text="item.content" :key="item.id">
                    <div class="nav-item" :style="{ backgroundImage: `url(${item.path})` }">
                        <p class="number">{{detail[item.numberKey]}}</p>
                        <p class="title">{{item.content}}</p>
                    </div>
                </van-grid-item>
            </van-grid>
            <van-grid :column-num="3" class="fun-grid">
                <van-grid-item v-for="item in funList" icon="photo-o" :text="item.content" :key="item.id" @click="handleLink(item.link)">
                    <div class="fun-item" :style="{ backgroundImage: `url(${item.path})` }">{{item.content}}</div>
                </van-grid-item>
            </van-grid>
            <van-button @click="handleLogout" type="primary">直接退出登录</van-button>
        </div>
        <Tabbar active="my" />
    </section>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import { setCookie } from '@/lib/utils'
export default {
    name: 'my',
    components: {
        Tabbar
    },
    data () {
        return {
            detail: {
                userAcct: {}
            },
            navList: [],
            funList: []
        }
    },
    created () {
        console.log('my created')
        Promise.all([this.getDetail(), this.getList(), this.getBanner()]).then(res => {
            this.detail = res[0].data
            this.detail.banner = process.env.VUE_APP_IMG + res[2].data.adList[0].path
            this.detail.userAcct.avatar = process.env.VUE_APP_QINIU + this.detail.userAcct.avatar
            this.setList(res[1].data.adList)
        }).catch(() => {})
    },
    methods: {
        setList (data) {
            const NavKeyValue = {
                bankPoint: 'bankPoint',
                discountCouponList: 'canUsePacketCount',
                couponList: 'ticNum'
            }
            const NavKeys = Object.keys(NavKeyValue)
            let navList = []
            let funList = []
            data.forEach(item => {
                let link = item.link.split('?')[0]
                item.path = process.env.VUE_APP_IMG + item.path
                if (~NavKeys.indexOf(link)) {
                    item.numberKey = NavKeyValue[link]
                    navList.push(item)
                } else {
                    funList.push(item)
                }
            })
            this.navList = navList
            this.funList = funList
        },
        getDetail () {
            return this.$http.get('/user/view/upgrade/personal/index', {})
        },
        getList () {
            return this.$http.get('/user/ad/list', {
                params: {
                    positionPage: 'personalNavList',
                    terminalType: '100'
                }
            })
        },
        getBanner () {
            return this.$http.get('/user/ad/list', {
                params: {
                    positionPage: 'personalTopBg',
                    terminalType: '100'
                }
            })
        },
        handleToMessage () {
            this.$router.push({ name: 'myMessage' })
        },
        handleLogout () {
            setCookie('u_login_token', '')
            setCookie('memberCode', '')
            this.replaceRoute({ name: 'home', params: { forward: false } })
        },
        handleLink (link) {
            if (link.includes('safeCenter/index')) {
                this.$router.push({ name: 'mySetup' })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.my-navbar {
    background-color: transparent;
    /deep/ div {
        color: #ffffff;
    }
    &:after {
        border-bottom-width: 0;
    }
}
.my-contain {
    margin-top: -46px;
    padding: 56px 20px 14px 37px;
    display: flex;
    align-items: center;
    color: #ffffff;
    background-size: 100% 100%;
    > .image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        background-size: cover;
    }
    > .phone {
        flex: 1;
        display: flex;
        align-items: center;
        margin-left: 20px;
        font-size: 18px;
        > span {
            margin-right: 10px;
        }
    }
    > .sign {
        font-size: 12px;
        text-align: center;
    }
}
.nav-item {
    padding-top: 20px;
    color: #333;
    text-align: center;
    background-position: center top;
    background-size: 16px;
    background-repeat: no-repeat;
    > .number {
        font-size: 20px;
    }
    > .title {
        margin-top: 4px;
        font-size: 12px;
        color: #999;
    }
}
.fun-grid {
    margin-top: 5px;
}
.fun-item {
    padding-top: 39px;
    min-width: 30px;
    color: #333;
    font-size: 14px;
    background-position: center top;
    background-size: 30px;
    background-repeat: no-repeat;
}
</style>
