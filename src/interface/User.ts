export interface UserInfo {
    openId: string
    userRealName: string
    userAvatar: string
    userPhone: string
    unionId: any
    userSubject: string
    familyType: number
    userType: number
    mrid: number
    school: School
    groups: Group[]
    operator: boolean
    platform: number
    brand: string
    model: string
    system: any
    wxVersion: string
    userNum: string
    userIdentity: string
    userExist: number
    divSubject: any
    login: number
    userRegTime: number
    userLoginTime: number
    appName: string
    pinCode: any
    student: Student
    usersCount: any
    fwhFlag: boolean
}

export interface School {
    schoolName: string
    schoolUrl: string
    schoolCode: number
    schoolType: number
    schoolLevel: number
    place: string
    remark: string
    province: string
    city: string
    county: string
    openId: string
    password: any
    schoolCnt: any
    schoolId: number
    kind: number
}

export interface Group {
    classCnt: number
    classNum: number
    divClass: any
    classId: number
    isRename: number
    enrollmentYear: number
    classGroup: number
    password: any
}

export interface Student {
    name: string
    avatar: any
    studentId: string
    sids: any[]
    classId: number
    userCount: any
    userNum: string
}
