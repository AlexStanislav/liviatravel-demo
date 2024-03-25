<template>
  <div class="home">
    <HomeTop />
    <HomeOffers />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import HomeOffers from "../components/HomeOffers.vue";
import HomeTop from "../components/HomeTop.vue";
import { useAppStore } from "../store/app";

const appStore = useAppStore();

onMounted(async () => {
  setTimeout(() => {
    if (appStore.offers.length > 0) {
      setTimeout(() => {
        appStore.togglePreloader(false);
      }, 1000);
    }
  }, 300);
});
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