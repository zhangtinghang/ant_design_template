<template>
    <div>
        <div>
            <a-row type="flex" justify="start">
                <a-col :span="3">标题：</a-col>
                <a-col :span="9">
                    <a-form-item
                        v-bind="formItemLayout"
                        extra='longgggggggggggggggggggggggggggggggggg'
                    >
                        <a-upload
                        v-decorator="['upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                        }]"
                        name='logo'
                        action='/upload.do'
                        listType='picture'
                        >
                        <a-button>
                            <a-icon type='upload' /> Click to upload
                        </a-button>
                        </a-upload>
                    </a-form-item>
                </a-col>
            </a-row>
            <div>
                <a-row type="flex" justify="start">
                    <a-col :span="3">视频标题：</a-col>
                    <a-col :span="9">
                        <a-input
                            placeholder='请输入'
                            v-decorator="[
                            'note',
                            {rules: [{ required: true, message: '请输入' }]}
                            ]"
                        />
                    </a-col>
                </a-row>
            </div>

            <div style="margin-bottom: 20px">
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
            
            <div class="content-title">
                <span class="content-text">介绍文字</span>
                <span class="content-btn">保存</span>
            </div>
            <a-textarea class="content" placeholder="请输入" :autosize="{ minRows: 10, maxRows: 15 }" />
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