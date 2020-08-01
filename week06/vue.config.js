// 新增一隻名為 vue.config.js 的檔案在專案的根目錄

const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },

  publicPath: '/hex-liveJS-missions/week06/dist/'
};