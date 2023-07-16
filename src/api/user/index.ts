// 引入二次封装axios
import request from "@/utils/request";

import type { SubmitOrder, OrderResponseData } from "./type";
// 枚举地址
enum API {
  //提交订单，获取订单号码接口
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder/",
  // 获取订单详情的数据
  GETORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/",
}

// 提交订单
export const reqSubmitOrder = (
  hoscode: string,
  scheduleId: string,
  patientId: number
) =>
  request.post<any, SubmitOrder>(
    API.SUBMITORDER_URL + `${hoscode}/${scheduleId}/${patientId}`
  );

// 获取订单详情的接口
export const reqOrderInfo = (id: string) =>
  request.get<any, OrderResponseData>(API.GETORDERINFO_URL + id);
