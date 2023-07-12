// Inside background script

// onMessage('save', ({ data }) => {
//   console.log('data', data)
//   return { data: 'hello' }
// })

try {
} catch (error) {
    console.error(error)
}

chrome.runtime.onInstalled.addListener(async () => {
    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.
    //   let url = chrome.runtime.getURL('onInstalled.html')
    // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
    //
    // Many of the extension platform's APIs are asynchronous and can either take a callback argument
    // or return a promise. Since we're inside an async function, we can await the resolution of the
    // promise returned by the tabs.create call. See the following link for more info on async/await.
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    //   let tab = await chrome.tabs.create({ url })
    // Finally, let's log the ID of the newly created tab using a template literal.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //
    // To view this log message, open chrome://extensions, find "Hello, World!", and click the
    // "service worker" link in the card to open DevTools.
    //   console.log(`Created tab ${tab.id}`)
})

chrome.action.setBadgeText({ text: 'ON' })
// Called when the user clicks on the browser action
chrome.action.onClicked.addListener(function (tab) {
    //   console.log('tab :>> ', tab)
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0]
        // console.log('activeTab :>> ', activeTab)
        chrome.tabs.sendMessage(activeTab.id!, { message: 'clicked_browser_action' })
    })
})

// when message is received, reply with hi

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('Message Received', message, sender)
//   sendResponse({ message: 'hi' })
// })

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log('Hot Reload')
//   chrome.runtime.reload()
// })

export {}
