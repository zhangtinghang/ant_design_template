<template>
    <div class="form-container">
        <div class="header-title">新增用户</div>
        <div class="form-wapper">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='姓名'
                fieldDecoratorId="real_name"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请正确录入姓名' }]}"
                >
                    <a-input placeholder='请输入' />
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='年龄'
                fieldDecoratorId="age"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请正确录入年龄' }]}"
                >
                    <a-input type="number" placeholder='请录入' />
                </a-form-item>
                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='性别'
                fieldDecoratorId="sex"
                :fieldDecoratorOptions="{rules: [{ required: true, message: '请正确录入性别' }]}"
                >
                    <a-select defaultValue="sex">
                        <a-select-option value="男">男</a-select-option>
                        <a-select-option value="女">女</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='电话'
                fieldDecoratorId="phone"
                :fieldDecoratorOptions="{rules: [{ required: true, len: 11, message: '请正确录入电话' }]}"
                >
                    <a-input type="number" placeholder='请录入' />
                </a-form-item>

                <a-form-item
                :labelCol="formItemLayout.labelCol"
                :wrapperCol="formItemLayout.wrapperCol"
                label='节数：'
                fieldDecoratorId="rest_count"
                :fieldDecoratorOptions="{rules: [{ required: true, enum:'number', min: 0, message: '请输入需要录入的剩余课程数' }]}"

                >
                    <a-input type="number" placeholder='请输入剩余课程数' />
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
import { addBatchCourse } from '@/api/course'
import { cloneDeep } from 'lodash'
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
  mounted() {
      if(this.$route && this.$route.query) {
          this.form.setFieldsValue(this.$route.query)
      }
  },
  methods: {
    checkAdd  () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            let formData = {}
            let oldFormData = this.form.getFieldsValue()
            for(let item in oldFormData) {
                formData[item] = oldFormData[item]
            }
              formData.course_id = 35
              formData.location_id = 8
              formData = [formData]
              let beforeData = cloneDeep(formData)
                beforeData.forEach(info => {
                    if (typeof info.phone === 'number') {
                    try {
                        info.phone = JSON.stringify(info.phone)
                    } catch (error) {}
                    }
                })
                const update = {}
                update.data = beforeData
                update.token = null
                addBatchCourse(update).then((addInfo) => {
                    if (addInfo.success) {
                        if(addInfo.fail_data && addInfo.fail_data.length === 0) {
                            this.$message.error('添加失败，请重试！')
                        } else {
                            this.form.resetFields()
                            this.$message.success(' 添加成功！')
                        }
                    } else {
                        this.$message.error('添加失败，请重试！')
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

    .form-item-picker{
        width: 100%;
    }
}   
</style>
