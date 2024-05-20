'use strict'
window.kito = window.kito || {};
(window.kito.loader = {

  /**
     * Load Script
     * @param string src
     * @return Promise
     */
  loadScript: function (src) {
    return new Promise((resolve, reject) => {
      console.debug('KitoLoader', 'loadScript', src)
      const script = window.document.createElement('script')
      script.type = 'text/javascript'
      script.onload = resolve
      script.onerror = reject
      script.src = src
      window.document.head.append(script)
    })
  },

  /**
     * Load Style
     * @param string href
     * @return Promise
     */
  loadStyle: function (href) {
    return new Promise((resolve, reject) => {
      console.debug('KitoLoader', 'loadStyle', href)
      const link = window.document.createElement('link')
      link.rel = 'stylesheet'
      link.onload = resolve
      link.onerror = reject
      link.href = href
      window.document.head.append(link)
    })
  },

  /**
     * Load Html
     * @param string href
     * @return Promise
     */
  loadHtml: function (href) {
    console.debug('KitoLoader', 'loadHtml', href)
    return fetch(href).then((response) => response.text())
      .then((html) => {
        const span = window.document.createElement('span')
        span.innerHTML = html
        window.document.body.append(span)
      })
  },

  /**
     * Load Module
     * @param string href
     * @return Promise
     */
  loadModule: function (href) {
    return new Promise((resolve, reject) => {
      console.debug('KitoLoader', 'loadModule', href)
      kito.loader.loadHtml(href + '/index.html').finally(function () {
        kito.loader.loadStyle(href + '/index.css')
        kito.loader.loadScript(href + '/index.js').finally(resolve)
      })
    })
  }
})
