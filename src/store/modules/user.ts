// 定义用户相关的仓库，这样子所有组件都可以使用
import { defineStore } from "pinia";

// 引入获取手机验证码的请求方法
import { reqCode, reqUserLogin } from "@/api/hospital/index";
import type { LoginData, UserLoginResponseData } from "@/api/hospital/type";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/user";
import type { UserState } from "./interface";
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      visiable: false, //用于控制登录组件的dialog显示与隐藏
      code: "", //存储用户的手机验证码

      // JSON.parse将字符串转换为对象
      // 如果本地有数据，就从本地存储中拿数据，这样子就不用每次都调用userLogin方法
      // userInfo: JSON.parse(localStorage.getItem("USERINFO") as string) || {},

      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },

  actions: {
    // 获取手机验证码的放号
    // async 返回一个promise对象
    async getCode(phone: string) {
      // 在想服务器携带手机号码，获取验证码
      // 正常开发的时候，只需要发一个请求，后台就会将验证码推送到用户的手机设备中
      // 当然咱们目前服务器不能·1向用户手机设备推送验证码（需要花钱）
      let result: any = await reqCode(phone);
      // console.log(result);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    // 用户手机号码登录的方法
    async userLogin(loginData: LoginData) {
      // console.log(LoginData);
      let result: UserLoginResponseData = await reqUserLogin(loginData);
      // console.log(result);
      if (result.code == 200) {
        this.userInfo = result.data;

        // 本地存储持久化存储用户信息
        // JSON.stringify 将对象转换为字符串
        // localStorage.setItem("USERINFO", JSON.stringify(this.userInfo));
        // 封装成一个方法来用，也可以用上一行数据
        SET_TOKEN(JSON.stringify(this.userInfo));
        // 返回一个成功的Promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    // 退出登录的方法
    logout() {
      // 清空仓库里的数据
      this.userInfo = {
        name: "",
        token: "",
      };
      // 清空本地存储的数据
      REMOVE_TOKEN();
    },
  },

  getters: {},
});

export default useUserStore;
