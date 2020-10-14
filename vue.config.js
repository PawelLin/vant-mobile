const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const config = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-mobile/dist' : '/',
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true // less3 inline JavaScript is not enabled
            }
        }
    },
    devServer: {
        before: function (app) {
            if (!process.env.npm_config_proxydev) {
                app.use(require('connect-cgi-mock')({
                    root: resolve(''),
                    route: '/mock'
                }))
            }
        }
    }
}

if (process.env.npm_config_proxydev) {
    config.devServer.proxy = {
        '/mock': {
            target: 'https://gray.ubank365.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/mock': '/api'
            },
            headers: {
                'referer': 'http://gray.ubank365.com/chaoyang/',
                'host': 'gray.ubank365.com',
                'cookie': 'parentCityId=1563; cityId=1563; u_login_token=pe_token_7AA84185AE765489002070EDDEAB0A7B; memberCode=52002078934; memberOpId=4691d6d93f0763f1; userInfo=\"{\\\"c\\\":\\\"0\\\",\\\"id\\\":\\\"mc_01450787422\\\",\\\"m\\\":\\\"137****4449\\\",\\\"p\\\":\\\"0\\\",\\\"q\\\":\\\"0\\\"}\"; Hm_lvt_395d27779135db02929478405bd6b8ff=1600324171,1600391481,1600674156,1602230195; longitude=; latitude=; isSupport=false; parentCityCode=127; cityCode=; Hm_lvt_6a50b533727d8ef7e2e0353bc8974152=1602209188,1602556493,1602654958; clientTag=%7B%22longitude%22%3A%22%22%2C%22latitude%22%3A%22%22%2C%22uniqueIdentifier%22%3A%22sid_kfm8weiyxm8%22%7D; buttonId=; areaId=1563; cityName=%u6B66%u6C49%u5E02; Hm_lpvt_6a50b533727d8ef7e2e0353bc8974152=1602654977',
                'token': 'pe_token_7AA84185AE765489002070EDDEAB0A7B',
                'memberCode': '52002078934'
            }
        }
    }
}

module.exports = config
