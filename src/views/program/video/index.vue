<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="视频管理" key="true">
                <video-item :updateData="update"></video-item>
            </a-tab-pane>
            <a-tab-pane tab="上传视频资源" key="false" forceRender>
                <video-add :updateData="update"></video-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import videoItem from './videoItem'
import videoAdd from './videoAdd'
export default {
  data () {
    return {
        update: 'false'
    }
  },
  components: {
    videoItem,
    videoAdd
  },
  methods: {
    callback (key) {
      this.update = key
    },
  },
}
</script>

