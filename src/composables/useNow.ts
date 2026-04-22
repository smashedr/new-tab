import { onUnmounted, ref } from 'vue'

export function useNow(ms = 1000) {
  const now = ref(Date.now())
  const timer = setInterval(() => (now.value = Date.now()), ms)
  onUnmounted(() => clearInterval(timer))
  return now
}
