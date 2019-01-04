<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <a-table size="middle" class="form-wapper" :columns="columns" :dataSource="tableData" :scroll="{ x: 1600}">
    </a-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import Vue from 'vue'

function changeTextItem (text, record, index) {
    try {
        if(text.length > 15){
            let newText = text.slice(0,15)
            return newText + '...'
        }
    } catch (error) {
        return text
    }
    
    return text
}
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
    title: '日期',
  dataIndex: 'date',
},{
  title: '电话',
  dataIndex: 'phone',
},{
  title: '备注',
  dataIndex: 'note',
  customRender : changeTextItem
},{
  title: '跟进状态',
  dataIndex: 'state',
},{
  title: '跟进顾问',
  dataIndex: 'user'
},{
  title: '是否有效',
  dataIndex: 'effective',
  width: '55px'
},{
  title: '是否到访',
  dataIndex: 'visit',
  width: '55px'
},{
  title: '是否成交',
  dataIndex: 'deal',
  width: '55px'
},{
  title: '成交金额',
  dataIndex: 'money',
  width: '55px'
}];
export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      data: null,
      columns
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      let childHeader = [];
      //处理跟表头进状态信息
      header.forEach(element => {
        try {
            if(typeof JSON.parse(element) === 'number'){
                let obj = {}
                obj.title = element;
                obj.dataIndex= element;
                obj.align = 'center';
                obj.width = '200';
                obj.customRender = changeTextItem;
                childHeader.push(obj)
            }
        } catch (error) { }
      })
      let newColumns = this.columns;
      newColumns[6].children = childHeader;
      //需使用数据变异 才能响应数据变化
      Vue.set(this.columns, 6, newColumns[6])
      //处理数据
      this.tableData = results
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wapper{
    margin-top: 40px;
}
</style>

