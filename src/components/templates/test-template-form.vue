<script setup lang="ts">
import testTemplate from "../../models/templates/test-template.ts";
import {defineExpose, ref} from "vue";
import TestTemplateFormQuestions from "./test-template-form-questions.vue";

//vue constants
defineExpose({loadTestTemplate});

//private constants
const _template = ref<testTemplate>(new testTemplate("", "", false));

//vue functions

//component functions
function loadTestTemplate(test: testTemplate | undefined): void {
  if (!test) return;

  _template.value = JSON.parse(JSON.stringify(test));
}
</script>

<template>
  <fieldset  class="fieldset bg-base-100  border border-base-300 pt-4 pb-1 pl-4 pr-4 rounded-box spell-form">
    <label class="fieldset-label">Title</label>
    <input class="input" v-model="_template.title" placeholder="Test Title">
    <label class="fieldset-label">Description</label>
    <input type="text" v-model="_template.description" class="input" placeholder="Test Description">
    <label class="fieldset-label">Case Sensitive?</label>
    <input type="checkbox" v-model="_template.isCaseSensitive" class="toggle toggle-info">
    <div  class="divider">Test Questions ({{ _template.questions.length }})</div>
    <test-template-form-questions :questions="_template.questions"></test-template-form-questions>
  </fieldset>
</template>

<style scoped>
.spell-form{
  row-gap: 1%;
  column-gap: 0;
}
</style>