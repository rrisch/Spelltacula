
<script setup lang="ts">
// TypeScript enabled
import {features} from "../constants/current-features.ts"
import FeatureCard from "../components/feature-card.vue";



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