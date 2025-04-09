import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faAnglesLeft,
    faAnglesRight,
    faGreaterThan,
    faLessThan,
    faPencil,
    faPlay,
    faSave,
    faTrash,
    faXmark,
    faSpellCheck,
    faCalculator,
    faListCheck,
    faCheck,
    faPlus,
    faWarning,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faSave, faPlay, faPencil, faXmark, faLessThan, faGreaterThan, faAnglesLeft, faAnglesRight, faSpellCheck, faCalculator, faListCheck, faCheck, faPlus,faWarning,faQuestion);
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

export default app;