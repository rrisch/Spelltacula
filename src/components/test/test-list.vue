<script setup lang="ts">

import {onMounted, ref} from "vue";
import template from "../../models/templates/test-template.ts";

const currentTests: npref<template[]> = ref([]);

onMounted(() => {
  console.log(currentTests);
});
</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md">

    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Test Catalog</li>

    <li v-for="item in currentTests" class="list-row">
      <div>
        {{ item.title }}
      </div>
      <div>
        <div>Dio Lupa</div>
        <div class="text-xs uppercase font-semibold opacity-60">{{ item.Description }}</div>
      </div>
      <button class="btn btn-square btn-ghost">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
            <path d="M6 3L20 12 6 21 6 3z"></path>
          </g>
        </svg>
      </button>
      <button class="btn btn-square btn-ghost">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
            <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </g>
        </svg>
      </button>
    </li>


  </ul>
</template>

<style scoped>

</style>