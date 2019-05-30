module.exports = {
    lintOnSave: false,
    publicPath: '/app',
    devServer: {
        proxy: {
            '/Api': {
                target: 'http://192.168.1.24:80',   //代理接口
                changeOrigin: true
            },
            '/api': {
                target: 'http://192.168.1.24:80',   //代理接口
                changeOrigin: true
            }
        }
    }
};