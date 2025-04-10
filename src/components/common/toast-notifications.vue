<script setup lang="ts">

import {ref} from "vue";
import {useAlertStore} from "../../globalStore/alertStore.ts";
import {alertType} from "../../constants/alert-type.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const _alertStore = ref(useAlertStore());

function getAlertClass(typeAlert: alertType): string {
  let alertClass = '';
  switch (typeAlert) {
    case alertType.Success:
      alertClass = 'alert-success';
      break;
    case alertType.Information:
      alertClass = 'alert-info';
      break;
    case alertType.Error:
      alertClass = 'alert-error';
      break;
    default:
      alertClass = 'alert-info'
      break;
  }
  return alertClass;
}
</script>

<template>
  <div class="toast toast-top toast-end">
    <div class="alert custom-alert" :class="getAlertClass(alert.alertType)" v-for="alert in _alertStore.alerts">
      <div class="grid grid-flow-col grid-rows-3 gap-2 pb-0">
        <div class="row-span-3">
          <font-awesome-icon size="xl" :icon="['fas',`${alert.icon}`]"></font-awesome-icon>
        </div>
        <div class="col-span-2 font-bold">{{ alert.title }}</div>
        <div class="col-span-2 row-span-2">{{ alert.details }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-alert {
  z-index: 10000;
}
</style>