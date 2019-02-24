<template>
    <div class="form-container">
        <div class="header-title">信息修改</div>
        <div class="form-wapper">
            <a-form layout='vertical' :form="formData">
                    
                <a-form-item label='姓名'>
                    <a-input v-model="formData.real_name" placeholder='请输入' />
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
                    <a-textarea v-model="formData.status" placeholder="每次跟进都会记录，请直接填写当前记录" :autosize="{ minRows: 2, maxRows: 6 }" />
                </a-form-item>

                <a-form-item label='跟进顾问：'>
                    <a-input type="text" v-model="formData.adviser" placeholder='请输入' />
                </a-form-item>

                <a-form-item label='是否有效：'>
                    <a-select :defaultValue="formData.is_valid" v-model="formData.is_valid">
                        <a-select-option value="1">是</a-select-option>
                        <a-select-option value="0">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='是否到访：'>
                    <a-select :defaultValue="formData.is_visited" v-model="formData.is_visited">
                        <a-select-option value="1">是</a-select-option>
                        <a-select-option value="0">否</a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label='是否成交：'>
                    <a-select :defaultValue="formData.is_deal" v-model="formData.is_deal">
                        <a-select-option value="1">是</a-select-option>
                        <a-select-option value="0">否</a-select-option>
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
    import { cloneDeep } from 'lodash'
    export default {
        props: {
            editFormData: {
                type: Object
            }
        },
        data() {
            return {
                checkNick: false,
                formData: {
                    adviser: '',
                    age: '',
                    create_time: '',
                    id: '',
                    is_deal: '',
                    is_valid: '',
                    is_visited: '',
                    money: '',
                    note: '',
                    phone: '',
                    real_name: '',
                    sex: ''
                }
            }
        },
        mounted() {
            this.formData = Object.assign(this.formData, this.editFormData)
            this.formData.is_deal = JSON.stringify(this.formData.is_deal)
            this.formData.is_valid = JSON.stringify(this.formData.is_valid)
            this.formData.is_visited = JSON.stringify(this.formData.is_visited)
            this.formData.money = this.formData.money/100
        },
        watch: {
            editFormData: function (val, oldVal) {
                this.formData = Object.assign(this.formData, val)
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
