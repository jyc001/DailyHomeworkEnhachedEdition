// index.ts
import {ElMessage, ElNotification} from "element-plus";
import type {AxiosRequestConfig, Method} from "axios";
import axios from "axios";
import {Base} from "@/axios/base";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/User";
// @ts-ignore
import {base64} from "@/util/base64"
// @ts-ignore
import {md5} from "@/util/md5"

import router from "@/router"

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */


const toLogin = () => {
    router.replace({
        name: 'login',
    });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @return {boolean} 是否需要重试
 */
const errorHandle = (status: number): boolean => {
    // 状态码判断
    switch (status) {

        case void 0:
            ElNotification({
                title: '错误',
                type:"error",
                message: "系统繁忙:"+ status,
            });
            break;

        case 500:
            ElNotification({
                title: '错误',
                type:"error",
                message: "服务器开小差了～:"+ status,
            });
            break;

        case 401:
            ElNotification({
                title: '错误',
                message: "token登录失效:"+ status,
                type: 'error',
            })
            const user = useUserStore()
            user.token = ""
            toLogin()
            break;

        case 429:
            ElNotification({
                title: '错误',
                type:"error",
                message: "您的操作过于频繁, 请稍后重试~:"+ status,
            });

        case 400:
            ElNotification({
                title: '错误',
                message: "请求参数错误，服务器无法处理:"+status,
                type: 'error',
            })
            break;

        case 404:
            ElNotification({
                title: '错误',
                message: "请求地址不存在:" + status,
                type: 'error',
            })
            break;
        default:
            ElNotification({
                title: '错误',
                message: "其他错误错误:" + status,
                type: 'error',
            })
    }
    return true
}

/* 实例化请求配置 */
const instance = axios.create({
    headers: {
        //php 的 post 传输请求头一定要这个 不然报错 接收不到值
        // "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin-Type": '*'
    },
    // 请求时长
    timeout: 1000 * 30,
    // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
    baseURL: Base.url,
    //     ? "测试"
    //     : "正式",
    // 表示跨域请求时是否需要使用凭证
    withCredentials: false,
})

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        const user = useUserStore()

       // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        const token = user.token;
        // localStorage.setItem('token', token);
        if (token != "") {
            config.headers.token = token
        }

        if (config.url?.includes('/v1')) {
            config.baseURL = 'https://api-prod.lulufind.com'

        } else {
            config.headers["Content-Type"] = "application/x-www-form-urlencoded"
            let headers = {};
            // console.log(config.data)
            let name;
            for (name in config.data) { //把req.data 依次存入headers。并在每个item 结尾 加上""
                // @ts-ignore
                headers[name] = config.data[name] + "";
            }

            const salt = "IF75D4U19LKLDAZSMPN5ATQLGBFEJL4VIL2STVDBNJJTO6LNOGB265CR40I4AL13"; //默认 ”Salt"
            let prefix = JSON.stringify(headers || {});
            prefix = base64.encode(prefix) + salt
            config.headers.sign = md5.hexMD5(prefix)

        }
        return config;
    },
    error => {
        ElMessage.error(error.data.error.Message);
        return Promise.reject(error.data.error.Message);
    }
)

// 响应拦截器
instance.interceptors.response.use(function (config) {

        // removePending(config.config);
        // 请求成功
        if (config.status === 200) {
            return Promise.resolve(config);
        } else {
            return Promise.reject(config);
        }
        // 请求失败
    }, function (error) {

        const {response} = error;
        if (response) {
            // const retryFlag=
                errorHandle(response.status);
            //
            // // 超时重新请求
            // const config = error.config;
            // // 全局的请求次数,请求的间隙
            // const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];
            //
            // if (config && RETRY_COUNT) {
            //     // 设置用于跟踪重试计数的变量
            //     config.__retryCount = config.__retryCount || 0;
            //     // 检查是否已经把重试的总数用完
            //     if (config.__retryCount >= RETRY_COUNT) {
            //         return Promise.reject(response || {Message: error.Message});
            //     }
            //     // 增加重试计数
            //     config.__retryCount++;
            //     // 创造新的Promise来处理指数后退
            //     const backoff = new Promise<void>((resolve) => {
            //         setTimeout(() => {
            //             resolve();
            //         }, RETRY_DELAY || 1);
            //     });
            //     // instance重试请求的Promise
            //     return backoff.then(() => {
            //         return instance(config);
            //     });
            // }

            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 后续增加断网情况下做的一些操作
            // store.commit('networkState', false);
        }
    }
)
// 只需要考虑单一职责，这块只封装axios
export default instance
