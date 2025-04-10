<script setup lang="ts">

import TestTemplateList from "../components/templates/test-template-list.vue";
import testTemplate from "../models/templates/test-template.ts";
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";
import {onMounted, ref} from "vue";
import type {iTest} from "../interfaces/itest.ts";
import {spellingTest} from "../models/spelling/spelling-test.ts";

const currentTests = ref<testTemplate[]>([]);
const _selectedTest = ref<iTest | undefined>(undefined);

//vue methods
onMounted(() => {
  //populate the tests from localstorage
  currentTests.value = loadTestTemplates();
})

function loadTestTemplates(): testTemplate[] {
  //fake data until I can pull latest with localstorage provider
  let tests = [];
  for (let i = 0; i < 10; i++) {
    let test = new testTemplate(`Test ${i + 1}`, `Description ${i + 1}`, i % 2 == 0);

    if (test.isCaseSensitive) {
      for (let x = 0; x < 20; x++) {
        test.questions.push(new spellingQuestion(`answer${x + 1}`, `answer${x + 1}`));
      }
    } else {
      for (let y = 0; y < 10; y++) {
        test.questions.push(new spellingQuestion(`answer${y + 1}`, `answer${y + 1}`));
      }
    }
    tests.push(test);
  }
  return tests;
}

function startTest(template: testTemplate): void {
  if (!template) return;

  _selectedTest.value = new spellingTest();
  _selectedTest.value.title = template.title;
  _selectedTest.value.description = template.description;
  _selectedTest.value.populateTest(template.questions);

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