<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-wrapper__logo">
        <img :src="logoIcon" />
      </div>
      <div class="login-wrapper__title">莱特体育后台管理系统</div>
     <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        label='帐号'
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入帐号' }]}"
      >
        <a-input placeholder='请输入用户名' />
      </a-form-item>
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        label='密码'
        fieldDecoratorId="pwd"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}"
      >
        <a-input type="password" placeholder='请输入密码' />
      </a-form-item>
      <!-- <a-form-item
        :labelCol="formTailLayout.labelCol"
        :wrapperCol="formTailLayout.wrapperCol"
      >
        <a-checkbox
          
          @change="handleChange"
        >
          记住我
        </a-checkbox>
        <router-link to="/foo">忘记密码？</router-link>
      </a-form-item> -->
        <a-button class="login-wrapper__btn" type='primary' @click="check">登陆</a-button>      
    </a-form>
  </div>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}
const formTailLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}
import logoIcon from '@/assets/logo.png'
export default {
  data () {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
      logoIcon
    }
  },
  methods: {
    check  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            const formData = this.form.getFieldsValue()
            this.$store.dispatch('loginByUsername',formData).then(() => {
            this.$router.push({ path: '/' })
            }).catch(()=> {
              // eslint-disable-next-line
              console.log('fail')
            })
          }else {
            // eslint-disable-next-line
            console.log('fail1')
          }
        },
      )
    },
    handleChange  (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        // this.form.validateFields(['nickname'], { force: true })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .login-container {
    height: 100%;
    background-image: url('~@/assets/bg.png');
    background-size: auto;
    background-color: #2a5caa;
    background-attachment: fixed;
    position: relative;
  }
  .login-wrapper{
    width: 400px;
    height: 520px;
    padding: 30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
    border-radius:30px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    .login-wrapper__logo{
      width: 120px;
      height: 120px;
      text-align: center;
      margin: 0 auto;
      & > img{
        width: 100%;
        height: 100%;
      }
    }
    .login-wrapper__title{
      color: #1890FF;
      font-size:24px;
      text-align: center;
    }
  }
  .login-wrapper__btn{
    margin-top: 30px;
    width: 100%;
  }
  .ant-form {
    margin-top: 60px;
    // position: relative;
    // top: 50%;
    // margin: 0 auto;
    // max-width: 600px;
    // min-width: 300px;
    // transform: translateY(-50%);
  }
</style>
