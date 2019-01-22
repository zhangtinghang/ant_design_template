<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="地点列表" key="1">
                <site-item></site-item>
            </a-tab-pane>
            <a-tab-pane tab="新建地点" key="2" forceRender>
                <site-add></site-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import siteItem from './siteItem'
import siteAdd from './siteAdd'
export default {
  data () {
    return {
        
    }
  },
  components: {
    siteItem,
    siteAdd
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

