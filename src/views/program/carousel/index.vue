<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="轮播图管理" key="1">
                <carousel-item></carousel-item>
            </a-tab-pane>
            <a-tab-pane tab="上传轮播图" key="2" forceRender>
                <carousel-add></carousel-add>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>

import carouselItem from './carouselItem'
import carouselAdd from './carouselAdd'
export default {
  data () {
    return {
        
    }
  },
  components: {
    carouselAdd,
    carouselItem
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

