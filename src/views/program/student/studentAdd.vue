<template>
    <div>
        <div>
            <a-row type="flex" justify="start">
                <a-col :span="3">上传风采图片：</a-col>
                <a-col :span="9">
                    <a-upload
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        :action="imageUpload"
                        :beforeUpload="beforeUpload"
                        :data="uploadData"
                        @change="uploadImg"
                    >
                        <img v-if="imageUrl" class="imgCover" :src="imageUrl" alt="avatar" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">上传</div>
                        </div>
                    </a-upload>
                </a-col>
            </a-row>
            <div class="content-title">
                <span class="content-text">介绍文字</span>
                <span class="content-btn" @click="saveToData">保存</span>
            </div>
            <a-textarea class="content" placeholder="请输入" v-model="formData.intro" :autosize="{ minRows: 10, maxRows: 15 }" />
        </div> 
        <div>
            <a-row type="flex" justify="start">
                <a-col :span="3">是否开启：</a-col>
                <a-col :span="9">
                    <a-select  style="width: 100%" v-model="formData.enable">
                        <a-select-option value="1">是</a-select-option>
                        <a-select-option value="0">否</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { createStudent } from '@/api/student'
export default {
    data () {
    return {
      loading: false,
      imageUrl: '',
      uploadData: {},
      formData: {
          enable: '',
          intro: ''
      },
      imageUpload: 'https://laite.pathfinder666.cn/upload',
      imageView: 'https://laite.pathfinder666.cn/pe/'
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
            this.imageUrl = this.imageView+info.file.response.filenames[0]
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
        createStudent(this.formData).then((data) => {
            this.imageUrl = '';
            for (let i in this.formData) {
                this.formData[i] = ''
            }
            this.$message.success(`上传信息成功.`)
        }).catch((err) => {
            if (err) {
                this.$message.success(`上传信息失败.`+err)
            }
        })
    }
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
            cursor: pointer;
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