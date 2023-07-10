// 定义用户相关的仓库，这样子所有组件都可以使用
import { defineStore } from "pinia";

// 引入获取手机验证码的请求方法
import { reqCode } from "@/api/hospital/index";
const useUserStore = defineStore("User", {
  state: () => {
    return {
      visiable: false, //用于控制登录组件的dialog显示与隐藏
      code: "", //存储用户的手机验证码
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
  },

  getters: {},
});

export default useUserStore;
