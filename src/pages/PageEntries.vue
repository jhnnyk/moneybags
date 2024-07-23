<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere v-if="!storeEntries.entries.length" />

      <q-list v-else bordered separator>
        <Sortable
          @end="storeEntries.sortEnd"
          :list="storeEntries.entries"
          :options="{ handle: '.handle' }"
          item-key="id"
          tag="div"
        >
          <template #item="{ element, index }">
            <SingleEntry :key="element.id" :entry="element" />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <!-- Display Balance -->
      <BalanceBar />

      <!-- Add Entry Form -->
      <AddEntry />
    </q-footer>
  </q-page>
</template>

<script setup>
import { Sortable } from 'sortablejs-vue3'
import SingleEntry from 'src/components/Entries/SingleEntry.vue'
import NothingHere from 'src/components/Entries/NothingHere.vue'
import BalanceBar from 'src/components/Entries/BalanceBar.vue'
import AddEntry from 'src/components/Entries/AddEntry.vue'
import { useStoreEntries } from 'src/stores/storeEntries'

const storeEntries = useStoreEntries()
</script>
