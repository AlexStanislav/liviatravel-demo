<template>
  <div class="offers-title">
    <div class="offers-title-bg"></div>
    <div class="offers-title-text">{{ text }}</div>
  </div>
</template>
<script setup>
const props = defineProps({
    text: {
        type: String,
        default: '',
    }
})
</script>
<style lang="scss">
</style>