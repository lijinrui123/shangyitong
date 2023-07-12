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
                <el-form :model="loginParam" :rules="rules">
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
              <div class="webchat" v-show="scene == 1">微信扫码登录</div>
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
        <el-button type="primary" size="default">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
// 获取user仓库的数据visiable，可以控制login组件的对话框显示与隐藏
// import useUserStore from '@/store/mod'
import useUserStore from "@/store/modules/user";
import { ref, reactive, computed } from "vue";
// 引入倒计时组件
import CountDown from "../countdown/index.vue";
import { ElMessage } from "element-plus";
// 定义一个响应式数据控制倒计时组件显示与隐藏
let flag = ref<boolean>(false); //flag如果为真，开启倒计时，反之不是
let userStore = useUserStore();
let scene = ref<number>(0); //0代表手机号码登录，1代表微信扫码登录
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
const changeScene = () => {
  scene.value = 1;
};

// 点击用户登录按钮回调
const login = async () => {
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
  phone: [
    {
      required: true,
      message: "手机号码务必11位",
      trigger: "change",
      min: 11,
    },
  ],
  code: [
    {
      required: true,
      message: "验证码务必6位",
      trigger: "blur",
      min: 6,
    },
  ],
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
