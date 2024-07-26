<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        placeholder="Name"
        :bg-color="useLightOrDark('white', 'black')"
        outlined
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        placeholder="Amount"
        input-class="text-right"
        :bg-color="useLightOrDark('white', 'black')"
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
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStoreEntries } from 'src/stores/storeEntries'
import { useLightOrDark } from 'src/use/useLightOrDark'

const storeEntries = useStoreEntries()
const nameRef = ref(null)

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const addEntryForm = reactive({
  ...addEntryFormDefault,
})

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm)
  addEntryFormReset()
}
</script>
