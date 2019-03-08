<template>
    <div class="form-container">
        <div class="header-title">新增用户</div>
        <div class="form-wapper">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='帐号'
                fieldDecoratorId="username"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入帐号' }]}"
                >
                    <a-input placeholder='请输入' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='密码'
                fieldDecoratorId="pwd"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入密码' }]}"
                >
                    <a-input type="password" placeholder='请输入' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='姓名'
                fieldDecoratorId="real_name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入姓名' }]}"
                >
                    <a-input placeholder='请输入' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='性别'
                fieldDecoratorId="sex"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-select defaultValue="">
                        <a-select-option value="男">男</a-select-option>
                        <a-select-option value="女">女</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='电话'
                fieldDecoratorId="phone"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-input type="number" placeholder='请录入电话' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='职位'
                fieldDecoratorId="position"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                    <a-input type="text" placeholder='请录入职位' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='权限：'
                fieldDecoratorId="perm"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请录入' }]}"
                >
                     <a-select defaultValue="">
                        <a-select-option value="course">课程顾问</a-select-option>
                        <a-select-option value="market">市场管理</a-select-option>
                        <a-select-option value="admin">普通管理员</a-select-option>
                    </a-select>
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
import { createEmployees } from '@/api/employees'
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
              let updateTem = this.form.getFieldsValue()
                updateTem.username = `lt${updateTem.username}`
              createEmployees(updateTem).then((updateInfo) => {
                if (updateInfo.success) {
                    this.$message.success(`上传信息成功.`)
                    this.form.resetFields()
                }
              })
          }
        },
      )
    },
    checkCancel () {
        this.form.resetFields()
    },
    handleChange  (e) {

    },
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
