// Tells whether the code runs in a browser.
export default !!(typeof window !== 'undefined' && window.document && window.document.createElement)
