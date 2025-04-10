<script setup lang="ts">
import {ref} from "vue";
import testTemplate from "../../models/templates/test-template.ts";
import TestTemplateForm from "./test-template-form.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {TestTemplateStorageUtility} from "../../classes/test-template-storage-provider.ts";
import ConfirmDialog from "../common/confirm-dialog.vue";
import {useAlertStore} from "../../globalStore/alertStore.ts";
import {infoAlert, successAlert} from "../../models/alerts/alerts.ts";

//vue const/functions
defineExpose({showDrawer});
const emit = defineEmits<{
  (event: 'saved'): void,
  (event: 'deleted'): void
}>();

const _drawerRef = ref<HTMLInputElement>();
const _template = ref<testTemplate | undefined>(undefined);
const _testTemplateForm = ref<InstanceType<typeof TestTemplateForm> | null>(null);
const _confirmationDialog = ref<InstanceType<typeof ConfirmDialog> | null>(null);

const _alertStore = useAlertStore();

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

async function save(): Promise<void> {
  if (!_testTemplateForm || !_testTemplateForm.value) return;

  await _testTemplateForm.value.saveTestTemplate().then((result: testTemplate) => {
    closeDrawer();
    _alertStore.addAlert(new successAlert("Template Updated", `The test '${result.title}' has been updated`));
    emit('saved')
  });
}

async function deleteTemplate(): Promise<void> {
  if (_confirmationDialog && _confirmationDialog.value) {
    await _confirmationDialog.value.confirm().then((result: boolean) => {
      if (result && _template && _template.value) {
        if (TestTemplateStorageUtility.deleteTestTemplate(_template.value.id)) {
          closeDrawer();
          _alertStore.addAlert(new infoAlert("Template Deleted", `The test '${_template.value.title}' has been deleted`));
          emit('deleted');
        } else {
          console.log("error");
        }
      }
    }).catch(error => {
      console.log(error);
    });
  }
}

</script>

<template>
  <div class="drawer drawer-end z-50 ">
    <input id="drawer-checkbox" type="checkbox" ref="_drawerRef" class="drawer-toggle"/>
    <div class="drawer-side">
      <label for="drawer-checkbox" class="drawer-overlay" @click="closeDrawer"></label>
      <div class="container bg-base-200 text-base-content   sm:w-full lg:w-[55%] min-h-full max-h-full  p-0">
        <div class="pl-4 pr-4 flex bg-base-300">
          <div class="h-8 w-8 flex-grow text-lg pt-1 ">
            {{
              (_template && TestTemplateStorageUtility.findTestTemplate(_template.id)) ? 'Update Test Template' : 'Create Test Template'
            }}
          </div>
          <button title="Close" @click.prevent.stop="closeDrawer" class="btn btn-square btn-ghost">
            <font-awesome-icon size="lg" :icon="['fas','xmark']"></font-awesome-icon>
          </button>
        </div>
        <div class="pl-4 pr-4 flex">
          <div class="min-h-10 flex-grow">
          </div>
          <button v-if="_template && TestTemplateStorageUtility.findTestTemplate(_template.id)"
                  class="btn btn-error btn-xs md:btn-sm lg:btn-md btn-ghost" @click="deleteTemplate">
            Delete
          </button>
          <button class="btn btn-primary btn-xs md:btn-sm lg:btn-md btn-ghost" @click="save">
            Save
          </button>
        </div>
        <div class="pl-2 pr-2 ">
          <test-template-form ref="_testTemplateForm"></test-template-form>
          <confirm-dialog ref="_confirmationDialog" title="Confirm Delete" :is-warning="true"
                          :text="`Please confirm you want to delete ${_template?.title ? _template?.title : 'this test template'}`"></confirm-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>