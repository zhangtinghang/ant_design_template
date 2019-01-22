<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="教练风采管理" key="1">
                <coach-item></coach-item>
            </a-tab-pane>
            <a-tab-pane tab="上传教练风采" key="2" forceRender>
                <coach-add></coach-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import coachItem from './coachItem'
import coachAdd from './coachAdd'
export default {
  components: {
    coachItem,
    coachAdd
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

