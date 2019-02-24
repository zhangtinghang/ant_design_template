<template>
  <div class="home-container">
    <img :src="homeBG" />
  </div>
</template>
<script>
import homeBG from '@/assets/home.png'
export default {
  data() {
    return {
      homeBG
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  width: 100%;
  margin: 0 auto;
  text-align: center;
  & > img {
    height: 100%;
  }
}
</style>