<template>
    <div class="user-weaaper">
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="listData" :scroll="{ x: '100%'}">
                <div slot="indexNum" slot-scope="text, record">
                    <span>{{record.id}}</span>
                </div>
                <div slot="type" slot-scope="text, record">
                    <a-tag v-if="text === 1" color="#87d068">启用</a-tag>
                    <a-tag v-if="text === 0" color="pink">禁用</a-tag>
                </div>
                <div slot="time" slot-scope="text, record">
                    {{ text*1000 | moment("YYYY年MM月DD日")}}
                </div>
                <div slot="images" class="img-wapper" slot-scope="text, record">
                    <img :src="text" alt="轮播图片" />
                </div>
                <div slot="change" slot-scope="text, record">
                    <div class="opera-item"><a-popconfirm title="确定停用？" v-if="record.enable === 1" okText="确定" cancelText="取消" @confirm="carouselStop(record)"><a-button>停用</a-button></a-popconfirm><a-button type="primary" v-else @click="carouselStart(record)">启用</a-button></div>
                    <!-- <div class="opera-item"><a-button type="primary" @click="carouselEdit">编辑</a-button></div> -->
                    <div class="opera-item"><a-popconfirm title="确定删除？" okText="确定" cancelText="取消" @confirm="carouselDelete(record)"><a-button type="danger">删除</a-button></a-popconfirm></div>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
            <div class="footer-pgLeft">
                <span>共{{total}}条记录 第 {{currentNum}} / {{pageNum}}页</span>
            </div>
            <div class="footer-pgRight">
                <a-pagination @change="onShowSizeChange" :defaultCurrent="1" :total="total"></a-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getCarousel, deleteCarousel, updateCarousel } from '@/api/carousel'
// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'number',
  scopedSlots: { customRender: 'indexNum'},
  align: 'center'
}, {
  title: '图片',
  dataIndex: 'picture',
  scopedSlots: { customRender: 'images'},
  align: 'center'
}, {
  title: '正文内容',
  dataIndex: 'intro',
  width: '40%',
  align: 'center'
}, {
    title: '类型',
    dataIndex: 'enable',
    scopedSlots: { customRender: 'type'},
    align: 'center'
}, {
  title: '上传人',
  dataIndex: 'real_name',
  align: 'center'
}, {
  title: '时间',
  dataIndex: 'create_time',
  scopedSlots: { customRender: 'time'},
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
       this.getToCarousel()
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
              this.getToCarousel()
          }
      }
    },
    methods: {
        getToCarousel () {
            getCarousel({enable: -1}).then((info) => {
                this.listData = info.data
                this.total = info.total_count
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
            deleteCarousel(id).then((delInfo) => {
                if(delInfo.success) {
                    this.$message.success(`删除信息成功.`)
                    this.getToCarousel()
                }
            })
        },
        modifyCarousel (info) {
            let {id, title, picture, type, intro, enable} = info
            updateCarousel({id, title, picture, type, intro, enable}).then((upData) => {
                this.$message.success(`修改状态成功.`)
                this.getToCarousel()
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


