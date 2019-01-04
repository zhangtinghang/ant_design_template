<template>
    <div>
        <a-form @submit="handleSubmit" :form="form">
            <a-form-item
            label='课程名称'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-input
                placeholder='请输入课程名称'
                v-decorator="[
                'note',
                {rules: [{ required: true, message: '请输入课程名称' }]}
                ]"
            />
            </a-form-item>
            <a-form-item
                label='上传风采图片：'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
                <a-row type="flex" justify="start">
                    <a-upload
                        name="avatar"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="//jsonplaceholder.typicode.com/posts/"
                        :beforeUpload="beforeUpload"
                        @change="handleChange"
                    >
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-row>
            </a-form-item>

            <a-form-item
                label='课程名称'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
            <a-textarea placeholder="课程介绍" :autosize="{ minRows: 3, maxRows: 8 }" />
            </a-form-item>

            <a-form-item
                label='课程地点'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
                <a-select
                mode="multiple"
                :size="size"
                placeholder="请选择"
                :defaultValue="[]"
                @change="handleChange"
                @popupScroll="popupScroll"
                >
                <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                    {{(i + 9).toString(36) + i}}
                </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
            label='课程节数：'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-input
                placeholder='请输入课程名称'
                v-decorator="[
                'note',
                {rules: [{ required: true, message: '请输入' }]}
                ]"
            />
            </a-form-item>

            <a-form-item
            label='课程价格：'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-select
                v-decorator="[
                'gender',
                {rules: [{ required: true, message: 'Please select your gender!' }]}
                ]"
                placeholder='请选择'
                @change="this.handleSelectChange"
            >
                <a-select-option value='male'>male</a-select-option>
                <a-select-option value='female'>female</a-select-option>
            </a-select>
            </a-form-item>
            
            <a-form-item
            label='是否启用'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-select
                v-decorator="[
                'gender',
                {rules: [{ required: true, message: 'Please select your gender!' }]}
                ]"
                placeholder='请选择'
                @change="this.handleSelectChange"
            >
                <a-select-option value='male'>是</a-select-option>
                <a-select-option value='female'>否</a-select-option>
            </a-select>
            </a-form-item>

            <a-form-item
            :wrapperCol="{ span: 12, offset: 5 }"
            >
            <a-button type='primary' htmlType='submit'>
                保存
            </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
    data () {
    return {
      loading: false,
      imageUrl: '',
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>


<style lang="scss" scoped>
    .content-title{
        background-color: #fafafa;
        width: 100%;
        height: 48px;
        border: 1px solid rgba(233, 233, 233, 1);
        border-bottom: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        & > span{
            display: block;
        }
        .content-btn{
            color: #1890FF;
        }
        .content-text{
            & /deep/ .content-text-input{
                border: none;
            }
        }
    }
    .content{
        border-radius: none;
    }
    .ant-row-flex{
        margin-top: 30px;
    }
</style>