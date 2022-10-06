// request.ts
import axios from "./index";
import type {AxiosResponse} from "axios";

export class Request {
    /**
     * get方法
     * @param {string} url 路径
     * @param {object} params 参数
     */
    static get = (url: string, params?: any) => {
        return new Promise<AxiosResponse<any,any>>((resolve, reject) => {
            axios.get(url, { params: params }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    static post = (url: string, params?: any) => {
        return new Promise<AxiosResponse<any,any>>((resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
