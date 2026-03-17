export type Search = {
  id?: string
  url: string
  name: string
  icon: string
  style: string
}

const defaultSearchs: Search[] = [
  {
    id: crypto.randomUUID(),
    url: 'https://github.com/search?q=',
    name: 'GitHub',
    icon: 'github',
    style: 'light',
  },
  {
    id: crypto.randomUUID(),
    url: 'https://www.youtube.com/results?search_query=',
    name: 'YouTube',
    icon: 'youtube',
    style: 'danger',
  },
]

export async function getSearches(): Promise<Search[]> {
  const result = await chrome.storage.sync.get({ searches: defaultSearchs })
  return result.searches as Search[]
}

export async function setDefaultSearches(): Promise<void> {
  console.log('setDefaultSearches')
  const result = await chrome.storage.sync.get('searches')
  console.log('result:', result)
  if (result.searches === undefined) {
    console.log('%c Set Default Searches', 'color: Lime')
    await chrome.storage.sync.set({ searches: defaultSearchs })
  }
}

export async function addSearch(search: Omit<Search, 'id'>): Promise<void> {
  console.log('addSearch:', search)
  const searches = await getSearches()
  searches.push({ ...search, id: crypto.randomUUID() })
  await chrome.storage.sync.set({ searches })
}

export async function updateSearch(search: Search): Promise<void> {
  console.log('updateSearch:', search)
  const searches = await getSearches()
  const index = searches.findIndex((s) => s.id === search.id)
  console.log('index:', index)
  if (index === -1) return // or throw — id must exist to update
  searches[index] = search
  await chrome.storage.sync.set({ searches })
}

export async function deleteSearch(id?: string): Promise<void> {
  console.log('deleteSearch:', id)
  if (!id) return
  const searches = await getSearches()
  const filtered = searches.filter((s) => s.id !== id)
  await chrome.storage.sync.set({ searches: filtered })
}
