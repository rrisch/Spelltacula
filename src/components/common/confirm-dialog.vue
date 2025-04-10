<script setup lang="ts">
import {onMounted, ref} from "vue";
import {classHelpers} from "../../classes/class-helper.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


//component conts
const _id = ref<string>();
const _modal = ref<HTMLDialogElement | undefined>(undefined);
const _isConfirmed = ref<number>(0);

//vue consts
const props = defineProps({
  title: {type: String, required: true},
  text: {type: String, required: true},
  isWarning: {type: Boolean, required: false}
});

//exposed methods
defineExpose({show, close, confirm});

onMounted(() => {
  //generate a unique id for this instance
  _id.value = classHelpers.generateUUID();
})

//component functions
function confirm(): Promise<boolean> {
  _isConfirmed.value = 0;
  return new Promise<boolean>(function (resolve) {
    if (_modal && _modal.value) {
      _modal.value.showModal();
      _modal.value.onclose = () => {
        resolve(_isConfirmed.value == 1);
      }
    }
  });
}

function show(): void {
  if (_modal && _modal.value) _modal.value.showModal();
}

function close(status:number): void {
  _isConfirmed.value = status;
  if (_modal && _modal.value) _modal.value.close();
}

function setConfirm(): void {
  _isConfirmed.value = 1;
  close(1);
}

</script>

<template>
  <dialog ref="_modal" class="modal" :id="_id">
    <div class="modal-box">
      <div class="flex">
        <font-awesome-icon size="2xl" class="pr-4 text-warning" :icon="['fas','warning']"></font-awesome-icon>
        <h3 :class="props.isWarning ? 'text-warning' : 'text-bold'" class="text-lg pr-4">{{ props.title }}</h3>
      </div>

      <p class="py-4">{{ props.text }}</p>
      <div class="modal-action">
        <div class=" flex flex-grow">
          <div class="flex-grow">
            <button @click="close(2)" class="btn">Cancel</button>
          </div>

          <div class="flex-none">
            <button @click="setConfirm" class="btn btn-warning">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>