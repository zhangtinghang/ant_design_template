<template>
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo">
        <img :src="logo" width="15px">
        <span v-if="!collapsed" class="logo-title">莱特体育后台管理系统</span>
      </div>
      <!-- <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']"> -->
        <i-menu :collapsed="collapsed" :menuData="menuData" @select="onSelect"/>
      <!-- </a-menu> -->
    </a-layout-sider>
</template>
<script>
import IMenu from './menu'
import store from '@/store'
import logo from '@/assets/logo.png'
export default {
  data(){
    return {
      menuData: store.getters.permission_routers,
      logo
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
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo-title{
  color: #fff;
  font-size: 13px;
  margin-left: 10px;
}
</style>



