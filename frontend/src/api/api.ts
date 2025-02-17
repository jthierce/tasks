import axios from 'axios'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

const resetAlert = async (alert: Ref<string>) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  alert.value = ''
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const mainStore = useMainStore()
    const { alert } = storeToRefs(mainStore)

    console.error('API call failed:', error)
    alert.value = 'API call failed'
    resetAlert(alert)
    return Promise.reject(error)
  },
)

export default apiClient
