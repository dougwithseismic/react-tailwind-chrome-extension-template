import { browser } from 'webextension-polyfill-ts'

export const sendMessageToBackground = async (message: any): Promise<any> => {
    try {
        return await browser.runtime.sendMessage(message)
    } catch (error) {
        console.error(`Error sending message to background: ${error}`)
        return null
    }
}

export const sendMessageToContentScript = async (message: any): Promise<any> => {
    try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        if (!tabs[0]?.id) {
            console.error('No active tab found.')
            return null
        }
        return await browser.tabs.sendMessage(tabs[0].id, message)
    } catch (error) {
        console.error(`Error sending message to content script: ${error}`)
        return null
    }
}
