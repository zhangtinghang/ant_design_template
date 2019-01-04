<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="教练风采管理" key="1">
                <student-item></student-item>
            </a-tab-pane>
            <a-tab-pane tab="上传教练风采" key="2" forceRender>
                <student-add></student-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import studentItem from './studentItem'
import studentAdd from './studentAdd'
export default {
  data () {
    return {
        
    }
  },
  components: {
    studentItem,
    studentAdd
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

