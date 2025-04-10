<script setup lang="ts">
import NavBar from "./components/NavBar/nav-bar.vue";
import ToastNotifications from "./components/common/toast-notifications.vue";
</script>

<template>
  <nav-bar></nav-bar>
  <router-view></router-view>
  <toast-notifications></toast-notifications>
</template>


