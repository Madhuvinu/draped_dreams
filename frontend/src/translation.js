export default {
  install(app) {
    app.config.globalProperties.$t = (key) => {
      // Simple translation function - can be enhanced later
      return key
    }
  }
}
