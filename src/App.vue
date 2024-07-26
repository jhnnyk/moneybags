<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreSettings } from './stores/storeSettings'
import { useStoreEntries } from './stores/storeEntries'

defineOptions({
  name: 'App',
})

const storeSettings = useStoreSettings()
const storeEntries = useStoreEntries()

onMounted(() => {
  storeSettings.loadSettings()
  storeEntries.loadEntries()
})
</script>
