<template>
  <v-app class="pb-0">
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

  const mainStore = useMainStore()
  const { alert } = storeToRefs(mainStore)
  mainStore.fetchMetaData()
</script>

<style lang="css">
  #app {
    padding-bottom: 0 !important;
  }
</style>
