<template>
  <v-form @submit.prevent="$emit('submit')" id="signup-form">
    <v-text-field v-model="email" :rules="rules" label="Email" type="email" :disabled="isLoading" />
    <v-text-field
      v-model="password"
      :rules="rules"
      label="Password"
      type="password"
      :disabled="isLoading"
    />
    <v-text-field
      v-if="!loginView"
      v-model="confirmationPassword"
      :rules="confirmationPasswordRules"
      label="Confirmation password"
      type="password"
      :disabled="isLoading"
    />
    <v-btn class="mt-2 pa-2" color="green" type="submit" :loading="isLoading" block> Submit </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const email = defineModel('email')
  const password = defineModel('password')
  const confirmationPassword = ref('')

  const { isLoading, loginView = false } = defineProps<{
    isLoading: boolean
    loginView?: boolean
  }>()

  defineEmits<{
    (e: 'submit'): void
  }>()

  const rules = [
    (value: string) => {
      if (value) return true

      return 'You must enter a value'
    },
  ]

  const confirmationPasswordRules = [
    ...rules,
    (value: string) => {
      if (value === password.value) return true

      return 'You need identical password'
    },
  ]
</script>

<style scoped></style>
