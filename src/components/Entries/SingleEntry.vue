<template>
  <q-slide-item
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold"
      >
        {{ entry.name }}
        <q-popup-edit
          :model-value="entry.name"
          v-slot="scope"
          :cover="false"
          :offset="[16, 12]"
          anchor="top left"
          label-set="Ok"
          auto-save
          buttons
        >
          <q-input
            v-model="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        :class="useAmountColorClass(entry.amount)"
        class="text-weight-bold"
        side
      >
        {{ useCurrencify(entry.amount) }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'

const storeEntries = useStoreEntries()
const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
})
const $q = useQuasar()

const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${useAmountColorClass(
        props.entry.amount
      )}">
        ${props.entry.name} : ${useCurrencify(props.entry.amount)}
      </div>
    `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true,
    },
    cancel: {
      color: 'primary',
      noCaps: true,
    },
  })
    .onOk(() => {
      storeEntries.deleteEntry(props.entry.id)
    })
    .onCancel(() => {
      reset()
    })
}
</script>
