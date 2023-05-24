export interface ResponseWorkDetail {
    workId: number
    workType: number
    workClass: number
    workTime: string
    workTimeDate:Date
    exist: number
    workDetail: string
    workRemark: string
    workCover: string
    openId: string
    submitUser: SubmitUser[]
    submit: number
    classNum: number
    classGroup: number
    className:string
    teacher: Teacher
    submitInfo: SubmitInfo
    fileId: string
    file: File[]
    needSubmit: number
    isOpen: number
    classCnt: number
    answerType: number
    teacherIsOpen: number
    isCorrect: number
    repairType: number
    nowTime: string
    cardCaseSensitive: number
    enrollmentYear: number
    workConfig: string
    correctUser: any[]
    workKind: number
    isBegin: number
    subjectImage: string
    subject: string
    submitText: string
}

export interface SubmitUser {
    submitId?: string
    openId: string
    userGender: number
    userRealName: string
    userAvatar?: string
    submitTime?: string
    submitContent: string
    submitCover?: string
    submitFlag: number
    submitAudio: string
    cardId?: string
    bubbleState: number
    submitScore?: number
    submitVideo: string
    isComment?: number
    userNum?: string
    status: number
    flag?: number
    bindOpenId: string
    bindName: string
    submitConfig?: string
    submitText: string
    submitCoverList?: string[]
    userName?: string
    updateTime?: string
}

export interface Teacher {
    openId: string
    userName: string
    userGender: number
    userPhone: string
    userCity: string
    userLoginTime: string
    userRegTime: string
    userExist: number
    userId: string
    userRealName: string
    userAvatar: string
    userType: number
    userIdentity: string
    userSubject: string
    noticeNum: number
    userAdmin: number
    userCreatAdmin: number
    familyType: number
    unionId: string
    fwhFlag: number
    ban: number
    mrid: string
}

export interface SubmitInfo {
    submitId: string
    submitUser: string
    submitWorkId: number
    submitTime: string
    submitContent: string
    submitCover: string
    submitScore: number
    cardId: string
    userNum: string
    status: number
    flag: number
    submitConfig: string
    statusImg: string
    submitScoreImg: any
}

export interface File {
    openId: string
    fileUrl: string
    type: string
    name: string
    size: string
    id: number
    time: string
    courseware: number
}
