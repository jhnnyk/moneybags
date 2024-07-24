import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {
  // state
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: false, // true | false | 'auto
  })

  watch(
    () => settings.darkMode,
    (value) => {
      Dark.set(value)
    }
  )

  // return
  return {
    // state
    settings,
  }
})
