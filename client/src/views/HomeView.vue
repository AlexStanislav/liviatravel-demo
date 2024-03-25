<template>
  <div class="home">
    <HomeTop />
    <HomeOffers />
  </div>
</template>
<script setup>
import HomeOffers from "../components/HomeOffers.vue";
import HomeTop from "../components/HomeTop.vue";

</script>
<style lang="scss">
.home {
  display: flex;
  flex-flow: column;
}
.filler {
  width: 100%;
  height: 100vh;
}

</style>