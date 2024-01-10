<template>
  <main class="index">
    <div class="chart-graphic">
      <Line
        :data="{ labels, datasets: [churnRate] }"
        :width="300"
        :options="config"
      />
    </div>

    <div class="chart-graphic">
      <Line
        :data="{ labels, datasets: [mrr] }"
        :width="300"
        :options="config"
      />
    </div>

    <Dialog :open="uploadStore.isOpenDialog" @close="onToggleDialog">
      <Dropzone v-if="uploadStore.isOpenDialog" @upload="onUpload" />
    </Dialog>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'
import { toDate, format } from 'date-fns'
import { toast } from 'vue3-toastify'

import Dropzone from '@/components/dropzone/index.vue'
import Dialog from '@/components/dialog/index.vue'

import {
  getStatsService,
  addSignaturesService,
} from '../../services/signature.service'
import { useUploadStore } from '../../store/upload'

import type { DataStats, Stat } from './types'

const uploadStore = useUploadStore()

const labels = ref<string[]>([])
const churnRate = ref<DataStats>({
  label: 'Churn Rate (%)',
  data: [],
})
const mrr = ref<DataStats>({
  label: 'MRR (R$)',
  data: [],
})

const config = ref({
  responsive: true,
})

const onToggleDialog = (e: boolean) => uploadStore.onChange(e)

const onUpload = async (e: File) => {
  uploadStore.onChange(false)
  const toastId = toast.loading('Processing spreadsheet')

  const res = await addSignaturesService(e)

  if (res) {
    toast.update(toastId, {
      content: 'Success',
      isLoading: false,
      autoClose: true,
      type: 'success',
    })

    onLoadStats()
  } else {
    toast.update(toastId, {
      content: 'Something went wrong',
      isLoading: false,
      type: 'error',
      autoClose: true,
    })
  }

  setTimeout(() => {
    toast.clearAll()
  }, 1000)
}

const onLoadStats = async () => {
  const stats: Stat[] = await getStatsService()

  if (stats) {
    stats.map((e: Stat) => {
      const moth = format(toDate(e.moth), 'MM/yyyy')

      labels.value = [...labels.value, moth]
      churnRate.value.data = [...churnRate.value.data, e.churnRate]
      mrr.value.data = [...mrr.value.data, e.mrr]
    })
  }
}

onMounted(async () => {
  onLoadStats()
})
</script>

<style lang="scss" scoped>
@import url('./styles.scss');
</style>
