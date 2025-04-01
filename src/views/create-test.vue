<script setup lang="ts">
import TestTemplateList from "../components/templates/test-template-list.vue";
import testTemplate from "../models/templates/test-template.ts"
import {onMounted, ref} from "vue";
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";

const currentTests = ref<testTemplate[]>([]);

onMounted(() => {
  //populate the tests from localstorage
  currentTests.value = loadTestTemplates();
})

function loadTestTemplates(): testTemplate[] {
  //fake data until I can pull latest with localstorage provider
  let tests = [];
  for (let i = 0; i < 10; i++) {
    let test = new testTemplate(`Test ${i + 1}`,`Description ${i + 1}`,i % 2 == 0);

    if (test.isCaseSensitive) {
      for (let x = 0; x < 20; x++) {
        test.questions.push(new spellingQuestion(`key ${x}`, `Description ${x}`));
      }
    } else {
      for (let y = 0; y < 10; y++) {
        test.questions.push(new spellingQuestion(`key ${y}`, `Description ${y}`));
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