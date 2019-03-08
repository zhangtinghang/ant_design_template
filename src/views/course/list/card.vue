<template>
    <div class="list-container">
            <div class="list-wapper" v-for="(item, index) in card" :key="index">
                <div class="list-title">
                    <div class="list-order">订单编号：{{item.create_time+item.id || '暂无'}}</div>
                    <div class="list-orderTime">订单时间：{{item.create_time | moment("YYYY-MM-DD HH:mm:ss") || '暂无'}}</div>
                </div>
                <div class="list-content">
                    <div class="content-left">
                        <a-row>
                            <a-col :span="8"><span>姓名：{{item.real_name || '暂无'}}</span></a-col>
                            <a-col :span="8"><span>性别：{{item.sex || '暂无'}}</span></a-col>
                            <a-col :span="8"><span>电话：{{item.phone || '暂无'}}</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8"><span>项目：{{item['course.real_name'] || '暂无'}}</span></a-col>
                            <a-col :span="8"><span>节数：{{item.count_ || '未知'}}节</span></a-col>
                            <a-col :span="8"><span>上课时间：{{item.start_time | moment("YYYY年MM月DD日") || '暂无'}}</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="8"><span>场地：{{item['location.real_name']  || '暂无'}}</span></a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24"><span>备注：</span><span>{{item.note  || '暂无'}}</span></a-col>
                        </a-row>
                    </div>
                    <div class="content-right">
                        <div class="right-item"><a-button class="right-item-btn" type="primary" @click="orderConfirm(item)">订单确认</a-button></div>
                        <div class="right-item item-text">{{item.student_level  || '暂无'}}</div>
                    </div>
                </div>
                <a-divider />
            </div>
            <div class="pagination-wapper">
                <a-pagination @change="onShowSizeChange" :defaultCurrent="1" :total="total" />
            </div>

            <!-- 详情 -->
            <a-modal :visible="isDetail"  :footer="null" width="60%">
                <detail-form :checkData="checkData" @confirmHandle="confirmHandle(checkData)" @cancelHandle="cancelHandle"></detail-form>
            </a-modal>
        </div>
</template>

<script>
import detailForm from './edit'
import { getCourse, updateCourse } from '@/api/course'
import { cloneDeep } from 'lodash'
 export default {
    props: {
        updateData: {
            type: String
        }
    },
    data() {
      return {
        card:[],
        isDetail: false,
        checkData: {},
        total: 1,
        currentNum: 1,
        pageNum: 1
      }
    },
    components: {
        detailForm
    },
    created() {
        this.getToCourse('0')
    },
    watch: {
      updateData: function (val, oldVal) {
          if (val === 'true') {
              this.getToCourse('0')
          }
      }
    },
    methods: {
        getToCourse (is_confirmed) {
            getCourse({is_confirmed}).then((info) => {
                this.card = info.data
                this.total = info.total_count
            })
        },
        onShowSizeChange(current, pageSize) {
            this.currentNum  = current
            this.pageNum = pageSize
        },
        orderConfirm (item) {
            this.checkData = cloneDeep(item)
            this.isDetail = true
        },
        confirmHandle (val) {
            let {id} = val
            let is_confirmed = 1
            updateCourse({id, is_confirmed}).then((updataInfo) => {
                if( updataInfo.success ) {
                    this.$message.success(`更新订单状态成功.`)
                    this.isDetail = false
                    this.getToCourse('0')
                } else {
                    this.$message.success(`更新订单状态失败.`)
                }
            })
        },
        cancelHandle () {
            this.isDetail = false
        }
    }
  }
</script>

<style lang="scss" scoped>
.list-wapper{

    .list-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
    }
    .list-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content-left{
            flex: 8;
            & /deep/ .ant-row{
               margin-bottom: 10px;
            }
        }
        .content-right{
            flex: 2;
            text-align: right;
            .right-item-btn{
                width: 150px;
                margin-bottom: 20px;
            }
            .right-item{
                color: #1890FF;
                font-size: 20px;
            }
            .item-text{
                margin-right: 40px;
            }
        }
    }
}
.pagination-wapper{
    float: right;
}
</style>
