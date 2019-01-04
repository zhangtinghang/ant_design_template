<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="地点列表" key="1">
                <list-item></list-item>
            </a-tab-pane>
            <a-tab-pane tab="新建地点" key="2" forceRender>
                <list-add></list-add>
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
        
    }
  },
  components: {
    listItem,
    listAdd
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

