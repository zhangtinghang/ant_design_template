<template>
  <div class="app-container">
    <div>
      <a-button :loading="loading" style="margin-left:16px;" type="primary" @click="uploadServer">导入</a-button>
      <a-button style="margin-left:16px;" type="primary" @click="reload">重置</a-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
    <p v-show="isResult">上传成功人数：{{succNum}}<br /> 上传失败名单:</p>
    <a-table size="middle" class="form-wapper" :columns="columns" :dataSource="tableData" :scroll="{ x: 1600}">
    </a-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import Vue from 'vue'
import { addBatchCourse } from '@/api/course'
import { cloneDeep } from 'lodash'
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
},{
    title: '年龄',
  dataIndex: 'age',
},{
  title: '性别',
  dataIndex: 'sex',
},{
  title: '电话',
  dataIndex: 'phone',
},{
  title: '备注',
  dataIndex: 'note',
  customRender : changeTextItem
},{
  title: '剩余课时',
  dataIndex: 'rest_count'
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
      })
      const update = {}
      update.data = beforeData
      update.token = null
      addBatchCourse(update).then((addInfo) => {
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
          "age": null,
          "sex": "",
          "phone": "",
          "note": "",
          "rest_count": 0,
          "course_id": 35,
          "location_id": 8
        }
        for (let i in element) {
          let value = element[i]
          let objKey = this.filterTextToWord(i)
          obj[objKey] = value
        }
        resultsFilter.push(obj)
      })
      //处理数据
      this.tableData = resultsFilter
    },
    filterTextToWord(val){
      switch (val) {
        case '姓名':
          val = 'real_name'
          break;
        case '年龄':
          val = 'age'
          break;
        case '性别':
          val = 'sex'
          break;
        case '电话':
          val = 'phone'
          break;
        case '备注':
          val = 'note'
          break;
        case '剩余课时':
          val = 'rest_count'
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

