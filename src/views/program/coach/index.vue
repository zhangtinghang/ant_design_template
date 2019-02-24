<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="教练风采管理" key="true">
                <coach-item :updateData="update"></coach-item>
            </a-tab-pane>
            <a-tab-pane tab="上传教练风采" key="false" forceRender>
                <coach-add :updateData="update"></coach-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import coachItem from './coachItem'
import coachAdd from './coachAdd'
export default {
  data () {
    return {
        update: 'false'
    }
  },
  components: {
    coachItem,
    coachAdd
  },
  methods: {
    callback (key) {
      this.update = key
    },
  },
}
</script>

