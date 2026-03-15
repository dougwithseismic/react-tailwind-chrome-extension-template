export async function sendMessageToBackground(message: unknown): Promise<unknown> {
    try {
        return await chrome.runtime.sendMessage(message)
    } catch (error) {
        console.error('Error sending message to background:', error)
        return null
    }
}

export async function sendMessageToContentScript(message: unknown): Promise<unknown> {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        if (!tab?.id) {
            console.error('No active tab found.')
            return null
        }
        return await chrome.tabs.sendMessage(tab.id, message)
    } catch (error) {
        console.error('Error sending message to content script:', error)
        return null
    }
}
