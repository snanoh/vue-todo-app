const path = require('path') // 파일이나 디렉터리 경로를 다루기 위한 NodeJS 기본 모듈
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

require('@babel/polyfill')

module.exports = (env, opts) => {
  const config = {
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
        '~': path.join(__dirname),
        'scss': path.join(__dirname, './scss')
      }
    },
    // 진입점 index
    entry: {
      app: [
        '@babel/polyfill',
        path.join(__dirname, 'main.js')
      ]
    },
    // 결과물에 대한 설정 like war 설정
    output: {
      filename: '[name].js', // app.js
      path: path.join(__dirname, 'dist') // dir라는 폴더에 넣어주게 됨
    },
    // viewresolver
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        // $ 확장자를 찾는다는 의미
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new VueLoaderPlugin(),
      // assets 디렉터리의 내용을 `dist` 디렉터리에 복사합니다
      new CopyPlugin({
        patterns: [
          { from: 'assets', to: '' }
        ]
      })
    ]
  }

  if (opts.mode === 'development') {
    return merge(config, {
      // 빌드 시간이 적고, 디버깅이 가능한 방식
      devtool: 'eval',
      devServer: {
        // 자동으로 기본 브라우저를 오픈합니다
        open: false,
        // HMR, https://webpack.js.org/concepts/hot-module-replacement/
        hot: true
      }

    })
  } else {
    return merge(config, {
      // 용량이 적은 방식
      devtool: 'cheap-module-source-map',
      plugins: [
        // 빌드(build) 직전 `output.path`(`dist` 디렉터리) 내 기존 모든 파일 삭제
        new CleanWebpackPlugin()
      ]
    })
  }
}
