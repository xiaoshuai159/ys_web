module.exports = {
  publicPath: '/static',
  // publicPath: './',
  configureWebpack: {
    externals: {
        './cptable': 'var cptable'
    }
  },
  devServer: {
    proxy: {
      '/': {
  
        // target:'https://10.0.8.6:8443',   // fw  admin   123123
        // target:'https://10.8.0.105:8443', 
        // target:'http://10.8.0.5:8080',   //zx   admin   123446
        // target: 'http://10.8.0.5:8080',
        // target:'http://172.26.1.36:80', // 峰哥接口
        // target: 'http://192.168.20.41:8805',
        target:'http://localhost:8082',
        ws: true,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // secure: true, // 如果是https接口，需要配置这个参数  https:false
        pathRewrite: { '^': '' },
        // pathRewrite: {'^/platform':''}
      }
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  },
  // publicPath: '/'
}