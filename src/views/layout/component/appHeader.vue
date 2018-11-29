<template>
    <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsedChange"
        />
    </a-layout-header>
</template>
<script>
export default {
    computed: {
        collapsed(){
            return this.$store.getters.sidebar
        }
    },
    methods: {
        collapsedChange(){
            this.$store.dispatch('toggleSideBar').then(() => {})
        }
    }
}
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
