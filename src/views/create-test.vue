<script setup lang="ts">
import TestTemplateList from "../components/templates/test-template-list.vue";
import testTemplate from "../models/templates/test-template.ts"
import {onMounted, ref} from "vue";
import TestTemplateDrawer from "../components/templates/test-template-drawer.vue";
import {browserStorageKeys} from "../constants/browser-storage-keys.ts";
import {safeJsonParse} from "../classes/safeJSONParser.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

//private props
const currentTests = ref<testTemplate[]>([]);
const selectedTestTemplate = ref<testTemplate | undefined>(undefined);
const _templateEdit = ref<InstanceType<typeof TestTemplateDrawer> | null>(null);

//vue
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

function showEditDrawer(template: testTemplate): void {
  // if (!template) return;
  selectedTestTemplate.value = template;
  _templateEdit.value?.showDrawer(selectedTestTemplate.value);
}

function addNewTest(): void {
  let newTest = new testTemplate("", "");
  _templateEdit.value?.showDrawer(newTest);
}

function onSaved(): void {
  currentTests.value = loadTestTemplates();
}

function onDeleted(): void {
  currentTests.value = loadTestTemplates();
}
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="p-1 flex">
      <div class="min-h-10 max-h-10 flex-grow">{{

        }}
      </div>

      <button title="Create New"
              class="btn btn-square btn-ghost addButton"
              @click="addNewTest">
        <font-awesome-icon size="lg" :icon="['fas','plus']"></font-awesome-icon>
      </button>
    </div>
    <test-template-list :show-edit="true" @edit="showEditDrawer" :tests="currentTests"></test-template-list>
    <test-template-drawer @deleted="onDeleted" @saved="onSaved" ref="_templateEdit"
                          :template="selectedTestTemplate"></test-template-drawer>
  </div>
</template>

<style scoped>
.addButton {
  color: var(--color-success);
}
</style>