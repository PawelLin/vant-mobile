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
    if (process.env.NODE_ENV === 'production') {
        config.devServer.proxy = {
            '/mock': {
                target: 'https://www.ubank365.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': '/api'
                },
                headers: {
                    'referer': 'https://www.ubank365.com/froadmall/',
                    'host': 'www.ubank365.com',
                    'cookie': 'cityId=1563; parentCityId=1563; memberOpId=4691d6d93f0763f1; isSupport=false; latitude=; longitude=; parentCityCode=127; cityCode=; areaId=1563; cityName=%u6B66%u6C49%u5E02; Hm_lvt_395d27779135db02929478405bd6b8ff=1600391481,1600674156,1602230195,1602731390; clientTag=%7B%22longitude%22%3A%22%22%2C%22latitude%22%3A%22%22%2C%22uniqueIdentifier%22%3A%22sid_keku9y9yyqa%22%7D; imgToken=fe7e3fd7576343fca187725fad3992cf; u_login_token=pe_token_85248C02F83751032AA9FE556F1EFD26; memberCode=50005113797; userInfo="{\"c\":\"0\",\"id\":\"pawel\",\"m\":\"137****4449\",\"p\":\"1\",\"q\":\"1\"}"; Hm_lpvt_395d27779135db02929478405bd6b8ff=1602731423',
                    'token': 'pe_token_85248C02F83751032AA9FE556F1EFD26',
                    'memberCode': '50005113797'
                }
            }
        }
    } else {
        config.devServer.proxy = {
            '/mock': {
                target: 'https://gray.ubank365.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/mock': '/api'
                },
                headers: {
                    'referer': 'https://gray.ubank365.com/chaoyang/',
                    'host': 'gray.ubank365.com',
                    'cookie': 'parentCityId=1563; cityId=1563; memberOpId=4691d6d93f0763f1; longitude=; latitude=; isSupport=false; parentCityCode=127; cityCode=; areaId=1563; cityName=%u6B66%u6C49%u5E02; Hm_lvt_395d27779135db02929478405bd6b8ff=1600674156,1602230195,1602731390,1602811031; Hm_lpvt_395d27779135db02929478405bd6b8ff=1602817494; Hm_lvt_6a50b533727d8ef7e2e0353bc8974152=1602556493,1602654958,1602742079,1602819031; clientTag=%7B%22longitude%22%3A%22%22%2C%22latitude%22%3A%22%22%2C%22uniqueIdentifier%22%3A%22sid_kfm8weiyxm8%22%7D; imgToken=44f8f08d415d42108c4d7d3e3969e204; u_login_token=pe_token_8D5C80B01ED0A18FE80A7CE1AE92C1A5; memberCode=52002078934; userInfo=\"{\\\"c\\\":\\\"0\\\",\\\"id\\\":\\\"mc_01450787422\\\",\\\"m\\\":\\\"137****4449\\\",\\\"p\\\":\\\"0\\\",\\\"q\\\":\\\"0\\\"}\"; Hm_lpvt_6a50b533727d8ef7e2e0353bc8974152=1602820460',
                    'token': 'pe_token_8D5C80B01ED0A18FE80A7CE1AE92C1A5',
                    'memberCode': '52002078934'
                }
            }
        }
    }
}

module.exports = config
