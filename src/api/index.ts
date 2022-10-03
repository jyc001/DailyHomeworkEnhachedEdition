import axios from "axios";
import {ElMessage} from "element-plus";

const baseUrl = "https://api-prod.lulufind.com/api/v1"
const api = {
    async genQrCode(): Promise<any> {
        let data = {};
        await axios.post(`${baseUrl}/auth/genQrCode`, {}).then((rsp) => {
            // console.log(rsp.data)
            data = rsp.data
            // console.log(data)
        }).catch(() => {
            ElMessage.error('二维码获取失败，请重新尝试')

        })
        // console.log(data)
        return data
    },
}
export default api;
