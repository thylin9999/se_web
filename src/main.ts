import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style/base.css"
import App from './App.vue'
import router from './router'
import { Swipe, SwipeItem,Icon } from 'vant';
import 'vant/lib/index.css';
const app = createApp(App)
app.use(Swipe);
app.use(SwipeItem);
app.use(Icon);
app.use(createPinia())
app.use(router)

app.mount('#app')
