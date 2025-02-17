import { defineStore } from 'pinia'
import type { Metadata } from '@/models/metadataTypes'
import { getMetadata } from '@/api/metadataApi'
import { ref, type Ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  const metaData: Ref<Metadata> = ref({
    task_status: [],
  })

  const alert = ref('')

  const fetchMetaData = async () => {
    metaData.value = await getMetadata()
  }

  return {
    alert,
    metaData,
    fetchMetaData,
  }
})
