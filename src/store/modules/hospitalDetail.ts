import { defineStore } from "pinia";
// pinia 仓库写法：组合式API、选择式API
import { reqHospitalDetail } from "@/api/hospital";
// 引入详情数据的ts类型
import type { HospitalDetail } from "@/api/hospital/type";

const useDetailStore = defineStore("Detail", {
  // 拿数据->取数据->存数据
  state: () => {
    return {
      // 医院详情的数据
      hospitalInfo: {},
    };
  },
  actions: {
    // 获取医院详情的方法
    async getHospital(hoscode: string) {
      let result: HospitalDetail = await reqHospitalDetail(hoscode);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
    },
  },
  getters: {},
});
// 获取仓库的方法对外暴露
export default useDetailStore;
