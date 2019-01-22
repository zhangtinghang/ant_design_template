<template>
    <div class="user-weaaper">
        <div class="form-search">
            <div class="form">
                <a-form layout='inline' :form="formData">
                    <template>
                        <a-form-item label='用户查询：'>
                            <a-input v-model="formData.selectData" placeholder='请输入'> </a-input>
                        </a-form-item>

                        <a-form-item>
                            <a-button 
                                @click="selectData"
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
                <div slot="change" slot-scope="text, record">
                    <a-popconfirm title="确定禁用？" okText="确定" cancelText="取消" @confirm="carouselStop"><span class="changeItem">禁用</span></a-popconfirm> <span class="changeItem" @click="carouselEdit">修改</span> <a-popconfirm title="确定禁用？" okText="确定" cancelText="取消" @confirm="carouselDelete"><span class="changeItem" style="color: red;">删除</span></a-popconfirm>
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

// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'number',
}, {
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '性别',
  dataIndex: 'gender',
}, {
    title: '联系方式',
  dataIndex: 'time',
},{
  title: '职位',
  dataIndex: 'phone',
},{
  title: '录入时间',
  dataIndex: 'note'
},{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'change'}
}];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    number: i,
    name: `Edward King ${i}`,
    gender:'男',
    time: '2018/08/07 12:21',
    phone: '123141515',
    note: '这是一些备注信息这是一些备注信息这是一些备注信息这是一些备注信息这是一些备注信息这是一些备注信息这是一些备注信息',
    state:'目前跟进状态目前跟进状态目前跟进状态目前跟进状态目前跟进状态',
    user:'张三',
    effective:'否',
    visit: '否',
    deal: '是',
    money: '50'
  });
}
export default {
    data () {
        return {
            form: null,
            data,
            columns,
            formData: {
                selectData: ''
            }
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
        },
        selectData () {
            console.log('查询')
        },
        addUser () {
            console.log('新增用户')
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


