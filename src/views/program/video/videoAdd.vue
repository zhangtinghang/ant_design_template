<template>
    <div>
        <div>
            <a-row type="flex" justify="start">
                <a-col :span="3">标题：</a-col>
                <a-col :span="9">
                    <a-form-item>
                        <a-upload 
                        name='file'
                        :beforeUpload="beforeUpload"
                        :data="uploadData"
                        @change="uploadVideo"
                        accept="video/*"
                        action='http://112.74.215.22:5678/pe/file'>
                            <a-button>
                                <a-icon type='upload' /> 上传视频
                            </a-button>
                        </a-upload>
                    </a-form-item>
                </a-col>
            </a-row>
            <div>
                <a-row type="flex" justify="start">
                    <a-col :span="3">视频标题：</a-col>
                    <a-col :span="9">
                        <a-input placeholder='请输入' v-model="formData.title" />
                    </a-col>
                </a-row>
            </div>
    
            <div style="margin-bottom: 20px">
                <a-row type="flex" justify="start">
                    <a-col :span="3">是否开启：</a-col>
                    <a-col :span="9">
                        <a-select style="width: 100%" v-model="formData.enable">
                            <a-select-option value="1">是</a-select-option>
                            <a-select-option value="0">否</a-select-option>
                        </a-select>
                    </a-col>
                </a-row>
            </div>
    
            <div class="content-title">
                <span class="content-text">介绍文字</span>
                <span class="content-btn" @click="saveToData">保存</span>
            </div>
            <a-textarea class="content" v-model="formData.intro" placeholder="请输入" :autosize="{ minRows: 10, maxRows: 15 }" />
        </div>
    </div>
</template>

<script>
import { createVideo } from '@/api/video'
    export default {
        data() {
            return {
                uploadData: {},
                formData: {
                    title: '',
                    intro: '',
                    enable: '',
                    type: 'admin',
                    video: ''
                }
            }
        },
        mounted () {
            this.uploadData = {
                token: this.$store.state.user.token,
                fileName: ['video']
            }
        },
        methods: {
            saveToData() {
                console.log('保存视频', this.formData)
                this.formData.token = this.$store.state.user.token
                try {
                    this.formData.enable = parseInt(this.formData.enable)            
                } catch (error) {}
                createVideo(this.formData).then((data) => {
                    this.$message.success(`上传成功.`);
                }).catch((err) => {
                    if (err) {
                        console.log('上传失败', err)
                    }
                })
            },
            beforeUpload (file) {
                console.log('上传视频之前', file)
            },
            uploadVideo (info) {
                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`上传视频成功.`)
                    this.formData.video = info.file.response.filenames[0]
                } else if (info.file.status === 'error') {
                    this.$message.error(`上传图片失败.`)
      }
            }
        },
    }
</script>


<style lang="scss" scoped>
    .content-title {
        background-color: #fafafa;
        width: 100%;
        height: 48px;
        border: 1px solid rgba(233, 233, 233, 1);
        border-bottom: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        &>span {
            display: block;
        }
        .content-btn {
            color: #1890FF;
            cursor: pointer;
        }
        .content-text {
            & /deep/ .content-text-input {
                border: none;
            }
        }
    }
    
    .content {
        border-radius: none;
    }
    
    .ant-row-flex {
        margin-top: 30px;
    }
</style>