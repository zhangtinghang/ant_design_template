<template>
    <div class="user-weaaper">
        <div class="form-search">
            <div class="form">
                <a-form layout='inline' :form="searchData">
                    <a-form-item label='用户查询：'>
                        <a-input placeholder='请输入' v-model="searchData.userSelect"></a-input>
                    </a-form-item>
    
                    <a-form-item label='状态查询：'>
                        <a-select placeholder='新用户' v-model="searchData.statusSelect">
                            <a-select-option value='1'>Option 1</a-select-option>
                            <a-select-option value='2'>Option 2</a-select-option>
                            <a-select-option value='3'>Option 3</a-select-option>
                        </a-select>
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
                <a slot="state" slot-scope="text, record, index" @click="sendToDetail(text, record, index)" href="javascript:;">{{changeTextItem(text)}}</a>
                <div slot="change" slot-scope="text, record">
                    <span class="changeItem" @click="showModal">修改</span> <span class="changeItem" @click="addStudent">成为学员</span>
                </div>
            </a-table>
        </div>
        <div class="footer-pg">
            <div class="footer-pgLeft">
                <span>共400条记录 第 1 / 80页</span>
            </div>
            <div class="footer-pgRight">
                <a-pagination @change="onShowSizeChange" :hideOnSinglePage="true" :total="500" />
            </div>
        </div>
        <!-- 详情 -->
        <a-modal :visible="isDetail" :footer="null" width="60%">
            <detail-form :detailData="detailData" @closeDetail="closeDetail"></detail-form>
        </a-modal>
        <a-modal :visible="visible" :footer="null">
            <edit-form @editForm="editForm" @caceleditForm="caceleditForm"></edit-form>
        </a-modal>
        
    </div>
</template>

<script>
    import editForm from './edit'
    import detailForm from './detail'    
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
        dataIndex: 'number',
    }, {
        title: '姓名',
        dataIndex: 'real_name',
        scopedSlots: {
            customRender: 'name'
        }
    }, {
        title: '性别',
        dataIndex: 'sex',
    }, {
        title: '时间',
        dataIndex: 'create_time',
    }, {
        title: '电话',
        dataIndex: 'phone',
    }, {
        title: '备注',
        dataIndex: 'note',
        customRender: changeTextItem
    }, {
        title: '跟进状态',
        dataIndex: 'status',
        scopedSlots: {
            customRender: 'state'
        }
    }, {
        title: '跟进顾问',
        dataIndex: 'adviser',
    }, {
        title: '是否有效',
        dataIndex: 'is_valid',
        width: '60px'
    }, {
        title: '是否到访',
        dataIndex: 'is_visited',
        width: '60px'
    }, {
        title: '是否成交',
        dataIndex: 'is_deal',
        width: '60px'
    }, {
        title: '成交金额',
        dataIndex: 'money',
        width: '60px'
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: {
            customRender: 'change'
        }
    }];
import { getMarket } from '@/api/market'
export default {
    created () {
        getMarket().then((info) => {
            console.log('这是市场管理', info)
            this.listData = info.data
        })
    },
    data() {
        return {
            listData: [],
            columns,
            visible: false,
            isDetail: false,
            searchData: {
                userSelect: '',
                statusSelect: ''
            },
            pageSize: 0,
            current: 0,
            detailData: {}
        }
    },
    components: {
        editForm,
        detailForm
    },
    methods: {
        onShowSizeChange(page, pageSize) {
            console.log('点击分页')
        },
        showModal() {
            this.visible = true
        },
        editForm(formData) {
            console.log('得到修改的表单', formData)
            this.visible = false;
        },
        caceleditForm() {
            this.visible = false;
        },
        selectBtn () {
            console.log('点击查询', this.searchData)
        },
        addUser () {
            console.log('点击新增用户')
            this.$router.push('/market/add')
        },
        addStudent () {
            this.$confirm({
                title: '请确认',
                content: '是否添加到学员',
                okText: '确认',
                cancelText: '取消',
                onOk() {
                console.log('确定');
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


