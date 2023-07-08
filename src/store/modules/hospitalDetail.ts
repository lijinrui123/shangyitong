import { defineStore } from "pinia";
// pinia 仓库写法：组合式API、选择式API

const useDetailStore = defineStore("Detail", {
  state: () => {
    return {};
  },
  actions: {},
  getters: {},
});
// 获取仓库的方法对外暴露
export default useDetailStore;
