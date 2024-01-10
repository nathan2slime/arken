import { api } from '../api'

export const addSignaturesService = async (file: File) => {
  const formData = new FormData()
  formData.set('file', file)

  const { data, status } = await api.post('/signatures', formData)

  if (status == 201) return data
}

export const getStatsService = async () => {
  const { data, status } = await api.get('/stats')

  if (status == 200) return data
}
