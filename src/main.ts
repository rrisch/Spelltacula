import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {createPinia} from "pinia";

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faAnglesLeft,
    faAnglesRight,
    faCalculator,
    faCheck,
    faExclamation,
    faGreaterThan,
    faInfo,
    faLessThan,
    faListCheck,
    faPencil,
    faPlay,
    faPlus,
    faQuestion,
    faSave,
    faSpellCheck,
    faTrash,
    faWarning,
    faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faSave, faPlay, faPencil, faXmark, faLessThan, faGreaterThan, faAnglesLeft, faAnglesRight, faSpellCheck, faCalculator, faListCheck, faCheck, faPlus, faWarning, faQuestion, faInfo, faExclamation);
const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')

export default app;