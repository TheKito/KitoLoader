"use strict";
window.kito = window.kito || {};
window.kito.location = (function () {

    const keyNameEnabled = 'KitoLocationOK';

    const locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    var location = null;
    var watchPositionId = null;

    function getPositionSuccess(position) {
        setEnabledFlag();

        const coords = position.coords;

        location = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            updated: Math.floor((new Date()).getTime() / 1000)
        }

        console.log(location);
    }

    function getPositionError(error) {
        console.warn(error);
    }

    function initLocation() {
        if (watchPositionId === null) {
            if ('geolocation' in navigator) {
                watchPositionId = navigator.geolocation.watchPosition(getPositionSuccess, getPositionError, locationOptions);
            }
            else {
                console.log("Geo Location not supported by browser");
            }
        }
        return this;
    }


    async function getEnabled() {
        if (location !== null)
            return true;

        if ('permissions' in navigator) {

            const result = await navigator.permissions.query({ name: 'geolocation' });

            if (result.state == 'granted') {
                return true;
            }
        }

        if (getEnabledFlag()) {
            return true;
        }

        return false;
    }

    function getEnabledFlag() {
        if ('localStorage' in window) {
            return window.localStorage.getItem(keyNameEnabled) === true;
        }
    }

    function setEnabledFlag() {
        if ('localStorage' in window) {
            if (getEnabledFlag())
                return;

            window.localStorage.setItem(keyNameEnabled, true);
        }
    }

    (async function () {
        if (await getEnabled()) {
            initLocation();
        }
    })();

    return {// public interface
        isEnabled: function () {
            return getEnabled();
        },
        initLocation: function () {
            initLocation();
            return this;
        },
        getLocation: function () {
            return location;
        }
    };
})();

