// noinspection TypeScriptUMDGlobal

export default defineContentScript({
  matches: ['https://claude.ai/*'],
  main(ctx) {
    console.log('new-tab - %c Loaded: content/index.ts', 'color: Lime', ctx)

    async function processClaude() {
      const result = await chrome.storage.local.get('claudePrompt')
      const claudePrompt = result['claudePrompt'] as string | undefined
      console.log('new-tab - claudePrompt:', claudePrompt)
      if (!claudePrompt) return
      chrome.storage.local.remove('claudePrompt').catch(console.warn)

      const editor = document.querySelector('.tiptap')
      if (!editor) return console.log('new-tab - %c missing editor', 'color: OrangeRed')

      console.log('new-tab - %c processClaude START', 'color: Yellow')

      const escape = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

      editor.innerHTML = claudePrompt
        .split('\n')
        .map((line) => (line.trim() === '' ? '<p><br></p>' : `<p>${escape(line)}</p>`))
        .join('')

      await new Promise((resolve) => requestAnimationFrame(resolve))
      editor.dispatchEvent(new InputEvent('input', { bubbles: true }))
      await new Promise((resolve) => requestAnimationFrame(resolve))
      editor.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
      console.log('new-tab - %c processClaude DONE', 'color: Lime')
    }

    if (document.querySelector('.tiptap')) {
      console.log('new-tab - %c Run on First querySelector', 'color: SpringGreen')
      processClaude().catch(console.warn)
      return
    }

    const observer = new MutationObserver((_records, observer) => {
      if (document.querySelector('.tiptap')) {
        console.log('new-tab - %c Run on MutationObserver', 'color: Yellow')
        observer.disconnect()
        processClaude().catch(console.warn)
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  },
})
