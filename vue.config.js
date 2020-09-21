const webpack = require('webpack')

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    configureWebpack: {


        plugins: [
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                $: "jquery"
            })
        ]
    },
    chainWebpack: (config) => {
        config.module
            .rule('worker')
            .test(/\.worker\.js$/)
            .use('worker-loader').loader('worker-loader')
            .options({
                inline: true,
                fallback: false
            }).end();
    }
}