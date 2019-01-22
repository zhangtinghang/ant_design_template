<template>
  <div class="ptf-course__container">
    <div class="ptf-course__title">
      <span>基础信息</span>
      <span class="ptf-course__edit" @click="edtiDetail">编辑</span>
    </div>
    <div class="ptf-content__item">
      <span>姓名：王小明</span>
      <span>性别：男</span>
      <span>电话：18782371231</span>
      <span>状态：普通学员</span>
    </div>
    <div class="ptf-course__title">
      <span>课程相关</span>
    </div>

    <div style="margin-right:10%">
      <div class="ptf-content__item">
        <span>项目名称：篮球</span>
        <span>报课时间：2018-11-12</span>
        <span>剩余节数：<span class="ptf-item__num" @click="edtiDetail">9</span></span>
    </div>
    <div class="ptf-content__item">
        <span>项目名称：篮球</span>
        <span>报课时间：2018-11-12</span>
        <span>剩余节数：<span class="ptf-item__num" @click="edtiDetail">9</span></span>
    </div>
    <div class="ptf-content__item">
        <span>项目名称：篮球</span>
        <span>报课时间：2018-11-12</span>
        <span>剩余节数：<span class="ptf-item__num" @click="edtiDetail">9</span></span>
    </div>
    </div>

    <div class="ptf-course__title">
      <span>相关评价历史</span>
    </div>
    <div class="ptf-content__eval">
      <div class="ptf-content__item">
        <span>项目名称：篮球</span>
        <span>评价时间：2018-11-12</span>
        <span>操作人：王大壮</span>
      </div>
      <div><span>评论信息：</span>孩子今天积极参与，孩子今天积极参与，孩子今天积极参与，孩子今天积极参与，孩子今天积极参与，孩子今天积极参与，孩子今天积极参与，孩子今天积极参与</div>
    </div>
        <a-modal title="课程数量" :visible="courseVisible" okText="确定" cancelText="取消" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <div>课程剩余：<a-input-number :min="1" :max="10" v-model="value" @change="onChange" /></div>
            <div style="padding: 10px 0">课后评价：</div>
            <div><a-textarea placeholder="请输入" v-model="eval" :autosize="{ minRows: 4, maxRows: 6 }" /></div>
        </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      courseVisible: false,
      confirmLoading: false,
      value: 1,
      eval: ''
    }
  },
  methods: {
    changeDetail() {
      this.courseVisible = true
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.courseVisible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.courseVisible = false
    },
    edtiDetail () {
      this.courseVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.ptf-course__container{
  .ptf-course__title{
    color: #333333;
    font-size: 18px;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    padding-right: 10%;
    .ptf-course__edit{
      font-weight: 700;
      font-size: 14px;
      color: #1890FF;
      cursor: pointer;
    }
  }
  .ptf-content__item{
    padding: 10px 0;
    padding-right: 20%;
    display: flex;
    justify-content: space-between;
    .ptf-item__num{
      font-weight: 700;
      font-size: 18px;
      color: #1890FF;
      line-height: 22px;
      cursor: pointer;
    }
  }
  .ptf-content__eval{
    padding: 10px 0;
  }
}
</style>

