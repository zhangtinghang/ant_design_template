<template>
    <div class="user-weaaper">
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="data" :scroll="{ x: '100%'}">
                <div slot="images" class="img-wapper" slot-scope="text, record">
                    <img :src="text" alt="轮播图片" />
                </div>
                <div slot="change" slot-scope="text, record">
                        <div class="opera-item"><a-button type="primary">启用</a-button></div>
                        <div class="opera-item"><a-button type="primary">编辑</a-button></div>
                        <div class="opera-item"><a-button type="danger">删除</a-button></div>
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
import imagesItem from '../../images/imgCover.png'
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
  align: 'center'
}, {
  title: '地点名称',
  dataIndex: 'content',
  align: 'center'
}, {
  title: '地点图片',
  dataIndex: 'image',
  scopedSlots: { customRender: 'images'},
  align: 'center'
}, {
    title: '精度',
  dataIndex: 'type',
  align: 'center'
}, {
  title: '维度',
  dataIndex: 'user',
  align: 'center'
}, {
  title: '金额',
  dataIndex: 'time',
  align: 'center'
}, {
  title: '操作',
  dataIndex: 'operation',
  align: 'center',
  scopedSlots: { customRender: 'change'}
}];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    number: i,
    time: '2018/08/07 12:21',
    phone: '123141515',
    user:'张三',
    image: imagesItem,
    content: '这是无数个正文内容',
    type: '公告',
    time: '2018-11-22',
  });
}
export default {
    data () {
        return {
            imagesItem,
            hasErrors,
            data,
            loading: false,
            selectedRowKeys: [],
            columns,
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        }
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


