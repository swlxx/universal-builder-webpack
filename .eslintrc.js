module.exports = {
  /* 解析器 */
  "parser": "babel-eslint",
  /* 依赖的规则 */
  "extends": [
    'airbnb-base',
  ],
  "rules": {
    "import/extensions": "none",
    "linebreak-style": "none"
  },
  /* 加入全局的 变量 浏览器环境 和 node 环境的一些api */
  "env": {
    "browser": true,
    "node": true,
  }
};
