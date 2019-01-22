<template>
    <div class="user-weaaper">
        <search-list @selectHandle="selectHandle"></search-list>
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="data" :scroll="{ x: 1500}">
                <div slot="nameItem" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail">{{text}}</span>
                </div>
                <div slot="resiItem" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail">{{text}}</span>
                </div>
                <div slot="change" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail">详情</span>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
                <div class="footer-pgLeft">
                    <span>共400条记录 第 1 / 80页</span>
                </div>
                <div class="footer-pgRight">
                    <a-pagination @change="onShowSizeChange" :defaultCurrent="3" :total="500" />
                </div>
        </div>
        <a-modal title="用户详情" :visible="visible" @cancel="cancelDetail" :maskClosable="true" :footer="null"  width="60%">
            <user-detail></user-detail>
        </a-modal>
    </div>
</template>
<script>
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}
function changeTextItem (text, record, index) {
    if(text.length > 15){
        let newText = text.slice(0,15)
        return newText + '...'
    }
    return text
}

// 表格数据
const columns = [{
  title: '编号',
  dataIndex: 'number',
}, {
  title: '姓名',
  dataIndex: 'name',
  scopedSlots: { customRender: 'nameItem'}
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '性别',
  dataIndex: 'gender',
}, {
  title: '联系方式',
  dataIndex: 'phone',
}, {
  title: '状态',
  dataIndex: 'state',
}, {
  title: '剩余课程',
  dataIndex: 'residue',
  scopedSlots: { customRender: 'resiItem'}
}, {
  title: '时间',
  dataIndex: 'time',
}, {
  title: '场地',
  dataIndex: 'address',
}, {
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
    age: '18',
    gender:'男',
    phone: '123141515',
    state:'普通学员',
    residue: '10',
    time: '2018/08/07 12:21',
    address: '这是场地'
  });
}
import searchList from './search'
import userDetail from './detail'
export default {
    data () {
        return {
            hasErrors,
            form: null,
            data,
            columns,
            visible: false,
        }
    },
    components: {
        searchList,
        userDetail
    },
    methods: {
        onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        },
        showModal() {
        this.visible = true
        },
        comeToDetail () {
            this.visible = true
        },
        selectHandle (val) {
            console.log('准备搜索', val)
        },
        cancelDetail () {
            this.visible = false
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


