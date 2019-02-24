<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="轮播图管理" key="true">
                <carousel-item :updateData="update"></carousel-item>
            </a-tab-pane>
            <a-tab-pane tab="上传轮播图" key="false" forceRender>
                <carousel-add :updateData="update"></carousel-add>
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
        update: 'false'
    }
  },
  components: {
    carouselAdd,
    carouselItem
  },
  methods: {
    callback (key) {
      this.update = key
    },
  },
}
</script>

