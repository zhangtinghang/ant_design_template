<template>
    <div class="user-weaaper">
        <div class="form-search">
            <div class="form">
                <a-form layout='inline' @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                    <template v-if="form">
                        <a-form-item
                        label='用户查询：'
                        fieldDecoratorId="userSelect"
                        >
                            <a-input placeholder='请输入'>
                            </a-input>
                        </a-form-item>

                        <a-form-item
                            label='状态查询：'
                            >
                            <a-select 
                            placeholder= '新用户'>
                                <a-select-option value='1'>Option 1</a-select-option>
                                <a-select-option value='2'>Option 2</a-select-option>
                                <a-select-option value='3'>Option 3</a-select-option>
                            </a-select>
                        </a-form-item>

                        <a-form-item>
                            <a-button
                                type='primary'
                                htmlType='submit'
                                :disabled="hasErrors(form.getFieldsError())"
                            >
                                查询
                            </a-button>
                        </a-form-item>
                    </template>
                </a-form>
            </div>
            <div class="addUser">
                <a-button type="primary">新增用户</a-button>
            </div>
        </div>
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="data" :scroll="{ x: 1500}">
                <div slot="change" slot-scope="text, record">
                    <span class="changeItem" @click="showModal">修改</span> <span class="changeItem" @click="showModal">成为学员</span>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
                <div class="footer-pgLeft">
                    <span>共400条记录 第 1 / 80页</span>
                </div>
                <div class="footer-pgRight">
                    <a-pagination showSizeChanger @showSizeChange="onShowSizeChange" :defaultCurrent="3" :total="500" />
                </div>
        </div>
        <a-modal
            title="Title"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            >
            <p>{{ModalText}}</p>
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
}, {
  title: '性别',
  dataIndex: 'gender',
}, {
    title: '时间',
  dataIndex: 'time',
},{
  title: '电话',
  dataIndex: 'phone',
},{
  title: '备注',
  dataIndex: 'note',
  customRender: changeTextItem
},{
  title: '跟进状态',
  dataIndex: 'state',
  customRender: changeTextItem
},{
  title: '跟进顾问',
  dataIndex: 'user',
},{
  title: '是否有效',
  dataIndex: 'effective',
  width: '60px'
},{
  title: '是否到访',
  dataIndex: 'visit',
  width: '60px'
},{
  title: '是否成交',
  dataIndex: 'deal',
  width: '60px'
},{
  title: '成交金额',
  dataIndex: 'money',
  width: '60px'
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
            hasErrors,
            form: null,
            data,
            loading: false,
            selectedRowKeys: [],
            columns,
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        }
    },
    mounted () {
        this.$nextTick(() => {
        // To disabled submit button at the beginning.
        this.form.validateFields()
        })
    },
    computed: {
        hasSelected() {
        return this.selectedRowKeys.length > 0
        }
    },
     watch:{
      pageSize(val) {
        console.log('pageSize',val);
      },
      current(val) {
        console.log('current',val);
      }
    },
    methods: {
        onShowSizeChange(current, pageSize) {
            console.log(current, pageSize);
        },
        showModal() {
        this.visible = true
        },
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false
        },
        handleSubmit  (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
                // eslint-disable-next-line
                console.log('Received values of form: ', values)
            }
        })
        },
        onChange(pageNumber) {
            console.log('Page: ', pageNumber);
        },
        changeItem () {
            console.log('查询')
        },
        deleteItem () {
            console.log('删除')
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
.footer-pgLeft{

}
</style>


