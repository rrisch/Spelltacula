<!--suppress JSUnusedGlobalSymbols -->
<script setup lang="ts">

import testTemplate from "../../models/templates/test-template";
import {type PropType, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

//private properties
const currentItem = ref<testTemplate | undefined>(undefined);

//vue properties

const emit = defineEmits<{
  (event: 'edit', template: testTemplate): void
  (event: 'start', template:testTemplate): void
}>();
const props = defineProps({
  tests: {type: Array as PropType<testTemplate[]>, required: true}
});


function onHover(show: boolean, test: testTemplate): void {
  if (!test) return;

  show ? currentItem.value = test : currentItem.value = undefined;

}

function onTemplateClick(template: testTemplate): void {
  console.log(template);
}

function onTemplateEditClick(template: testTemplate): void {
  emit('edit',template);
}
</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
    <li class="p-4 pb-2 text-2xl opacity-60 tracking-wide">Current Test Templates</li>
    <li :title="`Start ${test.title}`" v-on:mouseenter="onHover(true,test)" v-on:mouseleave="onHover(false,test)"
        class="list-row template-row" v-for="(test,index) in tests">
      <div v-show="currentItem != test" class="text-4xl font-thin opacity-30 tabular-nums">
        {{ index < 9 ? `0${index + 1}` : index + 1 }}
      </div>
      <div v-show="currentItem == test" class="text-4xl font-thin tabular-nums">
        <font-awesome-icon  @click="onTemplateClick(test)" class="playButton" :icon="['fas','play']"></font-awesome-icon>
      </div>
      <div>
        <div>{{ test.title }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">{{ test.description }}</div>
        <div class="text-xs font-semibold opacity-50">{{ test.questions.length }} questions</div>
      </div>
      <button :title="`Edit ${test.title}`" @click.prevent.stop="onTemplateEditClick(test)" v-show="currentItem == test"
              class="btn btn-square btn-ghost">
        <font-awesome-icon  :icon="['fas','pencil']"></font-awesome-icon>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.playButton{
  opacity: .3;
}
.playButton:hover{
color: var(--color-primary);
  opacity: 1 !important;
}

.template-row:hover {
  background-color: #161A20;
  cursor: pointer;
}
</style>