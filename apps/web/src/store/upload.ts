import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUploadStore = defineStore('upload', () => {
  const isOpenDialog = ref(false)

  const onChange = (e: boolean) => {
    isOpenDialog.value = e
  }

  return { onChange, isOpenDialog }
})
