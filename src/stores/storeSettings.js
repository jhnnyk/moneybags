import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStoreSettings = defineStore('settings', () => {
  // state
  const settings = reactive({
    promptToDelete: true,
  })

  // return
  return {
    // state
    settings,
  }
})
