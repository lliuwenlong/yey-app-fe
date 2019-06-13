module.exports = {
    lintOnSave: false,
    publicPath: '/app',
    devServer: {
        proxy: {
            '/Api': {
                target: 'http://106.12.108.135:8911',   //代理接口
                changeOrigin: true
            },
            '/api': {
                target: 'http://106.12.108.135:8911',   //代理接口
                changeOrigin: true
            },
            '/public': {
                target: 'http://106.12.108.135:8911',   //代理接口
                changeOrigin: true
            }
        }
    }
};