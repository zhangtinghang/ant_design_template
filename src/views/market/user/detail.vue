<template>
  <div class="ptf-detail__container">
    <div class="ptf-container__title">详细信息</div>
    <div class="ptf-content__title">基础信息</div>
    <a-row>
      <a-col :span="8"><span>姓名：</span>{{detailData.real_name}}</a-col>
      <a-col :span="8"><span>年龄：</span>{{detailData.age}}</a-col>
      <a-col :span="8"><span>性别：</span>{{detailData.sex}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="8"><span>电话：</span>{{detailData.phone}}</a-col>
      <a-col :span="8"><span>录入时间：</span>{{detailData.create_time | moment("YYYY年MM月DD日")}}</a-col>
    </a-row>
    <a-row>
      <a-col :span="24"><span>备注：</span>{{detailData.note}}</a-col>
    </a-row>

    <div class="ptf-content__title ptf-content__second">跟进信息</div>
    <template v-if="followInfo && followInfo.length > 0">
      <div v-for="(item, index) in followInfo" :key="index">
        <a-row>
          <a-col :span="8"><span>跟进时间：</span>{{item.log.update_time}}</a-col>
          <a-col :span="8"><span>跟进顾问：</span>{{item.adviser}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="8"><span>是否有效：</span>{{item.log.is_valid === 1 ? '是': '否'}}</a-col>
          <a-col :span="8"><span>是否到访：</span>{{item.log.is_visited === 1 ? '是': '否'}}</a-col>
          <a-col :span="8"><span>是否成交：</span>{{item.log.is_deal === 1 ? '是': '否'}}</a-col>
        </a-row>
        <a-row>
          <a-col :span="24"><span>跟进状态：</span>{{item.log.status}}</a-col>
        </a-row>
      </div>
    </template>
    <div v-else>暂无</div>
    <div class="closeBtn">
      <a-button @click="closeDetail">关闭</a-button>
    </div>
  </div>
</template>
<script>
import { getFollow } from '@/api/market'
export default {
  props: {
    detailData: {
      type: Object
    }
  },
  data () {
    return {
      followInfo: []
    }
  },
  watch: {
    detailData: function(val, oldVal) {
      this.getToFollow()
    }
  },
  created() {
    console.log('detailData', this.detailData)
    this.getToFollow()
  },
  methods: {
    getToFollow () {
      const adviser = this.detailData.adviser
      const market_user_id = this.detailData.id
      getFollow({adviser, market_user_id}).then((followInfo) => {
        this.followInfo = followInfo.data
      })
    },
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


