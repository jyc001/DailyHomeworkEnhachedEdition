// request.ts
import axios from "./index";
import type {AxiosResponse} from "axios";
import type {LuluResponse} from "@/interface/LuluResponse";
import LuluData from "@/luluData";

export class Request {
    /**
     * get方法
     * @param {string} url 路径
     * @param {object} params 参数
     */
    static get<T>(url: string, params?: any) {
        return axios.get<LuluResponse<T>>(url, {params: params})
    }

    static post<T>(url: string, params?: any) {
        return axios.post<LuluResponse<T>>(url, params)
    }
}
