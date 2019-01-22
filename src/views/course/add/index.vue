<template>
    <div class="form-container">
        <div class="header-title">新增用户</div>
        <div class="form-wapper">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='姓名'
                fieldDecoratorId="name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要录入的姓名' }]}"
                >
                    <a-input placeholder='请输入' />
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='年龄'
                fieldDecoratorId="age"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要录入的年龄' }]}"
                >
                    <a-input type="number" placeholder='请输入需要录入的年龄' />
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='性别'
                fieldDecoratorId="gender"
                >
                    <a-select defaultValue="男">
                        <a-select-option value="男">男</a-select-option>
                        <a-select-option value="女">女</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='电话'
                fieldDecoratorId="phone"
                >
                    <a-input type="number" placeholder='请输入需要录入的年龄' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='状态：'
                fieldDecoratorId="gender"
                >
                    <a-select>
                        <a-select-option value="男">普通学员</a-select-option>
                        <a-select-option value="女">会员学员</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='类型：'
                fieldDecoratorId="gender">
                    <a-select defaultValue="男">
                        <a-select-option value="男">类型1</a-select-option>
                        <a-select-option value="女">类型2</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='节数：'
                fieldDecoratorId="num1"
                >
                    <a-input type="number" placeholder='请输入' />
                </a-form-item>

                <a-form-item
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    label='时间：'
                    fieldDecoratorId="num2"
                    >
                    <a-date-picker class="form-item-picker" />
                </a-form-item>

                 <a-form-item
                    :labelCol="formItemLayout.labelCol"
                    :wrapperCol="formItemLayout.wrapperCol"
                    label='场地：'
                    fieldDecoratorId="num3"
                    >
                     <a-select>
                        <a-select-option value="男">场地1</a-select-option>
                        <a-select-option value="女">场地2</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='备注：'
                fieldDecoratorId="note"
                >
                    <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" />
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
              console.info('success', this.form.getFieldsValue())
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

    .form-item-picker{
        width: 100%;
    }
}   
</style>
