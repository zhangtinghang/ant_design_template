<template>
    <div class="form-container">
        <div class="header-title">信息修改</div>
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
                    <a-select defaultValue="男" @change="handleChange">
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
                label='备注：'
                fieldDecoratorId="note"
                >
                    <a-textarea placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='跟进状态：'
                fieldDecoratorId="state"
                >
                    <a-textarea placeholder="每次跟进都会记录，请直接填写当前记录" :autosize="{ minRows: 2, maxRows: 6 }" />
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='跟进顾问：'
                fieldDecoratorId="consultant"
                >
                    <a-select defaultValue="" @change="handleChange">
                        <a-select-option value="男">新用户</a-select-option>
                        <a-select-option value="女">老用户</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='是否有效：'
                fieldDecoratorId="effective"
                >
                    <a-select defaultValue="" @change="handleChange">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='是否到访：'
                fieldDecoratorId="visit"
                >
                     <a-select defaultValue="" @change="handleChange">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='是否成交：'
                fieldDecoratorId="deal"
                >
                     <a-select defaultValue="" @change="handleChange">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='成交金额：'
                fieldDecoratorId="money"
                >
                    <a-input type="number" placeholder='请输入' />
                </a-form-item>
                <div>
                    <a-button type='primary' class="btn-item add-btn" @click="checkAdd">新增</a-button>
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
            console.info('success')
          }
        },
      )
    },
    checkCancel () {
        console.log('点击取消')
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
