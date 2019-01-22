<template>
    <div>
        <a-form :form="formData">
            <a-form-item
            label='课程名称'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-input type="text" v-model="formData.real_name" placeholder='请输入课程名称' />
            </a-form-item>
            <a-form-item
                label='上传图片：'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
                <a-row type="flex" justify="start">
                    <a-upload
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="http://112.74.215.22:5678/pe/file"
                        :beforeUpload="beforeUpload"
                        :data="uploadData"
                        @change="uploadImg"
                    >
                        <img v-if="imageUrl"  class="imgCover" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-row>
            </a-form-item>

            <a-form-item
                label='课程介绍'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
            <a-textarea v-model="formData.intro" placeholder="课程介绍" :autosize="{ minRows: 3, maxRows: 8 }" />
            </a-form-item>

            <a-form-item
                label='课程地点'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 12 }"
            >
                <a-select v-model="formData.type" placeholder="请选择">
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
            <a-input v-model="formData.count_" placeholder='请输入课程节数' />
            </a-form-item>

            <a-form-item
            label='课程价格：'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-input v-model="formData.money" placeholder='请输入课程价格' />
            </a-form-item>
            
            <a-form-item
            label='是否启用'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            >
            <a-select v-model="formData.enable" placeholder='请选择'>
                <a-select-option value='1'>是</a-select-option>
                <a-select-option value='0'>否</a-select-option>
            </a-select>
            </a-form-item>

            <a-form-item
            :wrapperCol="{ span: 12, offset: 5 }"
            >
            <a-button type='primary' htmlType='submit' @click="saveToData">
                保存
            </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { createCourse } from '@/api/list'
export default {
    data () {
    return {
      loading: false,
      imageUrl: '',
      uploadData: {},
      formData: {
          real_name: '',
          intro: '',
          type: [],
          count_: '',
          money: '',
          enable: ''
      }
    }
  },
  mounted () {
      this.uploadData = {
          token: this.$store.state.user.token,
          fileName: 'avatar'
      }
  },
  methods: {
    beforeUpload (file) {
      const isLt4M = file.size / 1024 / 1024 < 4
      if (!isLt4M) {
        this.$message.error('图片大小超过4MB!')
      }
      return isLt4M
    },
    uploadImg (info) {
        if (info.file.status !== 'uploading') {}
        if (info.file.status === 'done') {
            this.$message.success(`上传图片成功.`)
            this.imageUrl = 'http://112.74.215.22/pe/'+info.file.response.filenames[0]
        } else if (info.file.status === 'error') {
            if(info.file && info.file.error && info.file.error.status === 401) {
                removeToken()
                this.$router.push('/login')
                this.$message.error(`未登录或帐号过期！`)
            } else {
                this.$message.error('上传图片失败!')
            }
        }
    },
    saveToData () {
        this.formData.picture = this.imageUrl
        this.formData.token = this.$store.state.user.token
        try {
            this.formData.enable = parseInt(this.formData.enable)            
        } catch (error) {}
        createCourse(this.formData).then((data) => {
            this.$message.success(`上传信息成功.`)
            this.imageUrl = '';
            for (let i in this.formData) {
                this.formData[i] = ''
            }
        }).catch((err) => {
            if (err) {
                this.$message.success(`上传信息失败.`+err)
                console.log('上传信息失败', err)
            }
        })
    }
  }
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
    .imgCover{
        width: 104px;
        height: 104px;
    }
</style>