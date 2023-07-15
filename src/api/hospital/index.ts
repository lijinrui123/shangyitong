// 引入二次封装axios
import request from "@/utils/request";
import type {
  HospitalDetail,
  DeparmentResponseData,
  LoginData,
  UserLoginResponseData,
  WXLoginResponseData,
  HospitalWorkData,
  DoctorResponseData,
  UserResponseData,
  DoctorInfoData,
} from "./type";
// 枚举请求地址
enum API {
  HOSPITALDETAIL_URL = "/hosp/hospital/",
  // 获取某一个医院的科室的数据
  HOSPITALDEPARMENT_URL = "/hosp/hospital/department/",
  // 获取验证码
  GETUSERCODE_URL = "/sms/send/",
  // 用户登录
  USERLOGIN_URL = "/user/login",
  // 获取微信扫码登录需要参数
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  // 获取某一医院的某一科室预约挂号数据
  HOSPITALWORK_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  // 获取医院某一科室某一天相应医生排班的数据
  HOSPITALDOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  // 获取某一账号下就诊人的信息
  GETUSER_URL = "/user/patient/auth/findAll",

  // 获取医生挂号的信息
  GETDOCTOR_URL = "/hosp/hospital/getSchedule/",
}

// 箭头函数如果只有一行表达式，可以不加括号，箭头函数自带return
// 或者在箭头后面加{return xxxxx},不要忘记return,不然会出现错误
// 获取医院详情的接口
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetail>(API.HOSPITALDETAIL_URL + hoscode);

// 获取医院科室的接口
export const reqHospitalDeparment = (hoscode: string) => {
  return request.get<any, DeparmentResponseData>(
    API.HOSPITALDEPARMENT_URL + hoscode
  );
};

// 获取验证码接口
export const reqCode = (phone: string) =>
  request.get<any, any>(API.GETUSERCODE_URL + phone);

// 用户登录接口
export const reqUserLogin = (data: LoginData) =>
  request.post<any, UserLoginResponseData>(API.USERLOGIN_URL, data);

// 获取微信扫码登录生成二维码需要参数接口
export const reqWxLogin = (wxRedirectUri: string) =>
  request.get<any, WXLoginResponseData>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );

// 获取预约挂号的接口
export const reqHospitalWork = (
  page: number,
  limit: number,
  hosode: string,
  depcode: string
) =>
  request.get<any, HospitalWorkData>(
    API.HOSPITALWORK_URL + `${page}/${limit}/${hosode}/${depcode}`
  );

// 获取医生排班数据
export const reqHospitalDoctor = (
  hoscode: string,
  decode: string,
  workDate: string
) =>
  request.get<any, DoctorResponseData>(
    API.HOSPITALDOCTOR_URL + `${hoscode}/${decode}/${workDate}`
  );

// 获取某一个账号下就诊人信息
export const reqGetUser = () =>
  request.get<any, UserResponseData>(API.GETUSER_URL);

// 获取医生挂号的信息接口
export const reqDoctorInfo = (scheduleId: string) =>
  request.get<any, DoctorInfoData>(API.GETDOCTOR_URL + scheduleId);
