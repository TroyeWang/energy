/*** 配置api接口地址***/

const NODE_ENV = process.env.VUE_APP_API || 'development'
const API_URL = {
    // development: '/api/', //开发环境做个代理，防止跨域限制，在下面代理配置里修改Ip
    development: 'http://192.168.2.158:8888', // 开发测试环境
    test: '', // 正式测试环境
    production: '' // 生产环境
}

export default API_URL[NODE_ENV]