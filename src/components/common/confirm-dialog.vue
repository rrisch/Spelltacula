<script setup lang="ts">
import {onMounted, ref} from "vue";
import {classHelpers} from "../../classes/class-helper.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";



//component conts
const _id = ref<string>();
const _modal = ref<HTMLDialogElement | undefined>(undefined);

//vue consts
const props = defineProps({
  text: {type: String, required: true},
  isWarning:{type:Boolean, required:false}
});

//exposed methods
defineExpose({show,close});

onMounted(()=>{
  //generate a unique id for this instance
  _id.value = classHelpers.generateUUID();
})
function show():void{
  if (_modal && _modal.value) _modal.value.showModal();
}
function close():void{
  if (_modal && _modal.value) _modal.value.close();
}

</script>

<template>
  <dialog ref="_modal" class="modal" :id="_id" >
    <div class="modal-box">

      <font-awesome-icon size="md" :icon="['fas','warning']"></font-awesome-icon>
      <h3 :class="props.isWarning ? 'text-warning' : 'text-bold'" class="text-lg">Hello!</h3>
      <p class="py-4">{{ props.text }}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

</style>