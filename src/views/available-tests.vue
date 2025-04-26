<script setup lang="ts">

import { useTestStore } from '../stores/testStore.ts'
import TestTemplateList from "../components/templates/test-template-list.vue";
import testTemplate from "../models/templates/test-template.ts";
import {onMounted, ref} from "vue";
import type {iTest} from "../interfaces/itest.ts";
import {spellingTest} from "../models/spelling/spelling-test.ts";
import {browserStorageKeys} from "../constants/browser-storage-keys.ts";
import {safeJsonParse} from "../classes/safeJSONParser.ts";
import router from "../router";
import {applicationRoutes, routeNames} from "../constants/current-features.ts";

const currentTests = ref<testTemplate[]>([]);
const _selectedTest = ref<iTest | undefined>(undefined);
const testStore = useTestStore()

//vue methods
onMounted(() => {
  //populate the tests from localstorage
  currentTests.value = loadTestTemplates();
})

function loadTestTemplates(): testTemplate[] {
  let tests = localStorage.getItem(browserStorageKeys.templateKey);
  if (!tests) return [];

  let result = safeJsonParse<testTemplate[]>(tests);
  return result ? result : [];
}

function startTest(template: testTemplate): void {
  if (!template) return;

  _selectedTest.value = new spellingTest();
  _selectedTest.value.title = template.title;
  _selectedTest.value.description = template.description;
  _selectedTest.value.populateTest(template.questions);

  testStore.setCurrentTest(_selectedTest.value);

  let url =applicationRoutes.find(x => x.route == routeNames.TakeTest)?.url;
  if(url && url.length > 0) {
    router.push(url);
  }

}
</script>

<template>
  <div class="container mx-auto px-4">
    <test-template-list v-if="!_selectedTest" :show-start="true" @start="startTest"
                        :tests="currentTests"></test-template-list>
  </div>
</template>

<style scoped>

</style>