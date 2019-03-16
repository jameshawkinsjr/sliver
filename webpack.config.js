module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist/',
      filename: './javascript/bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    watch: true,
    devtool: 'source-map'
  }