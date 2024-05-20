(function () {
  const initTime = new Date().getTime() / 1000
  window.setInterval(function () {
    const currentTime = new Date().getTime() / 1000
    if (currentTime - initTime > 1 * 24 * 60 * 60) {
      location.reload()
    }
  }, 10000)
}())
