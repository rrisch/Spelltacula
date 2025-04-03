<script setup lang="ts">
import  featureCardModel from '../models/feature.ts'
import router from "../router";

//vue consts
const props = defineProps({
  feature: { type: featureCardModel, required: true }
});

//component functions
 function onActionClick():void {
   if (!props.feature.route) return;
   router.push(props.feature.route)
 }
</script>

<template>
  <div class="card bg-base-100 w-96 shadow-sm px-4">
    <figure>

    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ feature.title }}</h2>
      <p>{{feature.description}}</p>
      <div class="card-actions justify-end">
        <button @click="onActionClick" class="btn btn-primary">{{feature.actionText}}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>