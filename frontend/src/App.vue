<template>
  <v-app class="pb-0">
    <v-app-bar :elevation="2">
      <v-app-bar-title>Tasks</v-app-bar-title>

      <template v-slot:append>
        <v-btn @click="logoutUser()">Logout</v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-alert v-if="alert" position="sticky" type="error">{{ alert }}</v-alert>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import { useMainStore } from './stores/main'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from './stores/userStore'
  import router from './router'

  const userStore = useUserStore()

  const mainStore = useMainStore()
  const { alert } = storeToRefs(mainStore)
  mainStore.fetchMetaData()

  const logoutUser = () => {
    userStore.logoutUser().then(() => {
      router.push('/login')
    })
  }
</script>

<style lang="css">
  #app {
    padding-bottom: 0 !important;
  }
</style>
