<template>
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
</template>
<script>
export default {
  data () {
    return {
        searchData: {
            userSelect: null,
            statusSelect: null
        }
    }
  },
  methods: {
    selectBtn () {
        this.$emit('selectHandle', this.searchData)
    },
    addUser () {
      this.$router.push('/course/add')
    }
  }
}
</script>
<style lang="scss" scoped>
.form-search{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}
.ant-form-item /deep/ .ant-form-item-control{
    width: 15vw;
}
</style>

