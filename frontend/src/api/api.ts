import axios from 'axios'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import router from '@/router'

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

    if (
      error.response?.data?.error === 'Token has expired' ||
      error.response?.data?.error === 'Invalid token' ||
      error.response.status === 401
    ) {
      localStorage.removeItem('jwt_token')
      router.push('login')
    } else {
      alert.value = 'API call failed'
      resetAlert(alert)
      console.error('API Error:', error)
    }

    return Promise.reject(error)
  },
)

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient
