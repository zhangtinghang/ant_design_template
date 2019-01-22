<template>
    <div class="user-weaaper">
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="listData" :scroll="{ x: '100%'}">
                <div slot="images" class="img-wapper" slot-scope="text, record">
                    <img :src="text" alt="轮播图片" />
                </div>
                <div slot="change" slot-scope="text, record">
                    <div class="opera-item"><a-popconfirm title="确定修改？" v-if="record.enable === 1" okText="确定" cancelText="取消" @confirm="carouselStop"><a-button>停用</a-button></a-popconfirm><a-button type="primary" v-else @click="carouselStart">启用</a-button></div>
                    <div class="opera-item"><a-button type="primary" @click="carouselEdit">编辑</a-button></div>
                    <div class="opera-item"><a-popconfirm title="确定修改？" okText="确定" cancelText="取消" @confirm="carouselDelete"><a-button type="danger">删除</a-button></a-popconfirm></div>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
            <div class="footer-pgLeft">
                <span>共400条记录 第 1 / 80页</span>
            </div>
            <div class="footer-pgRight">
                <a-pagination @showSizeChange="onShowSizeChange" :defaultCurrent="1" :total="500" />
            </div>
        </div>
    </div>
</template>
<script>
import { getCoach } from '@/api/coach'

// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'number',
  align: 'center'
}, {
  title: '风采图片',
  dataIndex: 'picture',
  scopedSlots: { customRender: 'images'},
  align: 'center'
}, {
  title: '教练介绍',
  dataIndex: 'intro',
  align: 'center'
}, {
    title: '状态',
  dataIndex: 'enable',
  align: 'center'
}, {
  title: '上传人',
  dataIndex: 'user',
  align: 'center'
}, {
  title: '时间',
  dataIndex: 'create_time',
  align: 'center'
}, {
  title: '操作',
  dataIndex: 'operation',
  align: 'center',
  scopedSlots: { customRender: 'change'}
}];
export default {
    created () {
        getCoach().then((info) => {
            console.log('获取教练信息成功', info.data)
            this.listData = info.data
        })
    },
    data () {
        return {
            listData: [],
            columns,
        }
    },
    methods: {
        onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        },
        carouselStop () {
            console.log('轮播图状态修改')
        },
        carouselStart () {
            console.log('轮播图状态修改')
        },
        carouselEdit () {
            console.log('轮播图编辑')
        },
        carouselDelete () {
            console.log('轮播图删除')
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


