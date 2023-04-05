// 其中使用 install 的目的在于 ts在main.ts中
// 不能通过Vue.prototype.$Api这个方式直接调用
//，在全局方法中会说到使用 插件的方式去挂载。
// api.ts
import {Request} from "@/axios/request";
import {useUserStore} from "@/stores/User";


class api {
    /* api接口模块 */
    public static Login = {
        genQrCode: () => Request.post('api/v1/auth/genQrCode'),
        // genQrCode:() => Request.post('/auth/genQrCode'),
        checkQrCode: (code: string) => Request.post('api/v1/auth/checkQrCode', {"code": code})

    }
    public static findWork = {

        findWorkNewVersion2: (limit=1,start=0,num=5) => {
            const user = useUserStore();
            return Request.post('mrzy/mrzypc/findWorkNewVersion', {openId: user.openId,limit,start,num})
        }

    }
}

export {
    api
}
