declare namespace chrome {
  namespace sidebarAction {
    function open(): void
  }
}

// declare namespace chrome.topSites {
//   interface MostVisitedURL {
//     favicon?: string
//   }
// }

declare namespace chrome.topSites {
  interface MostVisitedURL {
    favicon?: string
  }
}

declare namespace browser.topSites {
  type MostVisitedURL = chrome.topSites.MostVisitedURL
}
