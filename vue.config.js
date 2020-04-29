const config = {
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/dist' : '/',
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true // less3 inline JavaScript is not enabled
            }
        }
    }
}
module.exports = config
