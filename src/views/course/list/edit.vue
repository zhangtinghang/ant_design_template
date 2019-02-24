<template>
  <div class="ptf-editCourse__container">
    <div class="ptf-editCourse__title">订单确认 <span class="ptf-editCourse__status">{{form.student_level}}</span></div>
    <a-form :form="form">
  
      <a-form-item label='姓名' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form.real_name || '暂无'}}</div>
      </a-form-item>

      <a-form-item label='性别' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form.sex  || '暂无'}}</div>
      </a-form-item>

      <a-form-item label='电话' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form.phone  || '暂无'}}</div>
      </a-form-item>

      <a-form-item label='状态' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form.student_level  || '暂无'}}</div>
      </a-form-item>

      <!-- <a-form-item label='项目' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <a-select placeholder='请录入' :disabled="true" v-model="form.type">
          <a-select-option value='male'>篮球</a-select-option>
          <a-select-option value='female'>足球</a-select-option>
        </a-select>
      </a-form-item> -->

      <div class="ptf-content__item">
        <a-form-item label='节数' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <div>{{form.count_  || '暂无'}}</div>
        </a-form-item>
        <!-- <a-form-item label='剩余课程' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input placeholder="请输入" :disabled="true" v-model="form.num2" />
        </a-form-item> -->
      </div>

      <div class="ptf-content__item">
        <a-form-item label='时间' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <div>{{form.start_time | moment("YYYY年MM月DD日") || '暂无'}}</div>
        </a-form-item>
      </div>
      <a-form-item label='场地' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form['location.real_name'] || '暂无'}}</div>
      </a-form-item>
      <a-form-item label='备注' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
        <div>{{form.note || '暂无'}}</div>
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 12, offset: 5 }" class="ptf-btn__group">
        <a-button type='primary' htmlType='submit' @click="confirmHandle">
          确认
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
    props: {
      checkData: {
        type: Object
      }
    },
    data() {
      return {
        formLayout: 'horizontal',
        form: {},
      }
    },
    watch: {
        checkData: function (val, oldVal) {   
          this.form = Object.assign({}, this.form, val)
        }
    },
    created () {
      this.form = Object.assign({}, this.form, this.checkData)
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
