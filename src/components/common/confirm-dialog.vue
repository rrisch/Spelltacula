<script setup lang="ts">
import {onMounted, ref} from "vue";
import {classHelpers} from "../../classes/class-helper.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


//component conts
const _id = ref<string>();
const _modal = ref<HTMLDialogElement | undefined>(undefined);

//vue consts
const props = defineProps({
  title: {type: String, required: true},
  text: {type: String, required: true},
  isWarning: {type: Boolean, required: false}
});

//exposed methods
defineExpose({show, close});

onMounted(() => {
  //generate a unique id for this instance
  _id.value = classHelpers.generateUUID();
})

function show(): void {
  if (_modal && _modal.value) _modal.value.showModal();
}

function close(): void {
  if (_modal && _modal.value) _modal.value.close();
}

</script>

<template>
  <dialog ref="_modal" class="modal" :id="_id">
    <div class="modal-box">
      <div class="flex">
        <font-awesome-icon size="2xl" class="pr-4 text-warning" :icon="['fas','warning']"></font-awesome-icon>
        <h3 :class="props.isWarning ? 'text-warning' : 'text-bold'" class="text-lg pr-4">{{ props.title }}!</h3>
      </div>

      <p class="py-4">{{ props.text }}</p>
      <div class="modal-action">
        <div class=" flex flex-grow">
          <div class="flex-grow" @click="close"><button class="btn">Cancel</button></div>

          <div class="flex-none"><button class="btn btn-warning">Confirm</button></div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>