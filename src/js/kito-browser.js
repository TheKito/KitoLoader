"use strict";
window.kito = window.kito || {};
window.kito.browser = (function () {

    function getUserAgent() {
        return (navigator.userAgent && window.navigator.userAgent.toLowerCase());
    }

    return {// public interface
        isIOS: function () {
            return (/iphone|ipad|ipod/.test(window.getUserAgent()));
        },
        isStandalone: function () {
            return (('standalone' in window.navigator) && (window.navigator.standalone)) || ((window.matchMedia('(display-mode: standalone)').matches));
        },
        isSafari: function () {
            return ('vendor' in navigator) && navigator.vendor.indexOf('Apple') > -1 && window.getUserAgent().indexOf('crios') == -1 && window.getUserAgent().indexOf('fxios') == -1;
        },
        isChrome: function () {
            return /chrome/.test(window.getUserAgent()) && /Google Inc/.test(navigator.vendor);
        },
        isFirefox: function () {
            return window.getUserAgent().indexOf('firefox') > -1;
        },
    };
})();

