module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // 根据设计稿的尺寸/10 得到 rootValue的值
      // 我们自己的设计稿75
      // vant组件的rootValue设置为37.5
      // 区分设置
      // rootValue: 75,
      rootValue: (arg) => {
        // 处理的文件对象
        return arg.file.includes('vant') ? 37.5 : 75
      },
        propList: ['*']
    }
  }
}
