<template>
    <div>
        <div>
            <div class="content-title">
                <span class="content-text">
                    <a-input class="content-text-input" placeholder="请输入标题" />
                </span>
                <span class="content-btn">保存</span>
            </div>
            <a-textarea class="content" placeholder="请输入" :autosize="{ minRows: 10, maxRows: 15 }" />
        </div> 
        <div>
            <a-row type="flex" justify="start">
                <a-col :span="3">上传轮播图片：</a-col>
                <a-col :span="9">
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
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-col>
            </a-row>
            <a-row type="flex" justify="start">
                <a-col :span="3">类型：</a-col>
                <a-col :span="9">
                    <a-select  style="width: 100%" @change="handleChange">
                        <a-select-option value="jack">公告</a-select-option>
                        <a-select-option value="lucy">活动</a-select-option>
                        <a-select-option value="Yiminghe">资讯</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row type="flex" justify="start">
                <a-col :span="3">是否开启：</a-col>
                <a-col :span="9">
                    <a-select  style="width: 100%" @change="handleChange">
                        <a-select-option value="jack">是</a-select-option>
                        <a-select-option value="lucy">否</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
        </div>
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