<template>
    <div class="user-weaaper">
        <div class="form-search">
            <div class="form">
                <a-form layout='inline'>
                    <template>
                        <a-form-item label='用户查询：'>
                            <a-input v-model="selectData" placeholder='请输入'> </a-input>
                        </a-form-item>

                        <a-form-item>
                            <a-button 
                                @click="selectDataHandle"
                                type='primary'
                                htmlType='submit'>
                                查询
                            </a-button>
                        </a-form-item>
                    </template>
                </a-form>
            </div>
            <div class="addUser">
                <a-button type="primary" @click="addUser">新增用户</a-button>
            </div>
        </div>
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="data" :scroll="{ x: 1500}">
                <div slot="time" slot-scope="text, record">
                    {{ text*1000 | moment("YYYY年MM月DD日")}}
                </div>
                <div slot="change" slot-scope="text, record">
                    <a-popconfirm v-if="record.is_banned === 0" title="确认禁用？" okText="确定" cancelText="取消" @confirm="carouselStop(record)"><span class="changeItem">禁用</span></a-popconfirm>
                    <span v-else class="changeItem" @click="carouselStart(record)">启用</span>
                    <a-popconfirm title="确认删除？" okText="确定" cancelText="取消" @confirm="carouselDelete(record)"><span class="changeItem" style="color: red;">删除</span></a-popconfirm>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
                <div class="footer-pgLeft">
                    <span>共{{total}}条记录 第 {{currentNum}} / {{totalNum}}页</span>
                </div>
                <div class="footer-pgRight">
                    <a-pagination @change="onShowSizeChange" :defaultCurrent="1" :total="total" />
                </div>
        </div>
    </div>
</template>
<script>

// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'id',
  align: 'center'
}, {
  title: '姓名',
  dataIndex: 'real_name',
  align: 'center'
}, {
  title: '性别',
  dataIndex: 'sex',
  align: 'center'
}, {
  title: '联系方式',
  dataIndex: 'phone',
  align: 'center'
},{
  title: '职位',
  dataIndex: 'position',
  align: 'center'
},{
  title: '录入时间',
  dataIndex: 'create_time',
  scopedSlots: { customRender: 'time'},
  align: 'center',
},{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'change'},
  align: 'center'
}];
import { getUser } from '@/api/user'
import { deleteEmployees, updateEmployees, selectEmployees } from '@/api/employees'
export default {
    data () {
        return {
            form: null,
            data: [],
            columns,
            selectData: '',
            total: 1,
            currentNum: 1,
            pageNum: 10
        }
    },
    created() {
        this.getToUser({offset: 0, limit: 10})
    },
    computed: {
        totalNum() {
            return Math.ceil(this.total/this.pageNum)
        }
    },
    methods: {
        getToUser(data) {
            let getData = Object.assign({}, {enable:-1, token:'12'}, data)
            getUser(getData).then((info) => {
                this.data = info.data
                this.total = info.total_count
            })
        },
        onShowSizeChange(page, pageSize) {
            this.currentNum  = page
            this.pageNum = pageSize
            this.getToUser({offset: (page-1)*pageSize, limit: 10})
        },
        carouselStop (record) {
            record.is_banned = 1
            this.modifyUser(record)
        },
        carouselStart (record) {
            record.is_banned = 0
            this.modifyUser(record)
        },
        carouselDelete (record) {
            const id = record.id
            deleteEmployees(id).then((delInfo) => {
                if(delInfo.success) {
                    this.$message.success(`删除信息成功.`)
                    this.getToUser({offset: (this.currentNum-1) * this.pageNum, limit: 10})
                }
            })
        },
        modifyUser (info) {
            let {id, real_name, sex, phone, position, perm, is_banned} = info
            updateEmployees({id, real_name, sex, phone, position, perm, is_banned}).then((upData) => {
                if(upData.success) {
                    this.$message.success(`修改状态成功.`)
                    this.getToUser({offset: (this.currentNum-1) * this.pageNum, limit: 10})
                }
            })
        },
        selectDataHandle () {
            console.log('点击查询')
            let getData = Object.assign({}, {enable:-1, real_name: this.selectData}, {offset: 0, limit: 10, token: '12'})
            selectEmployees(getData).then(info => {
                this.data = info.data
                this.total = info.total_count
            })

        },
        addUser () {
            this.$router.push({path: '/employees/add'})
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

.footer-pg{
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>


