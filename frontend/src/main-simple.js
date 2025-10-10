import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// create a pinia instance
let pinia = createPinia()

let app = createApp(App)

app.use(pinia)

app.mount('#app')
