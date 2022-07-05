<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        :maxlength="11"
      >
        <template #left-icon>
          <Toutiaoicon icon="shouji" />
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        left-icon="smile-o"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <Toutiaoicon icon="yanzhengma" />
        </template>
        <template #button>
          <van-count-down
            @finish="isShowcont = false"
            v-if="isShowcont"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            @click="btnyanzhengma"
            native-type="button"
            class="send-sms-btn"
            size="small"
            :disabled="isdown"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"> 登入 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
import { Toast } from 'vant'

export default {
  data() {
    return {
      isShowcont: false,
      isdown: false,
      user: {
        mobile: '13911111115',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不对'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码只能6位'
          }
        ]
      }
    }
  },
  methods: {
    // 倒计时组件的业务逻辑
    // 页面初始化的时候默认展示获取验证码按钮
    // >>点击按钮之后 （表单校验通过）
    // >>显示倒计时
    // >>倒计时结束继续展示验证码按钮
    async onSubmit() {
      const user = this.user
      // val自动从表单里面获取的值
      // 获取到的值是对象：key >>表单的name值 val >>用户输入的值
      // await后面写的是promise
      // 只有promise成功了的情况下才会继续执行

      // data数据满足接口文档的格式就可以
      // 如果捕获await的错误，用try catch
      try {
        const res = await login(user)
        console.log('登录成功', res)
        // 登入成功 提示用户
        Toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录失败', err)
          // 使用可选链运算符进行数据是否存在的判断
          // 为什么要判断：如果直接从undefined获取属性，会直接报错，导致程序停止运行
          Toast.fail(err?.response?.data?.message || '服务器端错误')
        }
      }
    },
    async btnyanzhengma() {
      // 1. 校验手机号
      try {
        await this.$refs.form.validate('mobile')
      } catch (err) {
        console.log(err)
        return
      }

      // 2. 请求发送验证码
      try {
        // button 适合实际添加disabled
        this.isdown = true
        await getSmsCode(this.user.mobile)
        // 3. 验证通过，显示倒计时
        this.isShowcont = true
        this.$toast.success('发送验证码成功')
      } catch (err) {
        // 如果获取失败，进行错误的提示
        this.$toast.fail(err.response.data.message || '出差了！')
        // 发送失败，关闭倒计时
        this.isShowcont = false
      } finally {
        // 不管成功或者失败都会执行的逻辑
        this.isdown = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
