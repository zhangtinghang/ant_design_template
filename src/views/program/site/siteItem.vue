<template>
    <div class="user-weaaper">
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="listData" :scroll="{ x: '100%'}">
                <div slot="images" class="img-wapper" slot-scope="text, record">
                    <img :src="text" alt="轮播图片" />
                </div>
                <div slot="change" slot-scope="text, record">
                    <div class="opera-item"><a-popconfirm title="确定修改？" v-if="record.enable === 1" okText="确定" cancelText="取消" @confirm="carouselStop(record)"><a-button>停用</a-button></a-popconfirm><a-button type="primary" v-else @click="carouselStart(record)">启用</a-button></div>
                    <!-- <div class="opera-item"><a-button type="primary" @click="carouselEdit">编辑</a-button></div> -->
                    <div class="opera-item"><a-popconfirm title="确定修改？" okText="确定" cancelText="取消" @confirm="carouselDelete(record)"><a-button type="danger">删除</a-button></a-popconfirm></div>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
            <div class="footer-pgLeft">
                <span>共{{total}}条记录 第 {{currentNum}} / {{pageNum}}页</span>
            </div>
            <div class="footer-pgRight">
                <a-pagination @change="onShowSizeChange" :defaultCurrent="1" :total="total" />
            </div>
        </div>
    </div>
</template>
<script>
import { getSite, deleteSite, updateSite } from '@/api/site'

// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'id',
  align: 'center'
}, {
  title: '地点名称',
  dataIndex: 'real_name',
  align: 'center'
}, {
  title: '地点图片',
  dataIndex: 'picture',
  scopedSlots: { customRender: 'images'},
  align: 'center'
}, {
    title: '经度',
    dataIndex: 'latitude',
    align: 'center'
}, {
  title: '纬度',
  dataIndex: 'longitude',
  align: 'center'
}, {
  title: '操作',
  dataIndex: 'operation',
  align: 'center',
  scopedSlots: { customRender: 'change'}
}];

export default {
    props: {
        updateData: {
            type: String
        }
    },
    mounted () {
        this.getToSite()
    },
    data () {
        return {
            listData: [],
            columns,
            total: 1,
            currentNum: 1,
            pageNum: 1
        }
    },
    watch: {
      updateData: function (val, oldVal) {
          console.log(this)
          if (val === 'true') {
              this.getToSite()
          }
      }
    },
    methods: {
        getToSite () {
            getSite({enable: -1}).then((info) => {
                this.listData = info.data
            })
        },
        onShowSizeChange(current, pageSize) {
            this.currentNum  = current
            this.pageNum = pageSize
        },
        carouselStop (record) {
            record.enable = 0
            this.modifyCarousel(record)
        },
        carouselStart (record) {
            record.enable = 1
            this.modifyCarousel(record)
        },
        carouselEdit () {
            console.log('轮播图编辑')
        },
        carouselDelete (record) {
            const id = record.id
            deleteSite(id).then((delInfo) => {
                if(delInfo.success) {
                    this.$message.success(`删除信息成功.`)
                    this.getToSite()
                }
            })
        },
        modifyCarousel (info) {
            let {id, real_name, intro, type, count_, money, location_ids, picture, enable} = info
            updateSite({id, real_name, intro, type, count_, money, location_ids, picture, enable}).then((upData) => {
                this.$message.success(`修改状态成功.`)
                this.getToSite()
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.user-weaaper{
    position: relative;
    padding-bottom: 20px;
    min-height: 100%;
}
.form-search{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}
.ant-form-item /deep/ .ant-form-item-control{
    width: 15vw;
}

.changeItem{
    color: #1890FF;
    margin-right: 15px;
    cursor: pointer;
    width: 50px 0;
}
.opera-item{
    margin-bottom: 10px;
    .ant-btn-danger{
        background-color: red;
        color: #fff;
    }
}
.opera-item:last-child{
    margin-bottom: 0;
}
.img-wapper{
    width: 150px;
    height: 100px;
    margin: 0 auto;
    & > img{
        width: 150px;
        height: 100px;
    }
}

.footer-pg{
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>


