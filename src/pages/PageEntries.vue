<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered separator>
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section
            :class="useAmountColorClass(entry.amount)"
            class="text-weight-bold"
          >
            {{ entry.name }}
          </q-item-section>

          <q-item-section
            :class="useAmountColorClass(entry.amount)"
            class="text-weight-bold"
            side
          >
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <!-- Display Balance -->
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">Balance</div>
        <div
          class="col text-h6 text-right"
          :class="useAmountColorClass(balance)"
        >
          {{ useCurrencify(balance) }}
        </div>
      </div>

      <!-- Add Entry Form -->
      <q-form
        @submit="addEntry"
        class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
      >
        <div class="col">
          <q-input
            v-model="addEntryForm.name"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="addEntryForm.amount"
            placeholder="Amount"
            input-class="text-right"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" type="submit" />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
// imports
import { ref, computed, reactive } from 'vue'
import { uid } from 'quasar'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

// entries
const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.99,
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999,
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99,
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0,
  },
])

// balance
const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + amount
  }, 0)
})

// add entry
const addEntryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...addEntryFormDefault,
})

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
}

const addEntry = () => {
  const newEntry = {
    id: uid(),
    name: addEntryForm.name,
    amount: addEntryForm.amount,
  }
  entries.value.push(newEntry)
  addEntryFormReset()
}
</script>
