import type { LoginData, SignupData, User } from '@/models/userTypes'
import apiClient from './api'

export const signUp = async (signupData: SignupData): Promise<User> => {
  const response = await apiClient.post('signup', { user: signupData })
  const token = response.headers.authorization
  localStorage.setItem('jwt_token', token)
  return response.data
}

export const login = async (loginData: LoginData): Promise<User> => {
  const response = await apiClient.post('login', { user: loginData })
  const token = response.headers.authorization
  localStorage.setItem('jwt_token', token)
  return response.data
}

export const logout = async () => {
  await apiClient.delete('logout')
  localStorage.removeItem('jwt_token')
}
