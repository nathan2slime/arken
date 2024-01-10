<template>
  <div class="wrapper">
    <Button @click="() => uploadStore.onChange(true)">
      <v-icon name="md-add-round" />
      New Table
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/button/index.vue'

import { useUploadStore } from '@/store/upload';

const uploadStore = useUploadStore()
</script>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
