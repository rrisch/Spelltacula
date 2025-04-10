import {defineStore} from "pinia";
import type {iAlert} from "../interfaces/ialert.ts";
import {ref} from "vue";

export const useAlertStore = defineStore('alerts', () => {
    const alerts = ref<iAlert[]>([]);
    const refreshCount = ref<number>(0);

    function addAlert(alert: iAlert): void {
        if (!alert) return;
        alerts.value.push(alert);
        refreshCount.value++;

        //remove it at their time designation
        setTimeout(() => {
            alerts.value.splice(alerts.value.indexOf(alert), 1);
            refreshCount.value++;
        }, (alert.duration * 1000))
    }

    return {alerts, refreshCount, addAlert}
})