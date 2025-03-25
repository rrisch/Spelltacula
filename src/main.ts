import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClipboard, faClock } from '@fortawesome/free-solid-svg-icons';

library.add(faClipboard, faClock);
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

export default app;