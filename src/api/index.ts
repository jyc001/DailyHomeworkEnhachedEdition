import axios from "axios";
import {ElMessage} from "element-plus";

const baseUrl = "https://api-prod.lulufind.com/api/v1"
const api = {
    genQrCode() {
        return axios.post(`${baseUrl}/auth/genQrCode`, {})
    },
    checkQrCode(code:string){
        // console.log({code})
        return axios.post(`${baseUrl}/auth/checkQrCode`, {"code":code})


    },
}
export default api;
