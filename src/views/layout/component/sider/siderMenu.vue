<template>
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo" />
      <!-- <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']"> -->
        <i-menu :collapsed="collapsed" :menuData="menuData" @select="onSelect"/>
      <!-- </a-menu> -->
    </a-layout-sider>
</template>
<script>
import IMenu from './menu'
import store from '@/store'
export default {
  data(){
    return {
      menuData: store.getters.permission_routers
    }
  },
  computed: {
    collapsed () {
      return store.getters.sidebar
    }
  },
  components:{
    IMenu
  },
  methods: {
    onSelect (obj) {
      // eslint-disable-next-line
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
    height: 30px;
    margin: 17px;
    background-color: #00294c;
}
</style>


