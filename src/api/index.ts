// 其中使用 install 的目的在于 ts在main.ts中
// 不能通过Vue.prototype.$Api这个方式直接调用
//，在全局方法中会说到使用 插件的方式去挂载。
// api.ts
import {Request} from "@/axios/request";

class api {
    /* api接口模块 */
    public static Login = {
        genQrCode:() => Request.post('/v1/auth/genQrCode'),
        // genQrCode:() => Request.post('/auth/genQrCode'),
        checkQrCode:(code:string)=>Request.post('/v1/auth/checkQrCode', {"code":code})

    }
}
export {
    api
}
