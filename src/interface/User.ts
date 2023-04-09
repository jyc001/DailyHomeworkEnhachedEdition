export interface UserInfo {
    appName: string
    brand: string
    divSubject: any
    familyType: number
    fwhFlag: boolean
    groups: Group[]
    login: number
    model: string
    mrid: number
    openId: string
    operator: boolean
    pinCode: any
    platform: number
    school: School
    student: Student
    system: any
    unionId: any
    userAvatar: string
    userExist: number
    userIdentity: string
    userLoginTime: number
    userNum: string
    userPhone: string
    userRealName: string
    userRegTime: number
    userSubject: string
    userType: number
    usersCount: any
    wxVersion: string
}

export interface School {
    city: string
    county: string
    kind: number
    openId: string
    password: any
    place: string
    province: string
    remark: string
    schoolCnt: any
    schoolCode: number
    schoolId: number
    schoolLevel: number
    schoolName: string
    schoolType: number
    schoolUrl: string
}

export interface Group {
    classCnt: number
    classGroup: number
    classId: number
    classNum: number
    divClass: any
    enrollmentYear: number
    isRename: number
    password: any
}

export interface Student {
    avatar: any
    classId: number
    name: string
    sids: any[]
    studentId: string
    userCount: any
    userNum: string
}
