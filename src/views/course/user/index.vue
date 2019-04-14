<template>
    <div class="user-weaaper">
        <search-list @selectHandle="selectHandle"></search-list>
        <div class="wapper">
            <a-table :columns="columns" :pagination="false" :dataSource="data" :scroll="{ x: 1500}">
                <div slot="time" slot-scope="text, record">
                    {{ text*1000 | moment("YYYY年MM月DD日")}}
                </div>
                <div slot="nameItem" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail(record)">{{text}}</span>
                </div>
                <div slot="resiItem" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail(record)">{{text}}</span>
                </div>
                <div slot="change" slot-scope="text, record">
                    <span class="changeItem" @click="comeToDetail(record)">详情</span>
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
        <a-modal title="用户详情" :visible="visible" @cancel="cancelDetail" :maskClosable="true" :footer="null"  width="60%">
            <user-detail :detailData="detailData"></user-detail>
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
  dataIndex: 'id',
  align: 'center'
}, {
  title: '姓名',
  dataIndex: 'real_name',
  scopedSlots: { customRender: 'nameItem'},
  align: 'center'
}, {
  title: '年龄',
  dataIndex: 'age',
  align: 'center'
}, {
  title: '性别',
  dataIndex: 'sex',
  align: 'center'
}, {
  title: '联系方式',
  dataIndex: 'phone',
  align: 'center'
}, {
  title: '状态',
  dataIndex: 'student_level',
  align: 'center'
}, {
  title: '剩余课程',
  dataIndex: 'rest_count',
  scopedSlots: { customRender: 'resiItem'},
  align: 'center'
}, {
  title: '时间',
  dataIndex: 'create_time',
  scopedSlots: { customRender: 'time'},
  align: 'center'
}, {
  title: '场地',
  dataIndex: 'latest_course["location.real_name"]',
  align: 'center'
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'change'},
  align: 'center'
}];
import searchList from './search'
import userDetail from './detail'
import { getCourseUser, selectCourse } from '@/api/course'
import { cloneDeep } from 'lodash'
export default {
    data () {
        return {
            hasErrors,
            form: null,
            data: [],
            columns,
            visible: false,
            total: 1,
            currentNum: 1,
            pageNum: 10,
            detailData: [],
            editVisible: false,
            editFormData: {}
        }
    },
    created () {
        this.getToCourseUser({ offset: 0, limit: 10})
    },
    components: {
        searchList,
        userDetail
    },
    computed: {
        totalNum() {
            return Math.ceil(this.total/this.pageNum)
        }
    },
    methods: {
        getToCourseUser (data) {
            getCourseUser(data).then((courseInfo) => {
                this.data = courseInfo.data
                this.total = courseInfo.total_count
            })
        },
        onShowSizeChange(current, pageSize) {
            this.currentNum  = current
            this.pageNum = pageSize
            this.getToCourseUser({ offset:(current-1) * pageSize, limit: pageSize})
        },
        comeToDetail (item) {
            this.detailData = cloneDeep(item)
            this.visible = true
        },
        selectHandle (val) {
            let getData = Object.assign({}, {enable:-1}, {real_name: val}, {offset: 0, limit: 10, token: '12'})
            selectCourse(getData).then((courseInfo) => {
                this.data = courseInfo.data
                this.total = courseInfo.total_count
            })
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


