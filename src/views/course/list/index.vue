<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="报课订单" key="1">
                <card-item></card-item>
            </a-tab-pane>
            <a-tab-pane tab="历史订单" key="2" forceRender>
                <history-item></history-item>
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
    }
  },
  components: {
      cardItem,
      historyItem
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>

