<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="地点列表" key="true">
                <site-item :updateData="update"></site-item>
            </a-tab-pane>
            <a-tab-pane tab="新建地点" key="false" forceRender>
                <site-add :updateData="update"></site-add>
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
        update: 'false'
    }
  },
  components: {
    siteItem,
    siteAdd
  },
  methods: {
    callback (key) {
      this.update = key
    }
  }
}
</script>

