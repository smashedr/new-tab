<script setup lang="ts">
import { isMobile } from '@/utils/system.ts'
import { openExtPanel, openOptions, openPopup, openSidePanel } from '@/utils/extension.ts'
import OptionsForm from '@/components/OptionsForm.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
</script>

<template>
  <button
    id="toggle-button"
    class="btn btn-primary opacity-75"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#optionsOffcanvas"
    aria-controls="optionsOffcanvas"
  >
    <i class="fa-solid fa-gears"></i>
  </button>

  <div
    class="offcanvas offcanvas-end glass"
    tabindex="-1"
    id="optionsOffcanvas"
    aria-labelledby="optionsOffcanvasLabel"
  >
    <div class="offcanvas-header">
      <ThemeSwitch />
      <h5 class="offcanvas-title ms-2" id="optionsOffcanvasLabel">Options</h5>

      <!--NOTE: ms-3 added to close button to override ms-auto-->
      <div class="d-flex ms-auto">
        <div v-if="!isMobile" class="ms-1">
          <button
            :title="i18n.t('ui.action.extensionPanel')"
            class="btn btn-sm btn-outline-info"
            @click="openExtPanel()"
          >
            <i class="fa-regular fa-window-restore me-1"></i>
          </button>
        </div>
        <div v-if="!isMobile" class="ms-1">
          <button :title="i18n.t('ui.action.sidePanel')" class="btn btn-sm btn-outline-info" @click="openSidePanel()">
            <i class="fa-solid fa-table-columns"></i>
          </button>
        </div>
        <div v-if="!isMobile" class="ms-1">
          <button :title="i18n.t('ui.action.openPopup')" class="btn btn-sm btn-outline-info" @click="openPopup()">
            <i class="fa-solid fa-window-maximize"></i>
          </button>
        </div>
        <div class="ms-1">
          <a
            :title="i18n.t('ui.text.options')"
            href="/options.html"
            class="btn btn-sm btn-outline-info"
            @click.prevent="openOptions()"
          >
            <i class="fa-solid fa-gears"></i
          ></a>
        </div>
      </div>

      <button type="button" class="btn-close ms-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body uppy-drop-target">
      <OptionsForm />
    </div>
  </div>
</template>

<style scoped>
#toggle-button {
  position: fixed;
  bottom: 10px;
  right: -8px;
  z-index: 3;
  /*border-bottom-right-radius: 0;*/
  /*border-top-right-radius: 0;*/
}

#optionsOffcanvas {
  background-color: rgba(var(--bs-emphasis-bg-rgb), 50%);
  backdrop-filter: blur(12px);
}
</style>
