<template>
  <div class="upload-table">
    <h2>New spreadsheet</h2>

    <label for="upload-table">{{
      currentFile ? currentFile.name : 'Click to upload'
    }}</label>

    <input
      name="upload-table"
      @change="e => onUpload(e)"
      id="upload-table"
      type="file"
    />

    <Button :disabled="!isValid" @click="onSend" class="send-button">
      Send
      <v-icon name="io-send-sharp" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { ref, onUnmounted } from 'vue'

import Button from '@/components/button/index.vue'

const emit = defineEmits(['upload'])

const isValid = ref(false)
const currentFile = ref()

const accepted = [
  'application/vnd.oasis.opendocument.spreadsheet',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

const onUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 1) return

  const file = files![0]

  if (accepted.includes(file.type)) {
    isValid.value = true
    currentFile.value = file
  } else {
    target.value = ''
    toast('Upload a .xlsx, .ods, and .csv file', { type: 'error' })
  }
}

const onSend = () => isValid && emit('upload', currentFile.value)

onUnmounted(() => (currentFile.value = undefined))
</script>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
