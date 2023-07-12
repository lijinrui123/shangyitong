<template>
  <div class="login-container">
    <!-- title：对话框左上角的标题  v-model :控制对话框的显示与隐藏 -->
    <el-dialog v-model="userStore.visiable" title="用户登录">
      <!-- 对话框身体部分结构 -->
      <div class="content">
        <el-row>
          <!-- 左侧结构：收集号码登录、微信扫一扫登录 -->
          <el-col :span="12">
            <div class="login">
              <div v-show="scene == 0">
                <el-form :model="loginParam" :rules="rules" ref="form">
                  <el-form-item prop="phone">
                    <el-input
                      placeholder="请你输入手机号码"
                      :prefix-icon="User"
                      v-model="loginParam.phone"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code">
                    <el-input
                      placeholder="请你输入手机验证码"
                      :prefix-icon="Lock"
                      v-model="loginParam.code"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      :disabled="!isPhone || flag ? true : false"
                      @click="getCode"
                    >
                      <!-- :flag="flag"   代表给父组件传递 props-->
                      <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                      <span v-else>获取验证码</span>
                    </el-button>
                  </el-form-item>
                </el-form>
                <el-button
                  type="primary"
                  style="width: 100%"
                  :disabled="
                    !isPhone || loginParam.code.length < 6 ? true : false
                  "
                  @click="login"
                  >用户登陆</el-button
                >
                <div class="bottom" @click="changeScene">
                  <p>微信扫码登录</p>
                  <svg
                    t="1688921974790"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="15061"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M1023.162182 641.303273c0-143.243636-143.243636-260.910545-306.944-260.910546-168.820364 0-306.944 117.666909-306.944 260.910546s133.003636 260.910545 306.944 260.910545c35.816727 0 71.633455-10.24 107.426909-20.456727l97.210182 56.273454-25.576728-92.090181c71.633455-56.273455 127.883636-127.906909 127.883637-204.637091z m-404.130909-46.056728c-20.456727 0-35.816727-15.36-35.816728-35.816727 0-15.336727 20.456727-35.816727 35.816728-35.816727 25.576727 0 46.056727 15.36 46.056727 35.816727-0.023273 15.36-20.48 35.816727-46.056727 35.816727z m194.397091 0c-15.336727 0-35.816727-15.36-35.816728-35.816727 0-15.336727 20.456727-35.816727 35.816728-35.816727 25.576727 0 46.056727 15.36 46.056727 35.816727 0 15.36-15.36 35.816727-46.056727 35.816727z m0 0"
                      fill="#04AE0F"
                      p-id="15062"
                    ></path>
                    <path
                      d="M358.097455 104.122182c-199.517091 0-358.120727 133.026909-358.120728 306.967273 0 97.210182 56.273455 179.060364 143.243637 240.453818L107.426909 758.970182l127.906909-61.393455c46.033455 10.24 81.850182 20.456727 127.906909 20.456728h35.816728c-5.12-25.576727-10.216727-51.153455-10.216728-76.730182 0-158.580364 133.003636-286.510545 306.944-286.510546h35.816728C690.641455 211.549091 537.157818 104.122182 358.097455 104.122182z m-112.54691 240.453818c-25.576727 0-56.273455-15.36-56.273454-46.056727 0-25.6 25.6-46.056727 56.273454-46.056728 25.576727 0 46.056727 15.36 46.056728 46.056728-5.12 30.696727-20.456727 46.056727-46.056728 46.056727z m250.693819 0c-25.576727 0-56.273455-15.36-56.273455-46.056727 0-25.6 25.576727-46.056727 56.273455-46.056728 25.576727 0 46.056727 15.36 46.056727 46.056728-0.023273 30.696727-20.48 46.056727-46.056727 46.056727z m0 0"
                      fill="#04AE0F"
                      p-id="15063"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="webchat" v-show="scene == 1">
                <!-- 在这个容器当中显示微信扫码登录页面 -->
                <div id="login-container"></div>
                <div class="phone" @click="handler">
                  <p>手机短信验证码登录</p>
                  <svg
                    t="1689178929313"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2344"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M512.3072 883.3024c-41.2672 0-74.8544-33.5872-74.8544-74.8544s33.5872-74.8544 74.8544-74.8544 74.8544 33.5872 74.8544 74.8544S553.5744 883.3024 512.3072 883.3024zM512.3072 770.4576c-20.992 0-37.9904 16.9984-37.9904 37.9904s16.9984 37.9904 37.9904 37.9904 37.9904-16.9984 37.9904-37.9904S533.1968 770.4576 512.3072 770.4576z"
                      fill="#d81e06"
                      p-id="2345"
                    ></path>
                    <path
                      d="M680.1408 991.9488c-3.1744 0-6.4512-0.8192-9.4208-2.56-41.2672-24.4736-108.032-24.3712-108.7488-24.3712 0 0-0.1024 0-0.1024 0L276.8896 965.0176c-54.3744 0-98.5088-44.2368-98.5088-98.5088L178.3808 140.3904c0-54.3744 44.2368-98.5088 98.5088-98.5088l470.7328 0c54.3744 0 98.5088 44.2368 98.5088 98.5088l0 726.1184c0 54.3744-44.2368 98.5088-98.5088 98.5088-10.1376 0-18.432-8.2944-18.432-18.432s8.2944-18.432 18.432-18.432c33.9968 0 61.6448-27.648 61.6448-61.6448L809.2672 140.3904c0-33.9968-27.648-61.6448-61.6448-61.6448L276.8896 78.7456c-33.9968 0-61.6448 27.648-61.6448 61.6448l0 726.1184c0 33.9968 27.648 61.6448 61.6448 61.6448l284.8768 0c4.1984 0 78.0288-0.1024 127.7952 29.4912 8.704 5.2224 11.6736 16.4864 6.4512 25.2928C692.5312 988.7744 686.4896 991.9488 680.1408 991.9488z"
                      fill="#d81e06"
                      p-id="2346"
                    ></path>
                    <path
                      d="M589.824 149.7088 434.7904 149.7088c-10.1376 0-18.432-8.2944-18.432-18.432s8.2944-18.432 18.432-18.432L589.824 112.8448c10.1376 0 18.432 8.2944 18.432 18.432S599.9616 149.7088 589.824 149.7088z"
                      fill="#d81e06"
                      p-id="2347"
                    ></path>
                    <path
                      d="M705.024 230.0928c9.728 0 17.7152 7.8848 17.7152 17.7152l0 376.9344c0 9.728-7.8848 17.7152-17.7152 17.7152L319.5904 642.4576c-9.728 0-17.7152-7.8848-17.7152-17.7152L301.8752 247.808c0-9.728 7.8848-17.7152 17.7152-17.7152L705.024 230.0928M705.024 193.2288 319.5904 193.2288c-30.1056 0-54.5792 24.4736-54.5792 54.5792l0 376.9344c0 30.1056 24.4736 54.5792 54.5792 54.5792l385.4336 0c30.1056 0 54.5792-24.4736 54.5792-54.5792L759.6032 247.808C759.6032 217.7024 735.1296 193.2288 705.024 193.2288L705.024 193.2288z"
                      fill="#d81e06"
                      p-id="2348"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="leftContent">
              <div class="top">
                <div class="item">
                  <img src="../../assets/images/code_app.png" alt="" />
                  <svg
                    t="1688921974790"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="15061"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M1023.162182 641.303273c0-143.243636-143.243636-260.910545-306.944-260.910546-168.820364 0-306.944 117.666909-306.944 260.910546s133.003636 260.910545 306.944 260.910545c35.816727 0 71.633455-10.24 107.426909-20.456727l97.210182 56.273454-25.576728-92.090181c71.633455-56.273455 127.883636-127.906909 127.883637-204.637091z m-404.130909-46.056728c-20.456727 0-35.816727-15.36-35.816728-35.816727 0-15.336727 20.456727-35.816727 35.816728-35.816727 25.576727 0 46.056727 15.36 46.056727 35.816727-0.023273 15.36-20.48 35.816727-46.056727 35.816727z m194.397091 0c-15.336727 0-35.816727-15.36-35.816728-35.816727 0-15.336727 20.456727-35.816727 35.816728-35.816727 25.576727 0 46.056727 15.36 46.056727 35.816727 0 15.36-15.36 35.816727-46.056727 35.816727z m0 0"
                      fill="#515151"
                      p-id="15062"
                    ></path>
                    <path
                      d="M358.097455 104.122182c-199.517091 0-358.120727 133.026909-358.120728 306.967273 0 97.210182 56.273455 179.060364 143.243637 240.453818L107.426909 758.970182l127.906909-61.393455c46.033455 10.24 81.850182 20.456727 127.906909 20.456728h35.816728c-5.12-25.576727-10.216727-51.153455-10.216728-76.730182 0-158.580364 133.003636-286.510545 306.944-286.510546h35.816728C690.641455 211.549091 537.157818 104.122182 358.097455 104.122182z m-112.54691 240.453818c-25.576727 0-56.273455-15.36-56.273454-46.056727 0-25.6 25.6-46.056727 56.273454-46.056728 25.576727 0 46.056727 15.36 46.056728 46.056728-5.12 30.696727-20.456727 46.056727-46.056728 46.056727z m250.693819 0c-25.576727 0-56.273455-15.36-56.273455-46.056727 0-25.6 25.576727-46.056727 56.273455-46.056728 25.576727 0 46.056727 15.36 46.056727 46.056728-0.023273 30.696727-20.48 46.056727-46.056727 46.056727z m0 0"
                      fill="#515151"
                      p-id="15063"
                    ></path>
                  </svg>
                  <p>微信扫一扫关注</p>
                  <p>“快速预约挂号”</p>
                </div>
                <div class="item">
                  <img src="../../assets/images/code_login_wechat.png" alt="" />
                  <svg
                    t="1688923491762"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="16931"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M766.003899 974.097466H282.947368a47.906433 47.906433 0 0 1-47.906432-47.906433V83.836257a47.906433 47.906433 0 0 1 47.906432-47.906432h483.056531a47.906433 47.906433 0 0 1 47.906432 47.906432v842.354776a47.906433 47.906433 0 0 1-47.906432 47.906433z m-241.528265-57.88694a61.879142 61.879142 0 1 0-61.879143-61.879142 61.879142 61.879142 0 0 0 61.879143 61.879142z m202.604288-791.454191H321.871345v598.83041h405.208577V124.756335z"
                      fill="#E61D15"
                      p-id="16932"
                    ></path>
                  </svg>
                  <p>扫一扫下载</p>
                  <p>“预约挂号”APP</p>
                </div>
              </div>
            </div>
            <p class="tip">尚医通官方指定平台</p>
            <p class="tip">快速挂号 安全放心</p>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <el-button type="primary" size="default" @click="closeDialog"
          >关闭窗口</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入微信扫码登录参数请求
