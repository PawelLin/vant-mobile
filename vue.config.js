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
                'cookie': 'clientTag=%7B%22longitude%22%3A%22%22%2C%22latitude%22%3A%22%22%2C%22uniqueIdentifier%22%3A%22%22%7D; Hm_lvt_6a50b533727d8ef7e2e0353bc8974152=1600761348; parentCityId=465; areaId=465; cityId=465; parentCityCode=58; cityName=%u6C88%u9633%u5E02; cityCode=; longitude=; latitude=; isSupport=true; buttonId=; u_login_token=pe_token_39C62FEC952B0A931E5FAEA3E53CB528; memberCode=52002078934; memberOpId=4691d6d93f0763f1; userInfo="{\\"c\\":\\"0\\",\\"id\\":\\"mc_01450787422\\",\\"m\\":\\"137****4449\\",\\"p\\":\\"0\\",\\"q\\":\\"0\\"}"; Hm_lpvt_6a50b533727d8ef7e2e0353bc8974152=1600761397',
                'token': 'pe_token_39C62FEC952B0A931E5FAEA3E53CB528',
                'memberCode': '52002078934'
            }
        }
    }
}

module.exports = config
