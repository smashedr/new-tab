import { Octokit } from 'octokit'
import type { Options } from '@/utils/options.ts'

interface Repository {
  owner: string
  name: string
  url: string
}

export function getRepo(fullUrl?: string) {
  // console.log('getRepo:', fullUrl)
  if (!fullUrl) return null
  try {
    const url = new URL(fullUrl)
    const parts = url.pathname.split('/')
    if (parts.length < 3 || !parts[1] || !parts[2]) return null
    return {
      owner: parts[1],
      name: parts[2],
      url: `${url.origin}/${parts[1]}/${parts[2]}`,
    } as Repository
  } catch (e) {
    console.debug('error:', e)
    return null
  }
}

export async function getIssues(options: Options) {
  console.log('%c getIssues:', 'color: SpringGreen', options.githubToken.slice(0, 10))
  const url = new URL(options.githubUrl || 'https://github.com')
  const octokit = new Octokit({
    auth: options.githubToken,
    ...(url.origin !== 'https://github.com' && { baseUrl: `${url.origin}/api/v3` }),
  })
  const params: Parameters<typeof octokit.rest.search.issuesAndPullRequests>[0] = {
    q: options.githubSearch,
    per_page: options.githubPerPage || 30,
  }
  // console.log('params:', params)
  const { data, headers } = await octokit.rest.search.issuesAndPullRequests(params)
  console.log('headers:', headers)
  console.log('data.items?.length:', data.items?.length)
  return data.items
}

export async function updateIssues(options: Options) {
  if (!options.githubToken) return console.log('%cMissing githubToken', 'color: Grey')

  const storage = await chrome.storage.local.get(['issuesUpdated'])
  const issuesUpdated = storage.issuesUpdated as number | undefined
  console.log('issuesUpdated:', issuesUpdated)

  if (
    !issuesUpdated ||
    Math.floor((Date.now() - issuesUpdated) / 60000) >= options.githubCooldown
  ) {
    console.log('%c updateIssues - Updating Issues...', 'color: Yellow')
    const results = await getIssues(options)
    console.log('results:', results)
    chrome.storage.local
      .set({ issues: results, issuesUpdated: Date.now() })
      .catch(console.warn)
    // NOTE: return value is NOT used...
    return results
  } else {
    console.log('%c updateIssues - NO Update Needed!', 'color: SpringGreen')
  }
}
