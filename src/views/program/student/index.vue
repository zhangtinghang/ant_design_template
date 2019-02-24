<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="学员风采管理" key="true">
                <student-item :updateData="update"></student-item>
            </a-tab-pane>
            <a-tab-pane tab="上传学员风采"  key="false" forceRender>
                <student-add :updateData="update"></student-add>
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
        update: 'false'
    }
  },
  components: {
    studentItem,
    studentAdd
  },
  methods: {
    callback (key) {
      this.update = key
    },
  },
}
</script>

