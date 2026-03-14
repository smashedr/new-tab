<script setup lang="ts">
import { onMounted } from 'vue'
import { saveOptions, updateOptions } from '@/utils/options.ts'
import { Tooltip } from 'bootstrap'
import { isMobile } from '@/utils/system.ts'
// import OptionTable from '@/components/OptionTable.vue'

const props = withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

chrome.storage.onChanged.addListener(onChanged)

function onChanged(changes: object, namespace: string) {
  for (const [key, _] of Object.entries(changes)) {
    console.debug('onChanged:', namespace, key)
    if (namespace === 'sync' && key === 'options') {
      updateOptions()
    }
  }
}

onMounted(() => {
  updateOptions()
  // NOTE: Find a better way to enable tooltips...
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new Tooltip(el))
})
</script>

<template>
  <form>
    <div v-if="!props.compact" class="row mb-2">
      <div class="col-12 col-sm-6 mb-2">
        <label for="maxResults" class="form-label"><i class="fa-solid fa-hashtag me-1"></i> Max History</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Maximum Items Processed."></i>
        <input
          id="maxResults"
          aria-describedby="maxResultsHelp"
          type="number"
          step="500"
          min="0"
          class="form-control"
          autocomplete="off"
          placeholder="# of Items"
          @change="saveOptions"
        />
        <div class="form-text" id="maxResultsHelp">Maximum Items Processed.</div>
      </div>

      <div class="col-12 col-sm-6 mb-2">
        <label for="expandedRows" class="form-label"><i class="fa-solid fa-border-top-left"></i> Expanded Rows</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="Search Box Expanded Rows."></i>
        <input
          id="expandedRows"
          aria-describedby="expandedRowsHelp"
          type="number"
          step="1"
          min="2"
          class="form-control"
          autocomplete="off"
          placeholder="# of Rows"
          @change="saveOptions"
        />
        <div class="form-text" id="expandedRowsHelp">Search Box Expanded Rows.</div>
      </div>

      <div class="col-12 mb-2">
        <label for="bgImage" class="form-label"><i class="fa-regular fa-image me-1"></i> Background Image URL</label>
        <i class="fa-solid fa-circle-info p-1" data-bs-toggle="tooltip" data-bs-title="URL to Background Image."></i>
        <input
          id="bgImage"
          aria-describedby="bgImageHelp"
          type="text"
          class="form-control"
          autocomplete="off"
          @change="saveOptions"
        />
        <div class="form-text" id="bgImageHelp">New Tab Background Image (blank for none).</div>
      </div>
    </div>

    <div v-if="!isMobile" class="form-check form-switch">
      <input class="form-check-input" id="contextMenu" type="checkbox" role="switch" @change="saveOptions" />
      <label class="form-check-label" for="contextMenu">Enable Right Click Menu</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Context Menu on Right Click."
      ></i>
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input" id="showUpdate" type="checkbox" role="switch" @change="saveOptions" />
      <label class="form-check-label" for="showUpdate">Show Release Notes on Update</label>
      <i
        class="fa-solid fa-circle-info p-1"
        data-bs-toggle="tooltip"
        data-bs-title="Show Release Notes on Version Update."
      ></i>
    </div>

    <div>
      <!--<OptionTable />-->
    </div>
  </form>
</template>

<!--<style scoped></style>-->
