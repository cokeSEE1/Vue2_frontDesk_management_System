const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 去除map文件
  productionSourceMap:false,
  lintOnSave:false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // changeOrigin: true,
      },
    },
  },
})
