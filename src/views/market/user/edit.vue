<template>
    <div class="form-container">
        <div class="header-title">信息修改</div>
        <div class="form-wapper">
            <a-form layout='vertical' :form="formData">
                    
                <a-form-item label='姓名'>
                    <a-input v-model="formData.name" placeholder='请输入' />
                </a-form-item>

                <a-form-item label='年龄'>
                    <a-input v-model="formData.age" type="number" placeholder='请输入需要录入的年龄' />
                </a-form-item>

                <a-form-item label='性别'>
                    <a-select defaultValue="" v-model="formData.sex">
                        <a-select-option value="男">男</a-select-option>
                        <a-select-option value="女">女</a-select-option>
                    </a-select>
                </a-form-item>
    
                <a-form-item label='电话'>
                    <a-input type="number" v-model="formData.phone" placeholder='请输入' />
                </a-form-item>
    
                <a-form-item label='备注：'>
                    <a-textarea placeholder="请输入" v-model="formData.note" :autosize="{ minRows: 2, maxRows: 6 }" />
                </a-form-item>
    
                <a-form-item label='跟进状态：'>
                    <a-textarea v-model="formData.note1" placeholder="每次跟进都会记录，请直接填写当前记录" :autosize="{ minRows: 2, maxRows: 6 }" />
                </a-form-item>

                <a-form-item label='跟进顾问：'>
                    <a-select defaultValue="" v-model="formData.note2">
                        <a-select-option value="男">新用户</a-select-option>
                        <a-select-option value="女">老用户</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='是否有效：'>
                    <a-select v-model="formData.note3">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='是否到访：'>
                    <a-select v-model="formData.note4">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='是否成交：'>
                    <a-select v-model="formData.note5">
                        <a-select-option value="是">是</a-select-option>
                        <a-select-option value="否">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='成交金额：'>
                    <a-input type="number" v-model="formData.money" placeholder='请输入' />
                </a-form-item>

                <div>
                    <a-button type='primary' class="btn-item add-btn" @click="checkAdd">修改</a-button>
                    <a-button class="btn-item cancel-btn" @click="checkCancel">取消</a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checkNick: false,
                formData: {
                    name: '',
                    age: '',
                    sex: '',
                    phone: '',
                    note: '',
                    note1: '',
                    note2: '',
                    note3: '',
                    note4: '',
                    note5: '',
                    money: ''
                }
            }
        },
        methods: {
            checkAdd () {
                this.$emit('editForm', this.formData)
            },
            checkCancel () {
                this.$emit('caceleditForm', this.formData)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-container {
        margin: 0 auto;
        text-align: center;
        .header-title {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 30px;
        }
        .form-wapper {
            text-align: center;
            display: flex;
            justify-content: center;
            & /deep/ .ant-form {
                width: 100%;
            }
        }
        .btn-item {
            width: 100px;
        }
        .add-btn {
            margin-right: 5vw;
        }
    }
</style>
