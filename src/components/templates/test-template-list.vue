<script setup lang="ts">

import {TestTemplate} from "../../models/test-template.ts";
import {type PropType, ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


const currentItem = ref<TestTemplate | undefined>(undefined);


const props = defineProps({
  tests: {type: Array as PropType<TestTemplate[]>, required: true}
});


function onHover(show: bool, test: TestTemplate): void {
  if (!test) return;

  show == true ? currentItem.value = test : currentItem.value = undefined;

}

function onTemplateClick(template: TestTemplate): void {
  console.log(template);
}

function onTemplateEditClick(template: TestTemplate): void {
  console.log(`Edit ${template.title}`);
}
</script>

<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
    <li class="p-4 pb-2 text-2xl opacity-60 tracking-wide">Current Test Templates</li>
    <li :title="`Start ${test.title}`" v-on:mouseenter="onHover(true,test)" v-on:mouseleave="onHover(false,test)"
        @click="onTemplateClick(test)"
        class="list-row template-row" v-for="(test,index) in tests">
      <div v-show="currentItem != test" class="text-4xl font-thin opacity-30 tabular-nums">
        {{ index < 9 ? `0${index + 1}` : index + 1 }}
      </div>
      <div v-show="currentItem == test" class="text-4xl font-thin opacity-30 tabular-nums">
        <font-awesome-icon :icon="['fas','play']"></font-awesome-icon>
      </div>
      <div>
        <div>{{ test.title }}</div>
        <div class="text-xs uppercase font-semibold opacity-60">{{ test.description }}</div>
        <div class="text-xs font-semibold opacity-50">{{ test.questions.length }} questions</div>
      </div>


      <button :title="`Edit ${test.title}`" @click.prevent.stop="onTemplateEditClick(test)" v-show="currentItem == test"
              class="btn btn-square btn-ghost">
        <font-awesome-icon :icon="['fas','pencil']"></font-awesome-icon>
      </button>
    </li>
  </ul>
</template>

<style scoped>
.template-row:hover {
  background-color: #161A20;
  cursor: pointer;
}
</style>