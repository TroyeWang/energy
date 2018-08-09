'use strict'

import axios from 'axios'
var qs = require('qs');
import api from './config/api'

// 申请一个新的http实例
const instance = axios.create({
    baseURL: api + '/erp',
    method: 'post',
    timeout: 60000, // 设置超时时间为60秒
    validateStatus(status) {
        return (status >= 200 && status < 300) || status === 304
    },
    toastDuration: 3000,
    errBack: false // 接口错误是否自动回退上一个页面
})

let nonce = Date.now()
const
    rts = /([?&])_=[^&]*/,
    rquery = (/\?/)

// 添加请求拦截器
instance.interceptors.request.use(config => {
    console.log(config)
    let url = config.url
    if (url.indexOf('/') !== 0) {
        url = '/' + url
    }
    config.url = api + url

    // 防止页面缓存
    if (!config.method || (config.method.toLocaleLowerCase() === 'get' && !config.cache)) {
        url = rts.test(url) ? url.replace(rts, '$1_=' + nonce++) : url + (rquery.test(url) ? '&' : '?') + '_=' + nonce++
            delete config.cache
    }

    // 简化类型设置
    const headers = config.headers = config.headers || {}
    if (config.type === 'json') {
        headers['Content-Type'] = 'application/json; charset=UTF-8'
        delete config.type
    }

    if (config.file) {
        headers['Content-Type'] = 'multipart/form-data'
        headers['Accept'] = '*/*'
        // 上传文件
        let formData = new FormData()
        for (const key in config.data) {
            formData.append(key, config.data[key])
        }
        for (const key in config.file) {
            if (config.file.hasOwnProperty(key)) {
                formData.append(key, config.file[key])
            }
        }

        config.data = formData
        delete config.file
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    const data = res.data
    // 获取错误状态码
    switch (parseInt(data.code, 10)) {
        case 100007:
            // storage.user = null
            let thisUrl = window.location.href
            if (location.pathname !== '/login') {
                setTimeout(() => {
                    location.href = '/login?backto=' + encodeURIComponent(thisUrl)
                }, 200)
            }
            return Promise.reject(new Error(data.message))
        default:
            return data
    }
}, (error) => {
    const response = error.response
    if (response) {
        let
            data = response.data,
            status = response.status
        let errMessage = data.message || '未知异常'
        switch (status) {
            case 500:
                // let code = +data.code;
                errMessage = '服务器开小差了，请稍候再试'
                break
            default:
                errMessage = '接口请求失败！'
                break
        }
        // 全局错误提示
        if (error.config.toast !== false) {
            console.error(errMessage)
        }
    } else {
        // 默认放一个空对象避免其他地方报错
        error.response = {}
        console.error(error.config.url, '请求接口超过一分钟无响应')
    }
    return Promise.reject(error)
})

export default function (url, data = {}, config = {}) {
    console.log(...arguments)
    config.method = config.method || 'post';
    config.url = url;
    if (config.method === 'get') {
        config.params = data;
    } else if (config.method === 'post' && url == '/api') {
        var params = new URLSearchParams();
        params.append('data', data);
        config.data = qs.stringify({
            'data': JSON.stringify(data)
        });
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };
    } else {
        config.data = data;
    }
    return instance(config);
}