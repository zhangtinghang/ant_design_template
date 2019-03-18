<template>
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
</template>
<script>
export default {
  data () {
    return {
        userSelect: ''
    }
  },
  methods: {
    selectBtn () {
        this.$emit('selectHandle', this.userSelect)
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

