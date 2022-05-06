(window.KitoLoader = {

    /**
     * Load Script
     * @param string src
     * @return Promise
     */
    loadScript: function (src) {
        return new Promise((resolve, reject) => {
            const script = window.document.createElement('script');
            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            script.src = src;
            window.document.head.append(script);
        });
    },

    /**
     * Load Style
     * @param string href
     * @return Promise
     */
    loadStyle: function (href) {
        return new Promise((resolve, reject) => {
            const link = window.document.createElement('link');
            link.rel = 'stylesheet';
            link.onload = resolve;
            link.onerror = reject;
            link.href = href;
            window.document.head.append(link);
        });
    },

    /**
     * Load Html
     * @param string href
     * @return Promise
     */
    loadHtml: function (href) {
        return fetch(href).then((response) => response.text())
            .then((html) => {
                const span = window.document.createElement('span');
                span.innerHTML = html;
                window.document.body.append(span);
            })
    }
});

