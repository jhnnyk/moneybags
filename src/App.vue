<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreSettings } from './stores/storeSettings'

defineOptions({
  name: 'App',
})

const storeSettings = useStoreSettings()

onMounted(() => {
  storeSettings.loadSettings()
})
</script>
