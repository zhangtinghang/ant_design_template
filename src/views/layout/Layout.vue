<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar></Sidebar>
    <a-layout>
      <Navbar></Navbar>
      <App-Main></App-Main>
    </a-layout>
  </a-layout>
</template>
<script>
import { Navbar, Sidebar, AppMain } from './component'
export default {
  data(){
    return {
      collapsed: false,
    }
  },
  components:{
    Sidebar,
    AppMain,
    Navbar
  }
}
</script>
<style lang="scss" scoped>
#components-layout-demo-custom-trigger{
  height: 100%;
}
</style>
