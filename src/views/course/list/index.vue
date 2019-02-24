<template>
    <div>
        <a-tabs defaultActiveKey="true" @change="callback">
            <a-tab-pane tab="报课订单" key="true">
                <card-item :updateData="update"></card-item>
            </a-tab-pane>
            <a-tab-pane tab="历史订单" key="false" forceRender>
                <history-item :updateData="update"></history-item>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
import cardItem from './card'
import historyItem from './history'
export default {
  data () {
    return {
        update: 'false'
    }
  },
  components: {
      cardItem,
      historyItem
  },
  methods: {
    callback (key) {
        this.update = key
    },
  },
}
</script>

