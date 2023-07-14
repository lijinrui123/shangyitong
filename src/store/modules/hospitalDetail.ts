import { defineStore } from "pinia";
// pinia 仓库写法：组合式API、选择式API
import { reqHospitalDetail, reqHospitalDeparment } from "@/api/hospital";
// 引入详情数据的ts类型
import type {
  HospitalDetail,
  DeparmentResponseData,
  DeparmentArr,
} from "@/api/hospital/type";
import type { HosPitalDetail } from "@/api/hospital/type";
import type { DetailState } from "./interface";

const useDetailStore = defineStore("Detail", {
  // 拿数据->取数据->存数据
  state: (): DetailState => {
    return {
      // 医院详情的数据
      hospitalInfo: {} as HosPitalDetail,
      // 存储医院科室的数据
      deparmentArr: [],
    };
  },
  actions: {
    // 获取医院详情的方法
    async getHospital(hoscode: string) {
      let result: HospitalDetail = await reqHospitalDetail(hoscode);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
      // console.log(result);
    },
    // 获取医院某一科室的方法
    async getDeparment(hoscode: string) {
      let result: any = await reqHospitalDeparment(hoscode);
      // console.log(result);
      if (result.code == 200) {
        this.deparmentArr = result.data;
      }
    },
  },
  getters: {},
});
// 获取仓库的方法对外暴露
export default useDetailStore;
