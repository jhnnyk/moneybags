import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { LocalStorage, Notify, uid } from 'quasar'

export const useStoreEntries = defineStore('entries', () => {
  // state
  const entries = ref([
    // {
    //   id: 'id1',
    //   name: 'Salary',
    //   amount: 4999.99,
    //   paid: true,
    // },
    // {
    //   id: 'id2',
    //   name: 'Rent',
    //   amount: -999,
    //   paid: false,
    // },
    // {
    //   id: 'id3',
    //   name: 'Phone bill',
    //   amount: -14.99,
    //   paid: false,
    // },
    // {
    //   id: 'id4',
    //   name: 'Unknown',
    //   amount: 0,
    //   paid: false,
    // },
  ])

  watch(entries.value, () => {
    saveEntries()
  })

  const options = reactive({
    sort: false,
  })

  // getters
  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((accumulator, { amount, paid }) => {
      return paid ? accumulator + amount : accumulator
    }, 0)
  })

  const runningBalances = computed(() => {
    let runningBals = []
    let currentRunningBalance = 0

    if (entries.value.length) {
      entries.value.forEach((entry) => {
        let entryAmount = entry.amount ? entry.amount : 0
        currentRunningBalance = currentRunningBalance + entryAmount
        runningBals.push(currentRunningBalance)
      })
    }

    return runningBals
  })

  // actions
  const addEntry = (addEntryForm) => {
    const newEntry = Object.assign({}, addEntryForm, { id: uid(), paid: false })
    entries.value.push(newEntry)
  }

  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Entry deleted',
      position: 'top',
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  const sortEnd = ({ oldIndex, newIndex }) => {
    const movedEntry = entries.value[oldIndex]
    entries.value.splice(oldIndex, 1)
    entries.value.splice(newIndex, 0, movedEntry)
  }

  const saveEntries = () => {
    LocalStorage.set('entries', entries.value)
  }

  const loadEntries = () => {
    const savedEntries = LocalStorage.getItem('entries')
    if (savedEntries) {
      Object.assign(entries.value, savedEntries)
    }
  }

  // helpers
  const getEntryIndexById = (entryId) => {
    return entries.value.findIndex((entry) => entry.id === entryId)
  }

  // return
  return {
    // state
    entries,
    options,

    // getters
    balance,
    balancePaid,
    runningBalances,

    // actions
    addEntry,
    deleteEntry,
    updateEntry,
    sortEnd,
    loadEntries,
  }
})
