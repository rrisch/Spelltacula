<script setup lang="ts">

import router from "../../router/index.ts"
import {applicationRoutes} from "../../constants/current-features"

import type {appRoute} from "../../models/app-route.ts";
import {ref} from "vue";


const menuItems = ref<appRoute[]>(applicationRoutes);

function navigateToItem(item: appRoute): void {
  if (!item) return;

  router.push(item.url)
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-sm">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
          </svg>
        </div>
        <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

          <li v-for="feature in menuItems">
            <a @click="navigateToItem(feature)">{{ feature.description }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class=" navbar-center">
      <a class="btn btn-ghost text-xl">SpellTacula</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>