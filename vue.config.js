let publicPath = process.env.NODE_ENV === 'production' ? '/' : '/';
const path = require('path');
module.exports = {
  publicPath: publicPath,
  outputDir: 'dist',
  devServer: {
    port: 8180,
    host: '127.0.0.1',
    https: true,
    hotOnly: true,
    disableHostCheck: true,
    open: true,
    before: (app) => {
      app;
    },
  },
  // transpileDependencies: ['vue-echarts', 'resize-detector'],
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('~', path.resolve(__dirname, 'packages/'));
    // 修复HMR
    config.resolve.symlinks(true);
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
    }
  },
};
