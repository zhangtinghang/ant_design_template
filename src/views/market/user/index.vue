<template>
    <div class="user-weaaper">
        <div class="form-search">
            <div class="form">
                <a-form layout='inline'>
                    <a-form-item label='用户查询：'>
                        <a-input placeholder='请输入' v-model="userSelect"></a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-button type='primary' htmlType='submit' @click="selectBtn">查询</a-button>
                    </a-form-item>
                </a-form>
            </div>
            <div class="addUser">
                <a-button type="primary" @click="addUser">新增用户</a-button>
            </div>
        </div>
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="listData" :scroll="{ x: 1500}">
                <a slot="name" slot-scope="text, record, index" @click="sendToDetail(text, record, index)" href="javascript:;">{{text}}</a>
                <a slot="state" slot-scope="text, record, index" @click="sendToDetail(text, record, index)" href="javascript:;">查看详情</a>
                <div slot="time" slot-scope="text, record">
                    {{ text*1000 | moment("YYYY年MM月DD日")}}
                </div>
                <div slot="change" slot-scope="text, record, index">
                    <span class="changeItem" @click="showModal(text, record, index)">修改</span> <span class="changeItem" @click="addStudent(record)">成为学员</span>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
            <div class="footer-pgLeft">
                <span>共{{total}}条记录 第 {{currentNum}} / {{totalNum}}页</span>
            </div>
            <div class="footer-pgRight">
                <a-pagination  @change="onShowSizeChange" :defaultCurrent="1" :total="total" />
            </div>
        </div>
        <!-- 详情 -->
        <a-modal :visible="isDetail" :footer="null" width="60%">
            <detail-form :detailData="detailData" @closeDetail="closeDetail"></detail-form>
        </a-modal>
        <a-modal :visible="visible" :footer="null" :closable="false">
            <edit-form @editForm="editForm" :editFormData="editFormData" @caceleditForm="caceleditForm"></edit-form>
        </a-modal>
        
    </div>
</template>

<script>
    import editForm from './edit'
    import detailForm from './detail'
    import { cloneDeep } from 'lodash'
    import { updateMarket } from '@/api/market'
    function changeTextItem(text, record, index) {
        if (text) {
            if (text && text.length && text.length > 15) {
                let newText = text.slice(0, 15)
                return newText + '...'
            }
            return text
        } else {
            return '暂无'
        }
    }
    
    // 表格数据
    const columns = [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '姓名',
        dataIndex: 'real_name',
        scopedSlots: {
            customRender: 'name'
        },
        align: 'center'
    }, {
        title: '性别',
        dataIndex: 'sex',
        align: 'center'
    }, {
        title: '时间',
        dataIndex: 'create_time',
        scopedSlots: { customRender: 'time'},
        align: 'center'
    }, {
        title: '电话',
        dataIndex: 'phone',
        align: 'center'
    }, {
        title: '备注',
        dataIndex: 'note',
        customRender: changeTextItem,
        align: 'center'
    }, {
        title: '跟进状态',
        dataIndex: 'status',
        scopedSlots: {
            customRender: 'state'
        },
        align: 'center'
    }, {
        title: '跟进顾问',
        dataIndex: 'adviser',
        align: 'center',
        customRender: (text, record, index) => {
            if( text === 1) {
                return '是'
            } else {
                return '否'
            }
        }
    }, {
        title: '是否有效',
        dataIndex: 'is_valid',
        width: '100px',
        align: 'center',
        customRender: (text, record, index) => {
            if( text === 1) {
                return '是'
            } else {
                return '否'
            }
        }
    }, {
        title: '是否到访',
        dataIndex: 'is_visited',
        width: '100px',
        align: 'center',
        customRender: (text, record, index) => {
            if( text === 1) {
                return '是'
            } else {
                return '否'
            }
        }
    }, {
        title: '是否成交',
        dataIndex: 'is_deal',
        width: '100px',
        align: 'center',
        customRender: (text, record, index) => {
            if( text === 1) {
                return '是'
            } else {
                return '否'
            }
        }
    }, {
        title: '成交金额',
        dataIndex: 'money',
        width: '100px',
        align: 'center',
        customRender: (text, record, index) => {
            const money = `¥${text/100}`
            return money
        }
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'change'
        },
        align: 'center'
    }];
import { getMarket, selectMarket } from '@/api/market'
export default {
    created () {
        this.getToMarket({offset: 0, limit: 10})
    },
    data() {
        return {
            listData: [],
            columns,
            visible: false,
            isDetail: false,
            userSelect: '',
            detailData: {},
            editFormData: {},
            total: 1,
            currentNum: 1,
            pageNum: 10
        }
    },
    components: {
        editForm,
        detailForm
    },
    computed: {
        totalNum() {
            return Math.ceil(this.total/this.pageNum)
        }
    },
    methods: {
        getToMarket(data) {
            let getData = Object.assign({}, {enable:-1}, data)
            getMarket(getData).then((info) => {
                this.listData = info.data
                this.total = info.total_count
            })
        },
        onShowSizeChange(page, pageSize) {
            this.currentNum  = page
            this.pageNum = pageSize
            this.getToMarket({offset: (page-1)*pageSize, limit: 10})
        },
        showModal(text, record, index) {
            this.editFormData = cloneDeep(record)
            this.visible = true
        },
        editForm(formData) {
            updateMarket(formData).then((editInfo) => {
                this.$message.success('修改成功！')
                this.visible = false;
                this.getToMarket({offset: (this.currentNum-1) * this.pageNum, limit: 10})
            })
        },
        caceleditForm() {
            this.visible = false;
        },
        selectBtn () {
            let getData = Object.assign({}, {enable:-1}, {real_name: this.userSelect}, {offset: 0, limit: 10, token: '12'})
            selectMarket(getData).then(info => {
                this.listData = info.data
                this.total = info.total_count
            })
        },
        addUser () {
            this.$router.push('/market/add')
        },
        addStudent (items) {
            const _this = this
            console.log('当前this', this)
            this.$confirm({
                title: '请确认',
                content: '是否添加到学员',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                    _this.$router.push('/course/add')
                },
                onCancel() {
                console.log('Cancel');
                }
            });
        },
        sendToDetail (text, record, index) {
            console.log('店家', text, record, index)
            this.isDetail = true
            this.detailData = record
        },
        closeDetail () {
            this.isDetail = false
        },
        changeTextItem(text, record, index) {
            if (text && text.length && text.length > 15) {
                let newText = text.slice(0, 15)
                return newText + '...'
            }
            return text
    }
    },
}
</script>

<style lang="scss" scoped>
    .user-weaaper {
        position: relative;
        padding-bottom: 20px;
        min-height: 100%;
    }
    
    .form-search {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
    }
    
    .ant-form-item /deep/ .ant-form-item-control {
        width: 15vw;
    }
    
    .changeItem {
        color: #1890FF;
        margin-right: 15px;
        cursor: pointer;
        width: 50px 0;
    }
    
    .footer-pg {
        margin: 50px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>


