<script setup lang="ts">
import TestTemplateList from "../components/templates/test-template-list.vue";
import testTemplate from "../models/templates/test-template.ts"
import {onMounted, ref} from "vue";
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";
import TestTemplateDrawer from "../components/templates/test-template-drawer.vue";

//private props
const currentTests = ref<testTemplate[]>([]);
const selectedTestTemplate=ref<testTemplate | undefined>(undefined);
const _templateEdit =  ref<InstanceType<typeof TestTemplateDrawer> | null>(null);

//vue
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
        test.questions.push(new spellingQuestion(`key ${x +1}`, `Description ${x +1}`));
      }
    } else {
      for (let y = 0; y < 10; y++) {
        test.questions.push(new spellingQuestion(`key ${y+1}`, `Description ${y+1}`));
      }
    }
    tests.push(test);
  }
  return tests;
}

function showEditDrawer(template:testTemplate):void{
 // if (!template) return;
  selectedTestTemplate.value=template;
_templateEdit.value?.showDrawer(selectedTestTemplate.value);
}

</script>

<template>
  <div class="container mx-auto px-4">
  <test-template-list @edit="showEditDrawer" :tests="currentTests"></test-template-list>
    <test-template-drawer ref="_templateEdit" :template="selectedTestTemplate" ></test-template-drawer>
  </div>
</template>

<style scoped>

</style>