import { reqWxLogin } from "@/api/hospital";
import { User, Lock } from "@element-plus/icons-vue";
// 获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
// import useUserStore from '@/store/mod'
import useUserStore from "@/store/modules/user";
import { ref, reactive, computed } from "vue";
// 引入倒计时组件
import CountDown from "../countdown/index.vue";
import type { WXLoginResponseData } from "@/api/hospital/type";
import { ElMessage } from "element-plus";
// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false); //flag如果为真，开启倒计时，反之不是
let userStore = useUserStore();
let scene = ref<number>(0); //0代表手机号码登录，1代表微信扫码登录
// 获取form组件实例
const form = ref<any>();
// 收集表单数据----手机号码
let loginParam = reactive({
  phone: "", //收集手机号
  code: "", //收集验证码
});
// 计算出当前表单元素收集的内容是否是手机号码格式
let isPhone = computed(() => {
  // 手机号码的正则表达式
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  // 返回布尔值：真代表手机号码，假代表不是手机号码
  return reg.test(loginParam.phone);
});

// 获取手机验证码按钮的回调
const getCode = async () => {
  // 解决element-plus 按钮禁用还能点击的问题
  if (!isPhone.value || flag.value) return;
  // 开启倒计时模式，倒计时组件显示出来
  flag.value = true;
  // alert(1111);
  // 通知pinia仓库存储验证码
  // console.log("zujian", result);
  try {
    // 如果获取验证码成功，就执行下面语句
    await userStore.getCode(loginParam.phone);
    // 点击获取验证码后，自动将验证码填充到输入框
    loginParam.code = userStore.code;
  } catch (error) {
    // 获取验证码失败
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};
// 计数器子组件绑定的自定义事件
// 当倒计时为零时，通知父组件倒计时组件隐藏
const getFlag = (val: boolean) => {
  // console.log(value);
  flag.value = val;
};

// 点击微信扫码登录|微信小图标切换为微信扫码登录
const changeScene = async () => {
  // 切换场景为1
  scene.value = 1;
  // 发送请求获取微信扫码二维码需要参数
  // 我们在向硅谷学校的服务器发请求，获取微信扫码登录页面参数
  // 还需要携带一个参数：告诉学校服务器，用户授权成功以后重定向项目的某一页面
  let redirect_URL = encodeURIComponent(window.location.origin + "wxlogin");
  let result: WXLoginResponseData = await reqWxLogin(redirect_URL);
  console.log(result);

  // 生成微信扫码登录二维码页面
  // @ts-ignore
  new WxLogin({
    self_redirect: true, //true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false。
    id: "login-container", //第三方页面显示二维码的容器id  "login-container"
    appid: result.data.appid, //应用唯一标识，在微信开放平台提交应用审核通过后获得
    scope: "snsapi_login", //应用授权作用域，代表当前微信扫码登录已经授权了，拥有多个作用域用逗号（,）分隔，网页应用目前仅填写snsapi_login即可
    redirect_uri: result.data.redirectUri, //重定向地址，需要进行UrlEncode,填写授权回调域路径，就是用户授权成功以后，微信服务器向公司后台推送code地址
    // 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止csrf攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加session进行校验
    state: result.data.state, //就是学校服务器重定向的地址，携带用户信息。
    style: "black",
    href: "",
  });
};

// 点击用户登录按钮回调
const login = async () => {
  // 当手机号码和验证码都符合条件时。才会继续进行登录请求
  await form.value.validate();

  // alert(123);
  // 发送登录请求
  // 登录请求成功：顶部组件需要展示用户名字/对话框关闭
  // 登录失败：弹出对应登录失败的错误信息
  try {
    // 用户登录成功
    await userStore.userLogin(loginParam);
    // 关闭对话框
    userStore.visiable = false;
  } catch (error) {
    // 登录失败，弹出错误信息
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};

// 手机号码的自定义校验规则
const validatorPhone = (value: any, callBack: any) => {
  // rlue:即为表单校验规则对象
  // value：即为当前文本的内容
  // callBacck：回调函数
  const reg =
    /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的手机号码格式"));
  }
};
// 验证码自定义校验规则
const validatorCode = (value: any, callBack: any) => {
  const reg = /^\d{6}$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的验证码格式"));
  }
};

