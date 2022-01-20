module.exports = {
    productionSourceMap: false,
    lintOnSave: false,
    configureWebpack: {
        plugins: [

        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
                minSize: 20000,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    vue: {
                        chunks: 'all',
                        test: /node_modules\\vue/
                    },
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/
                    }
                }
            }
        }
    }
};
