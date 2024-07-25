import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {
  // state
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: true, // true | false | 'auto #TODO: set back to false
  })

  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value)
    },
    { immediate: true }
  )

  // return
  return {
    // state
    settings,
  }
})
