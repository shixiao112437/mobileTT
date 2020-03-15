module.exports = {
  plugins: {
    // 自定给css样式加前缀 -web
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
