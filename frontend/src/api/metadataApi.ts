import apiClient from './api'
import type { Metadata } from '@/models/metadataTypes'

export const getMetadata = async (): Promise<Metadata> => (await apiClient.get('metadata')).data
