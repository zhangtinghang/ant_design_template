<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="课程列表" key="true">
                <list-item :updateData="update"></list-item>
            </a-tab-pane>
            <a-tab-pane tab="新建课程" key="false" forceRender>
                <list-add :updateData="update"></list-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import listItem from './listItem'
import listAdd from './listAdd'
export default {
  data () {
    return {
        update: 'false'
    }
  },
  components: {
    listItem,
    listAdd
  },
  methods: {
    callback (key) {
      this.update = key
    },
  },
}
</script>

