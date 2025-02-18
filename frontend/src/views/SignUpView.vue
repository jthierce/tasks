<template>
  <v-alert v-if="errorMessage" :text="errorMessage" type="error" class="mb-1" />
  <v-card class="mx-auto pa-4" width="300" title="Sign Up">
    <BaseAuthentificationForm
      class="justify-center"
      v-model:email="email"
      v-model:password="password"
      :isLoading="isLoading"
      @submit="submit"
    />
  </v-card>
  <div class="text-center text-caption cursor-pointer" @click="router.push('/login')">Login</div>
</template>

<script setup lang="ts">
  import BaseAuthentificationForm from '@/components/BaseAuthentificationForm.vue'
  import { useUserStore } from '@/stores/userStore'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const userStore = useUserStore()
  const { registerUser } = userStore

  const password = ref('')
  const email = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')

  const submit = async () => {
    errorMessage.value = ''
    isLoading.value = true
    await registerUser({
      email: email.value,
      password: password.value,
    })
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        errorMessage.value = 'An error has occurred'
      })
    isLoading.value = false
  }
</script>
