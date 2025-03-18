
<script setup lang="ts">
// TypeScript enabled
import  featureCardModel from "../models/feature.ts";
import FeatureCard from "../components/feature-card.vue";

const features: featureCardModel[] =[
    new featureCardModel("Create Spelling Test","Create new spelling tests to practice your spelling words","","Create Tests"),
  new featureCardModel("Create Spelling Test","Create new spelling tests to practice your spelling words","","Create Tests"),
];
</script>


<template>

  <div class="container mx-auto px-4">

    <div class="grid grid-cols-2 gap-4 justify-items-center px-4">
    <feature-card v-for="feature in features" :feature="feature"></feature-card>
    </div>
  </div>

</template>

<style scoped>

</style>