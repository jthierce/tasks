<template>
  <v-alert v-if="errorMessage" :text="errorMessage" type="error" class="mb-1" />
  <v-card class="mx-auto pa-4" width="300" title="Login">
    <BaseAuthentificationForm
      class="justify-center"
      v-model:email="email"
      v-model:password="password"
      :isLoading="isLoading"
      :loginView="true"
      @submit="submit"
    />
  </v-card>
  <div
    class="text-center text-caption cursor-pointer mx-auto px-auto"
    @click="router.push('/signup')"
  >
    Signup
  </div>
</template>

<script setup lang="ts">
  import BaseAuthentificationForm from '@/components/BaseAuthentificationForm.vue'
  import { useUserStore } from '@/stores/userStore'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const userStore = useUserStore()
  const { loginUser } = userStore

  const password = ref('')
  const email = ref('')
  const isLoading = ref(false)
  const errorMessage = ref('')

  const submit = async () => {
    errorMessage.value = ''
    isLoading.value = true
    await loginUser({
      email: email.value,
      password: password.value,
    })
      .then((data) => {
        router.push('/')
      })
      .catch((error) => {
        errorMessage.value = 'An error has occurred'
      })
    isLoading.value = false
  }
</script>
