// 本地存储操作用户信息的方法
export const SET_TOKEN = (userInfo: string) => {
  localStorage.setItem("USERINFO", userInfo);
};


// 从本地存储中拿数据
export const GET_TOKEN = () => {
  return localStorage.getItem("USERINFO");
};
