<script setup lang="ts">
import {ref} from "vue";
import testTemplate from "../../models/templates/test-template.ts";
import TestTemplateForm from "./test-template-form.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

//vue const/functions
defineExpose({showDrawer});

const _drawerRef = ref<HTMLInputElement>();
const _template = ref<testTemplate | undefined>(undefined);
const _testTemplateForm = ref<InstanceType<typeof TestTemplateForm> | null>(null);

const toggleDrawer = () => {
  if (_drawerRef.value) _drawerRef.value.checked = !_drawerRef.value.checked;
};
const closeDrawer = () => {
  if (_drawerRef.value) _drawerRef.value.checked = false;
};

function showDrawer(template: testTemplate): void {
  _template.value = _template ? template : undefined;

  if (_drawerRef && _drawerRef.value) {
    _drawerRef.value.checked = true;

    if (_testTemplateForm && _testTemplateForm.value) {
      _testTemplateForm.value.loadTestTemplate(_template?.value);
    }
  }
}
</script>

<template>
  <div class="drawer drawer-end z-50">
    <input id="drawer-checkbox" type="checkbox" ref="_drawerRef" class="drawer-toggle"/>
    <div class="drawer-side">
      <label for="drawer-checkbox" class="drawer-overlay" @click="closeDrawer"></label>
      <div class="container bg-base-200 text-base-content min-h-full sm:w-full lg:w-[55%]  p-4">
        <div class="p-4 flex">
          <div class="h-14 w-14 flex-grow">{{ _template?.title.length == 0 ? 'Create Test' : 'Update Test' }}</div>
          <button title="Close" @click.prevent.stop="closeDrawer" class="btn btn-square btn-ghost">
            <font-awesome-icon size="xl" :icon="['fas','xmark']"></font-awesome-icon>
          </button>
        </div>
        <div class="container">
        <test-template-form ref="_testTemplateForm"></test-template-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>