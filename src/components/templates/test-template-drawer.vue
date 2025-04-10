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
  <div class="drawer drawer-end z-50 ">
    <input id="drawer-checkbox" type="checkbox" ref="_drawerRef" class="drawer-toggle"/>
    <div class="drawer-side">
      <label for="drawer-checkbox" class="drawer-overlay" @click="closeDrawer"></label>
      <div class="container bg-base-200 text-base-content   sm:w-full lg:w-[55%] min-h-full max-h-full  p-0"
          >
        <div class="pl-4 pr-4 flex bg-base-300">
          <div class="h-8 w-8 flex-grow text-lg pt-1 ">
            {{ _template?.title.length == 0 ? 'Create Test Template' : 'Update Test Template' }}
          </div>
          <button title="Close" @click.prevent.stop="closeDrawer" class="btn btn-square btn-ghost">
            <font-awesome-icon size="lg" :icon="['fas','xmark']"></font-awesome-icon>
          </button>
        </div>
        <div class="pl-4 pr-4 flex">
          <div class="min-h-10 flex-grow">
          </div>
          <button class="btn btn-primary btn-xs md:btn-sm lg:btn-md btn-ghost ">
            Save
          </button>
        </div>
        <div  class="pl-2 pr-2 ">
          <test-template-form ref="_testTemplateForm"></test-template-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>