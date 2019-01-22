<template>
  <div class="ptf-editCourse__container">
    <div class="ptf-editCourse__title">订单确认 <span class="ptf-editCourse__status">老用户</span></div>
    <a-form :form="form">
  
      <a-form-item label='姓名' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-input placeholder="请输入" v-model="form.name" />
      </a-form-item>

      <a-form-item label='性别' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-select placeholder='性别' v-model="form.sex">
          <a-select-option value='male'>男</a-select-option>
          <a-select-option value='female'>女</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label='电话' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-input placeholder="请输入" v-model="form.phone" />
      </a-form-item>

      <a-form-item label='状态' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-select placeholder='普通学员' v-model="form.status">
          <a-select-option value='male'>游客</a-select-option>
          <a-select-option value='female'>普通学员</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label='项目' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-select placeholder='课程类型' v-model="form.type">
          <a-select-option value='male'>篮球</a-select-option>
          <a-select-option value='female'>足球</a-select-option>
        </a-select>
      </a-form-item>

      <div class="ptf-content__item">
        <a-form-item label='节数' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-input placeholder="请输入" v-model="form.phone" />
      </a-form-item>
        <a-form-item label='剩余课程' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input placeholder="请输入" v-model="form.num2" />
        </a-form-item>
      </div>

      <div class="ptf-content__item">
        <a-form-item label='时间' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-date-picker placeholder="请输入" v-model="form.num1" />
        </a-form-item>
        <a-form-item label='场地' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-select placeholder="请输入" v-model="form.num3">
            <a-select-option value='male'>男</a-select-option>
            <a-select-option value='female'>女</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <a-form-item label='场地' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-textarea placeholder="请输入" v-model="form.note" :autosize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 12, offset: 5 }" class="ptf-btn__group">
        <a-button type='primary' htmlType='submit' @click="confirmHandle">
          录入
        </a-button>
        <a-button htmlType='submit' @click="cancelHandle">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        formLayout: 'horizontal',
        form: {
          name: '',
          sex: '',
          phone: '',
          status: '',
          type: null,
          num1: null,
          num2: '',
          num3: '',
          num4: '',
          note: ''
        },
      }
    },
    methods: {
      confirmHandle () {
        this.$emit('confirmHandle', this.form)
      },
      cancelHandle () {
        this.$emit('cancelHandle')
      }
    },
  }
</script>
<style lang="scss" scoped>
.ptf-editCourse__container{
  width: 70%;
  margin-left: 15%;
  .ptf-editCourse__title{
    font-size: 18px;
    font-weight: 700;
    color: #333333;
    text-align: center;
    margin-bottom: 20px;
  }
  .ptf-editCourse__status{
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #1890FF;
  }
  .ant-calendar-picker{
    width: 100%;
  }
  .ptf-btn__group{
    text-align: center;
    .ant-btn{
      width: 20%;
      margin: 20px 10px;
    }
  }
}
</style>