// 表单校验的规则对象
const rules = {
  // 手机号码的校验规则
  // required:代表当前字段务必进行校验
  // message:代表的校验错误的提示信息
  // trigger：代表表单校验触发的时机
  // change:文本发生变化的时候进行校验
  // blur：失去焦点时触发校验
  // min:代表的是最小位数
  // max：代表的是最大位数
  // phone: [
  //   {
  //     required: true,
  //     message: "手机号码务必11位",
  //     trigger: "change",
  //     min: 11,
  //   },
  // ],
  // code: [
  //   {
  //     required: true,
  //     message: "验证码务必6位",
  //     trigger: "blur",
  //     min: 6,
  //   },
  // ],

  phone: [
    {
      trigger: "change",
      validator: validatorPhone,
    },
  ],
  code: [
    {
      trigger: "blur",
      validator: validatorCode,
    },
  ],
};

// // 对话框关闭事件的回调
// const close = () => {
//   // 清空收集的数据
//   Object.assign(loginParam, { phone: "", code: "" });
//   // 清除上一次表单校验的结果
//   form.value.resetFields();
// };

// 关闭对话框窗口按钮的回调
const closeDialog = () => {
  // 关闭对话框
  userStore.visiable = false;
  // // 清空收集的数据
  // Object.assign(loginParam, { phone: "", code: "" });
  // // 清除上一次表单校验的结果
  // form.value.resetFields();
};

// 点击手机短信验证码盒子回调
const handler = () => {
  scene.value = 0;
};
</script>

<script lang="ts">
// 用vue2写个别名，方便vue插件寻找数据
export default {
  name: "Login",
};
</script>

<style scoped lang="scss">
.login-container {
  /* 要修改组件内部的样式，就要用深度选择器 */
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .login {
    padding: 20px;
    border: 1px solid #ccc;
    .webchat {
      display: flex;
      flex-direction: column;
      align-items: center;
      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          margin: 10px 0;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 10px 0px;
    }
  }
  .leftContent {
    .top {
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 130px;
          height: 130px;
        }
        p {
          margin: 5px 0px;
        }
      }
    }
  }
  .tip {
    text-align: center;
    margin: 20px 0px;
    font-size: 20px;
    font-weight: 900;
  }
}
</style>
