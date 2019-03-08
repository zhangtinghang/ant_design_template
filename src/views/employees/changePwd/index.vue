<template>
    <div class="form-container">
        <div class="header-title">修改密码</div>
        <div class="form-wapper">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='帐号'
                fieldDecoratorId="username"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入需要修改的帐号' }]}"
                >
                    <a-input placeholder='请输入' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='旧密码'
                fieldDecoratorId="old_pwd"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-input type="password" placeholder='请输入旧密码' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='新密码'
                fieldDecoratorId="new_pwd"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-input type="password" placeholder='请输入新密码' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='确认新密码'
                fieldDecoratorId="check_new_pwd"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-input type="password" placeholder='请再次确认新密码' />
                </a-form-item>
                
                <div>
                    <a-button type='primary' class="btn-item add-btn" @click="checkAdd">提交</a-button>
                    <a-button class="btn-item cancel-btn" @click="checkCancel">取消</a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>
<script>
import { upUser } from '@/api/user'
const formItemLayout = {
  labelCol: { span: 4, offset: 4 },
  wrapperCol: { span: 8},
}
export default {
  data () {
    return {
      checkNick: false,
      formItemLayout,
    }
  },
  methods: {
    checkAdd  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            let { username, new_pwd, old_pwd, check_new_pwd } = this.form.getFieldsValue()
            if (new_pwd !== check_new_pwd){
                this.$message.error(`两次密码输入不一致.`)
                return false
            }
            upUser({ username, new_pwd, old_pwd, check_new_pwd }).then((info) => {
                if (info.success) {
                    this.$message.success(`修改密码成功.`)
                    this.form.resetFields()
                } else {
                    this.$message.error(`修改密码失败.`)
                }
            })
          }
        },
      )
    },
    checkCancel () {
        this.form.resetFields()
    }
  },
}
</script>

<style lang="scss" scoped>
.form-container{
    width: 80%;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    .header-title {
        font-size:20px;
        font-weight: 900;
        margin-bottom: 30px;
    }
    .form-wapper{
        text-align: center;
        display: flex;
        justify-content: center;
        & /deep/ .ant-form{
            width: 100%;
        }
    }
    .btn-item{
        width: 100px;
    }
    .add-btn {
        margin-right: 5vw;
    }
}   
</style>
