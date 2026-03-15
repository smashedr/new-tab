<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getOptions } from '@/utils/options.ts'
import GitHubRepos from '@/components/GitHubRepos.vue'
import SearchBox from '@/components/SearchBox.vue'
import ToastAlerts from '@/components/ToastAlerts.vue'
import TopSites from '@/components/topSites.vue'

const githubSearch = ref<InstanceType<typeof GitHubRepos> | null>(null)
const expandedRows = ref(10)

function handleKeyboard(e: KeyboardEvent) {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.repeat) return

  const target = e.target as HTMLInputElement
  if (['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'].includes(target?.tagName)) return
  if (e.key.length !== 1 && e.key !== 'Backspace') return

  console.log(`handleKeyboard: ${e.code} "${e.key}" - ${e.key.length}`)
  githubSearch.value?.focusSearch(e.key)
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyboard)
  const options = await getOptions()
  console.log('expandedRows:', options.expandedRows)
  expandedRows.value = options.expandedRows
  // if (options.bgImage) document.body.style.background = `url('${options.bgImage}') no-repeat center fixed`
  // use browser cache
  if (options.bgImage) {
    await new Promise((resolve) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = resolve
      img.src = options.bgImage
    })
    document.body.style.background = `url('${options.bgImage}') no-repeat center fixed`
  }
})

// useTitle('Page')
</script>

<template>
  <header class="flex-shrink-0">
    <SearchBox class="m-2" :expanded-rows="expandedRows" />

    <TopSites class="m-2" />
  </header>

  <main class="flex-grow-1 overflow-auto" style="min-height: 200px">
    <div class="container-fluid px-4 h-100">
      <div class="d-flex align-items-center justify-content-center w-100 h-100 pb-3">
        <div class="glass-outline blur rounded rounded-3 my-0 mx-auto w-100 h-100 d-flex flex-column">
          <div class="p-3 flex-grow-1 overflow-auto">
            <GitHubRepos ref="githubSearch" />
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="flex-shrink-0">
    <!--<hr class="my-0" />-->
    <!--<PageFooter class="m-2" />-->
  </footer>

  <ToastAlerts />
  <!--<BackToTop />-->
</template>

<!--<style scoped></style>-->
