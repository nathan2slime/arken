<template>
  <button :class="{ disabled }">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: Boolean,
})
</script>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
