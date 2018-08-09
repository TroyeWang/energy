### Lints and fixes files
```
npm run lint
```
## Build Setup

建议使用yarn 或者 cnpm

yarn
https://yarnpkg.com/zh-Hans/
yarn config set registry https://registry.npm.taobao.org

cnpm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

``` bash
# 初始化项目，添加依赖
yarn add
cnpm install

# 更新所有依赖包或单个依赖包到最新并保存package.json
yarn upgrade --latest
yarn upgrade 包名 --latest

# 启动本地服务 localhost:8080
npm run serve

# 打包生产环境代码
npm run build


```
## Convenient
- [x] 静态词典和参数配置文件 src/common/js/config.js
- [x] 全局混合src/common/js/mixin.js 下的所有的function和mixin
- [x] autoprefixer自动补全适配浏览器的前缀，如：-webkit-、-moz-
- [x] 修改服务端代码自动重启
- [x] 修改客户端代码自动同步到浏览器，小范围修改不会刷新页面



### 样式表命名
* autoprefixer自动补全适配浏览器的前缀，因此可以不用写兼容代码

### JS
* js变量使用驼峰命名，不使用-号分割

### less代码风格
* 如果你的代码中包含大括号，确保大括号与选择器之间留空，冒号后面留空，注释内外前后留空

### 关于路由
* routers 里面 每个js文件为一个模块路由，在main.js中会自动引入，无需手动加入 写法按照src/routers/commom.js

### 关于ajax
* this.$http(url,data={},options={}).then(res=>{}).catch(err=>{})

### 静态文件储存在src/assets下，



