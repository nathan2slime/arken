<template>
  <div
    ref="shadow"
    @click="e => onClose(e)"
    :class="{ open, shadow: true }"
  >
    <div>
        <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  open: Boolean,
})
const emit = defineEmits(['close'])

const shadow = ref(null)

const onClose = (e: MouseEvent) => {
  if (e.target == shadow.value) emit('close', false)
}
</script>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
