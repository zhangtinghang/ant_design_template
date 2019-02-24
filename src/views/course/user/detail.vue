<template>
  <div class="ptf-course__container">
    <div class="ptf-course__title">
      <span>基础信息</span>
      <!-- <span class="ptf-course__edit" @click="edtiDetail">编辑</span> -->
    </div>
    <div class="ptf-content__item">
      <span>姓名：{{formData.real_name}}</span>
      <span>性别：{{formData.sex}}</span>
      <span>电话：{{formData.phone}}</span>
      <span>状态：{{formData.student_level}}</span>
    </div>
    <div class="ptf-course__title">
      <span>课程相关</span>
    </div>

    <div style="margin-right:10%">
      <div v-for="courseItem in courseData" :key="courseItem.id" class="ptf-content__item">
        <span>项目名称：{{courseItem.real_name}}</span>
        <span>报课时间：{{courseItem['course.create_time'] | moment("YYYY年MM月DD日")}}</span>
        <span>剩余节数：<span class="ptf-item__num" @click="edtiDetail(courseItem)">{{courseItem.rest_count}}</span></span>
      </div>
      <!-- <div class="ptf-content__item">
          <span>项目名称：篮球</span>
          <span>报课时间：2018-11-12</span>
          <span>剩余节数：<span class="ptf-item__num" @click="edtiDetail">9</span></span>
      </div> -->
    </div>

    <div class="ptf-course__title">
      <span>相关评价历史</span>
    </div>
    <div v-if="!commentData || commentData.length === 0">暂无</div>
    <div v-else>
      <div v-for="item in commentData" :key="item.id" class="ptf-content__eval">
        <div class="ptf-content__item">
          <span>项目名称：{{item['course.real_name']}}</span>
          <span>评价时间：{{item.create_time}}</span>
          <span>操作人：{{item.real_name}}</span>
        </div>
        <div><span>评论信息：</span>{{item.content}}</div>
      </div>
    </div>

    <a-modal title="课程数量" :visible="courseVisible" okText="确定" cancelText="取消" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
        <div>课程剩余：<a-input-number :min="0" :max="courseItemData.rest_count? courseItemData.rest_count : 1" v-model="residueCourse"/></div>
        <div style="padding: 10px 0">课后评价：</div>
        <div><a-textarea placeholder="请输入" v-model="content" :autosize="{ minRows: 4, maxRows: 6 }" /></div>
    </a-modal>
  </div>
</template>
<script>
import { getUserCourse, getUserComment, updateUserComment } from '@/api/course'
import { cloneDeep } from 'lodash'
export default {
  props: {
    detailData: {
      type: Object
    }
  },
  data () {
    return {
      courseVisible: false,
      confirmLoading: false,
      residueCourse: 1,
      content: '',
      formData: {},
      courseData: [],
      commentData: [],
      courseItemData: {}
    }
  },
  created () {
      this.formData = Object.assign({}, this.formData, this.detailData)
      this.getToUserCourse()
      this.getToUserComment()
    },
  watch: {
        detailData: function (val, oldVal) {    
          this.formData = Object.assign({}, this.formData, val)
          this.getToUserCourse()
          this.getToUserComment()
        }
    },
  methods: {
    getToUserCourse () {
      const user_id = this.formData.user_id
      getUserCourse({user_id}).then((courseInfo) => {
        console.log('获取到用户信息', courseInfo)
        this.residueCourse = courseInfo.data.rest_count
        this.courseData = courseInfo.data
      })
    },
    getToUserComment() {
      const user_id = this.formData.user_id
      getUserComment({user_id}).then((commentInfo) => {
        this.commentData = commentInfo.data
      })
    },
    changeDetail() {
      this.courseVisible = true
    },
    handleOk() {
      this.confirmLoading = true
      const {user_id, course_id, id, } = this.courseItemData
      const content = this.content
      const rest_count = this.residueCourse
      const user_course_id = id
      updateUserComment({user_id, course_id, content, user_course_id, rest_count}).then((commentInfo) => {
        this.confirmLoading = false
        if (commentInfo.success) {
          this.$message.success(`添加评论成功.`)
          this.courseVisible = false
          this.courseItemData = {}
          this.getToUserCourse()
          this.getToUserComment()
          this.content = ''
        } else {
            this.$message.error(`添加评论失败.`)
        }
      })
      // setTimeout(() => {
      //   this.courseVisible = false;
      //   this.confirmLoading = false;
      // }, 2000);
    },
    handleCancel(e) {
      this.courseVisible = false
      this.confirmLoading = false
      this.courseItemData = {}
      this.content = ''
    },
    edtiDetail (courseItem) {
      this.courseItemData = cloneDeep(courseItem)
      console.log('课程信息', this.courseItemData)
      this.residueCourse = this.courseItemData.rest_count - 1 < 0 ? 0 : this.courseItemData.rest_count - 1
      this.courseVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.ptf-course__container{
  .ptf-course__title{
    color: #333333;
    font-size: 18px;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    padding-right: 10%;
    .ptf-course__edit{
      font-weight: 700;
      font-size: 14px;
      color: #1890FF;
      cursor: pointer;
    }
  }
  .ptf-content__item{
    padding: 10px 0;
    padding-right: 20%;
    display: flex;
    justify-content: space-between;
    .ptf-item__num{
      font-weight: 700;
      font-size: 18px;
      color: #1890FF;
      line-height: 22px;
      cursor: pointer;
    }
  }
  .ptf-content__eval{
    padding: 10px 0;
  }
}
</style>

