<script setup lang="ts">
import { useTestStore } from '../stores/testStore.ts'
import {onMounted, ref} from "vue";
import type {iTest} from "../interfaces/itest.ts";

// access the `store` variable anywhere in the component ✨
const testStore = useTestStore()
const _currentTest = ref<iTest|undefined>(undefined);

//vue
onMounted(() => {
  console.log(testStore.currentTest.startDate);


  });

</script>

<template>

</template>

<style scoped>

</style>