// 其中使用 install 的目的在于 ts在main.ts中
// 不能通过Vue.prototype.$Api这个方式直接调用
//，在全局方法中会说到使用 插件的方式去挂载。
// api.ts
import {Request} from "@/axios/request";
import {useUserStore} from "@/stores/User";
import type {AxiosResponse} from "axios";
import {ElNotification} from "element-plus";
import luluData from "@/luluData";

function formatDate(date: Date) {
    //日期
    const DD = String(date.getDate()).padStart(2, '0'); // 获取日
    const MM = String(date.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
    const yyyy = date.getFullYear(); // 获取年

// 时间
    const hh = String(date.getHours()).padStart(2, '0');       //获取当前小时数(0-23)
    const mm = String(date.getMinutes()).padStart(2, '0');     //获取当前分钟数(0-59)
    const ss = String(date.getSeconds()).padStart(2, '0');     //获取当前秒数(0-59)
    const today = yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    return today
}


class api {
    /* api接口模块 */
    public static Login = {
        genQrCode: () => Request.post('api/v1/auth/genQrCode'),
        // genQrCode:() => Request.post('/auth/genQrCode'),
        checkQrCode: (code: string) => Request.post('api/v1/auth/checkQrCode', {"code": code})

    }
    public static Works = {

        findWorkNewVersion: (start = 0, num = 12, beginTime: Date = new Date(1990, 0, 1, 0, 0, 0), endTime: Date = new Date(), limit: number = 1) => {
            // const user = useUserStore();
            return new Promise<object>((resolve, reject) => {
                Request.post('mrzy/mrzypc/findWorkNewVersion', {
                    start: start,
                    num: num,
                    beginTime: formatDate(beginTime),
                    endTime: formatDate(endTime),
                    limit: limit
                }).then(resp => {
                    if (resp.data.code == 200) {
                        resp.data.data.forEach((work: any) => {
                            work.subjectImage = 'http://img2.lulufind.com/icon_subject_' + work.workType + ".png"
                            work.subject = luluData.subjects[work.workType]
                            if (work.submitInfo != null) {
                                work.submitInfo.statusImg = "http://img2.lulufind.com/home_tag_status_" + work.submitInfo.status + ".png"
                                work.submitInfo.submitScoreImg = work.submitInfo.submitScore ? "http://img2.lulufind.com/home_tag_status_goodwork.png" : null
                            }
                            // console.log(work.submit)
                            work.submitText = (work.submit == 1) ? "已提交" : "未提交"
                            // work.subject = luluData.subjects[work.workType]
                            // work.submit=luluData.submitList[work.submit]

                        })
                        resolve(resp.data.data)
                    } else {
                        console.log(resp.data)
                        ElNotification({
                            title: '出现错误',
                            message: '状态码:' + resp.data.code + "错误原因：" + resp.data.desc,
                            type: 'error',
                        })
                        reject()
                    }
                })
            })

        },
        getWorkDetail: (workId: number) => {
            // const user = useUserStore();
            return new Promise<object>((resolve, reject) => {
                Request.post('mrzy/mrzypc/getWorkDetail', {
                    workId: workId
                }).then(resp => {
                    if (resp.data.code == 200) {
                        resp.data.data.subjectImage = 'http://img2.lulufind.com/icon_subject_' + resp.data.data.workType + ".png"
                        resp.data.data.subject = luluData.subjects[resp.data.data.workType]
                        if (resp.data.data.submitInfo != null) {
                            resp.data.data.submitInfo.statusImg = "http://img2.lulufind.com/home_tag_status_" + resp.data.data.submitInfo.status + ".png"
                            resp.data.data.submitInfo.submitScoreImg = resp.data.data.submitInfo.submitScore ? "http://img2.lulufind.com/home_tag_status_goodwork.png" : null
                        }
                        resp.data.data.submitUser.forEach((user: any) => {
                            user.submitText = (user.submitFlag == 1) ? "已提交" : "未提交"
                            if (user.submitCover != null) {
                                user.submitCoverList = user.submitCover.split("|")
                                // console.log(user)
                            }
                        })
                        resp.data.data.submitText = (resp.data.data.submit == 1) ? "已提交" : "未提交"
                        resolve(resp.data.data)
                    } else {
                        console.log(resp.data)
                        ElNotification({
                            title: '出现错误',
                            message: '状态码:' + resp.data.code + "错误原因：" + resp.data.desc,
                            type: 'error',
                        })
                        reject()
                    }
                })
            })

        }
    }
}

export {
    api
}
