import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginData, SignupData, User } from '@/models/userTypes'
import { login, signUp, logout } from '@/api/authentificationApi'

export const useUserStore = defineStore('user', () => {
  const me = ref<User>({
    email: '',
    id: 0,
  })

  const registerUser = async (userData: SignupData) => {
    me.value = await signUp(userData)
  }

  const loginUser = async (loginData: LoginData) => {
    me.value = await login(loginData)
  }

  const logoutUser = async () => {
    await logout()
  }

  return { me, registerUser, loginUser, logoutUser }
})
