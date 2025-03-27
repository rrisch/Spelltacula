<script setup lang="ts">
import TestTemplateList from "../components/templates/test-template-list.vue";
import type {Ref} from "vue";
import {onMounted, ref} from "vue";
import {TestTemplate} from "../models/test-template.ts";
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";

const currentTests: Ref<TestTemplate[]> = ref([]);

onMounted(() => {
  //populate the tests from localstorage
  currentTests.value = loadTestTemplates();
})

function loadTestTemplates(): TestTemplate[] {
  //fake data until I can pull latest with localstorage provider
  let tests = [];
  for (var i = 0; i < 10; i++) {
    let test = new TestTemplate();
    test.title = `Test ${i + 1}`;
    test.description = `Description ${i + 1}`;
    test.isCaseSensitive = i % 2 == 0;

    if (test.isCaseSensitive) {
      for (var x = 0; x < 20; x++) {
        test.questions.push(new spellingQuestion(`key ${x}`, `Description ${x}`));
      }
    } else {
      for (var x = 0; x < 10; x++) {
        test.questions.push(new spellingQuestion(`key ${x}`, `Description ${x}`));
      }
    }
    tests.push(test);
  }
  return tests;
}

</script>

<template>
  <div class="container mx-auto px-4">
  <test-template-list :tests="currentTests"></test-template-list>
  </div>
</template>

<style scoped>

</style>