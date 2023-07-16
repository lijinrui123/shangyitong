// 引入二次封装axios
import request from "@/utils/request";

import type { SubmitOrder, OrderResponseData, QrCode, PayReslt } from "./type";
// 枚举地址
enum API {
  //提交订单，获取订单号码接口
  SUBMITORDER_URL = "/order/orderInfo/auth/submitOrder/",
  // 获取订单详情的数据
  GETORDERINFO_URL = "/order/orderInfo/auth/getOrderInfo/",

  // 取消订单的接口
  ORDERCANCEL_URL = "/order/orderInfo/auth/cancelOrder/",
  // 获取支付订单二维码接口
  QRCODE_URL = "/order/weixin/createNative/",
  // 查询订单支付的结果
  PAYRESULT_URL = "/order/weixin/queryPayStatus/",
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

// 取消订单
export const reqCancelOreder = (id: string) =>
  request.get<any, any>(API.ORDERCANCEL_URL + id);

// 获取二维码
export const reqGetQrcode = (orderId: string) =>
  request.get<any, QrCode>(API.QRCODE_URL + orderId);

// 查询支付结果
export const reqPayResult = (orderId: string) =>
  request.get<any, PayReslt>(API.PAYRESULT_URL + orderId);
