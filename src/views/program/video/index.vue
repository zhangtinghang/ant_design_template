<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="视频管理" key="1">
                <video-item></video-item>
            </a-tab-pane>
            <a-tab-pane tab="上传视频资源" key="2" forceRender>
                <video-add></video-add>
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
        
    }
  },
  components: {
    videoItem,
    videoAdd
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

