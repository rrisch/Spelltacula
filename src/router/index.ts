import { createMemoryHistory, createRouter } from 'vue-router'
import {applicationRoutes} from "../constants/current-features.ts";

const routes=applicationRoutes.map( item => ({ path: item.url, component: item.component }));
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;