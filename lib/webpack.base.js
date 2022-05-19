const HtmlWebapckPlugin = require('html-webpack-plugin');
const CleanWebackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const glob = require('glob');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  let htmlWebapckPlugins = [
    ...glob.sync(path.join(projectRoot, './src/*/index.js').replace(/\\/g, '/')),
  ];

  htmlWebapckPlugins = htmlWebapckPlugins.map((_entry) => {
    const match = _entry.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = _entry;
    return new HtmlWebapckPlugin({
      template: path.join(projectRoot, `src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: ['vendors', pageName],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
    });
  });
  return {
    entry,
    htmlWebapckPlugins,
  };
};

const { entry, htmlWebapckPlugins } = setMPA();

module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/i,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
      },
      {
        test: /.css$/i,
        use: [
          /* 'style-loader', */
          /* 与 style-loader 冲突
          style-loader 是把css 提取到页面heade标签中的style
          MiniCssExtractPlugin.loader 是把css 提取成单独的文件 */
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /.less$/i,
        /* 链式从右到左执行 */
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  /* [最新的两个版本, 使用人数所占的比例, ''] */
                  /* browsers: ['last 2 version', '>1%', 'ios 7'] */
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              /* 1rem = 75px */
              remUnit: 75,
              /* 转换后的小数点后的位数 */
              remPrecesion: 8,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg|webp|woff|woff2|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            /* 图片的文件指纹 */
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
      /* {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          'file-loader',
        ]
      } */
    ],
  },
  plugins: [
    new CleanWebackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    /* 手动捕获 编译错误 */
    function ErrorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          global.console.log('build error');
          process.exit(1);
        }
      });
    },
    ...htmlWebapckPlugins,
  ],
  stats: 'errors-only',
};
