<template>
  <div class="login-container">
     <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        label='用户名'
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}"
      >
        <a-input placeholder='请输入用户名' />
      </a-form-item>
      <a-form-item
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        label='密码'
        fieldDecoratorId="password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}"
      >
        <a-input type="password" placeholder='请输入密码' />
      </a-form-item>
      <a-form-item
        :labelCol="formTailLayout.labelCol"
        :wrapperCol="formTailLayout.wrapperCol"
      >
        <a-checkbox
          
          @change="handleChange"
        >
          记住我
        </a-checkbox>
        <router-link to="/foo">忘记密码？</router-link>
      </a-form-item>
      <a-form-item
        :labelCol="formTailLayout.labelCol"
        :wrapperCol="formTailLayout.wrapperCol"
      >
        <a-button type='primary' @click="check">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
export default {
  data () {
    return {
      checkNick: false,
      formItemLayout,
      formTailLayout,
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
            console.log('fail')
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
  }
  .ant-form {
    position: relative;
    top: 50%;
    margin: 0 auto;
    max-width: 600px;
    min-width: 300px;
    transform: translateY(-50%);
    .ant-row{
      text-align: center;
    }
  }
</style>
