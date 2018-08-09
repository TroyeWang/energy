import {
    errors
} from '../errors'

import ajax from '../../request';
console.log(ajax)

export default {
    state: {
        token: 'this is mock token data',
        errors: errors
    },
    mutations: {
        SET_TOKEN: (state, token) => {}
    },
    actions: {
        login({
            commit
        }) {
            return new Promise((resolve, reject) => {
                ajax('login的url地址').then(res => {
                    // 做一些存储登录信息的事
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}