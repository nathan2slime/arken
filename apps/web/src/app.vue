<script setup lang="ts">
import { RouterView } from 'vue-router'

import Menu from '@/components/menu/index.vue'

import 'vue3-toastify/dist/index.css'
</script>

<template>
  <div class="layout">
    <Menu />

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
