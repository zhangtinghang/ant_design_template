<template>
  <div class="ptf-detail__container">
    <div class="ptf-container__title">详细信息</div>
    <div class="ptf-content__title">基础信息</div>
    <a-row>
      <a-col :span="8"><span>姓名：</span>{{detailData.name}}</a-col>
      <a-col :span="8"><span>年龄：</span>{{detailData.name}}</a-col>
      <a-col :span="8"><span>性别：</span>{{detailData.gender}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="8"><span>电话：</span>{{detailData.name}}</a-col>
      <a-col :span="8"><span>录入时间</span>{{detailData.name}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="24"><span>备注：</span>{{detailData.note}}</a-col>
    </a-row>

    <div class="ptf-content__title ptf-content__second">跟进信息</div>
    <div>
      <a-row>
        <a-col :span="8"><span>跟进时间：</span>2018-11-12</a-col>
        <a-col :span="8"><span>跟进顾问：</span>是</a-col>
      </a-row>
      <a-row>
        <a-col :span="8"><span>是否有效：</span>是</a-col>
        <a-col :span="8"><span>是否到访：</span>否</a-col>
        <a-col :span="8"><span>是否成交：</span>是</a-col>
      </a-row>
      <a-row>
        <a-col :span="24"><span>跟进状态：</span>有时间体检</a-col>
      </a-row>
    </div>
    <div class="closeBtn">
      <a-button @click="closeDetail">关闭</a-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailData: {
      type: Object
    }
  },
  methods: {
    closeDetail () {
      this.$emit('closeDetail')
    }
  }
}
</script>
<style lang="scss" scoped>
.ptf-container__title{
  font-weight: 650;
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}
.ptf-detail__container{
  width: 70%;
  margin-left: 15%;
}
.ptf-content__title{
  font-weight: 650;
  font-size: 14px;
  color: #333;
  padding: 10px 0;
}
.ant-row{
  padding: 1% 0;
}
.ptf-content__second{
  margin-top: 30px;
}
.closeBtn{
  text-align: center;
  margin: 20px 0;
  .ant-btn{
    width: 20%;
  }
}
</style>


