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
import { cloneDeep } from 'lodash'
import { addBatchEmployees } from '@/api/employees'



const columns = [{
  title: '姓名',
  dataIndex: 'real_name',
},{
  title: '性别',
  dataIndex: 'sex',
},{
  title: '电话',
  dataIndex: 'phone',
},{
    title: '权限',
  dataIndex: 'perm',
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
      beforeData.forEach(beforeData => {
        let val = null
        switch (beforeData.perm) {  
          case '课程顾问':
            val = 'course'
            break;
          case '市场管理':
            val = 'market'
            break;
          case '普通管理员':
            val = 'admin'
            break;
          default:
          val = ''
            break;
        }
        beforeData.perm = val
      })
      const update = {}
      update.data = beforeData
      update.token = null
      addBatchEmployees(update).then((addInfo) => {
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
          real_name: "",
          sex: "",
          phone: "",
          perm: ""
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
        case '权限':
          val = 'perm'
          break;
        case '性别':
          val = 'sex'
          break;
        case '电话':
          val = 'phone'
          break;
        default:
          val = val
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

