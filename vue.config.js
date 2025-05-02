module.exports = {
    // 只在生产环境中设置 publicPath，避免开发环境出错
    publicPath: process.env.NODE_ENV === 'production'
      ? '/graduation/' // 这里是你的 GitHub 仓库名
      : '/'
  }