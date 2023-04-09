// request.ts
import axios from "./index";
import type {AxiosResponse} from "axios";

export class Request {
    /**
     * get方法
     * @param {string} url 路径
     * @param {object} params 参数
     */
    static get = (url: string, params?: any) => axios.get(url, {params: params})
    static post = (url: string, params?: any) => axios.post(url, params)
}
