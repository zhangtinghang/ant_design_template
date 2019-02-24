<template>
  <div class="app-container">
    <div>
      <a-button :loading="loading" style="margin-left:16px;" type="primary" @click="uploadServer">导入</a-button>
      <a-button style="margin-left:16px;" type="primary" @click="reload">重置</a-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <p v-show="isResult">上传成功人数：{{succNum}}<br /> 上传失败名单:</p>
    <a-table size="middle" class="form-wapper" :columns="columns" :dataSource="tableData" :scroll="{ x: 1600}"></a-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { addBatchMarket } from '@/api/market'
import { cloneDeep } from 'lodash'
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
  title: '姓名',
  dataIndex: 'real_name',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '性别',
  dataIndex: 'sex',
}, {
    title: '日期',
  dataIndex: 'update_time',
},{
  title: '电话',
  dataIndex: 'phone',
},{
  title: '备注',
  dataIndex: 'note',
  customRender : changeTextItem
},{
  title: '跟进情况',
  dataIndex: 'follow_ups',
},{
  title: '跟进顾问',
  dataIndex: 'adviser'
},{
  title: '是否有效',
  dataIndex: 'is_valid',
  width: '55px'
},{
  title: '是否到访',
  dataIndex: 'is_visited',
  width: '55px'
},{
  title: '是否成交',
  dataIndex: 'is_deal',
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
      columns,
      loading: false,
      isResult: false,
      succNum: 0
    }
  },
  methods: {
    uploadServer() {
      let beforeData = cloneDeep(this.tableData)
      beforeData.forEach(info => {
        if (typeof info.phone === 'number') {
          try {
            info.phone = JSON.stringify(info.phone)
          } catch (error) {}
        }
        let date = new Date(info.update_time)
        info.update_time = date.getTime()
      })
      const update = {}
      update.data = beforeData
      update.token = null
      addBatchMarket(update).then((addInfo) => {
        if (addInfo.success) {
          this.isResult = true
          try {
            this.succNum = this.tableData.length - addInfo.fail_data.length
          } catch (error) {}
          this.tableData = addInfo.fail_data
          this.$message.success('上传成功！')
        } else {
          this.$message.error('上传失败，请重试！')
        }
      })
    },
    reload() {
      this.$message.warning('上传的文件不能大于1M.')
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message.warning('上传的文件不能大于1M.')
      return false
    },
    handleSuccess({ results, header }) {
      let resultsFilter = []
      results.forEach(element => {
        let obj = {
          "real_name": "",
          "age": 0,
          "sex": "",
          "update_time": null,
          "phone": "",
          "note": "",
          "adviser": "",
          "is_valid": 0,
          "is_visited": 0,
          "is_deal": 0,
          "money": 0,
          "follow_ups": []
        }
        for (let i in element) {
          let value = element[i]
          let objKey = this.filterTextToWord(i)
          if(objKey === 'follow_ups') {
            try {
              value = value.split('/')
            } catch (error) {}
          }
          obj[objKey] = value
        }
        resultsFilter.push(obj)
      })
      //处理数据
      this.tableData = resultsFilter
    },
    filterTextToWord(val){
      switch (val) {
        case '序号':
          val = 'number'
          break;
        case '姓名':
          val = 'real_name'
          break;
        case '年龄':
          val = 'age'
          break;
        case '性别':
          val = 'sex'
          break;
        case '日期':
          val = 'update_time'
          break;
        case '电话':
          val = 'phone'
          break;
        case '备注':
          val = 'note'
          break;
        case '跟进情况':
          val = 'follow_ups'
          break;
        case '跟进顾问':
          val = 'adviser'
          break;
        case '是否有效':
          val = 'is_valid'
          break;
        case '是否到访':
          val = 'is_visited'
          break;
        case '是否成交':
          val = 'is_deal'
          break;
        case '成交金额':
          val = 'money'
          break;
        default:
          val = 'none'
          break;
      }
      return val
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wapper{
    margin-top: 40px;
}
</style>

