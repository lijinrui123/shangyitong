// 定义用户相关的仓库，这样子所有组件都可以使用
import { defineStore } from "pinia";

const useUserStore = defineStore("User", {
  state: () => {
    return {
      visiable: false, //用于控制登录组件的dialog显示与隐藏
    };
  },

  actions: {},

  getters: {},
});

export default useUserStore;
