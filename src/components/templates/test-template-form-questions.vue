<script setup lang="ts">
import type {iTestQuestion} from "../../interfaces/itest-question.ts"
import {computed, onMounted, type PropType, ref, watch} from "vue";
import {classHelpers} from "../../classes/class-helper.ts";
import TablePager from "../common/table-pager.vue";

//component constants
const _questions = ref<iTestQuestion[]>();
const _currentQuestions = ref<iTestQuestion[]>();
const _questionPageSize = ref<number>(5);  //default the page size to 10
const _currentPage = ref<number>(1);

const _pagedQuestions = computed((): iTestQuestion[] | undefined => getPageQuestions());

//vue const/functions
const props = defineProps({
  questions: {type: Array as PropType<iTestQuestion[]>, required: true},
  questionPageSize: {type: Number, required: false}
});

onMounted(() => {
  if (!props.questions || props.questions.length == 0) return;
  _currentQuestions.value = props.questions;

  if (props.questionPageSize) _questionPageSize.value = props.questionPageSize;

  //we need to do this so can edit them and bind them to fields
  props.questions.forEach((q) => {
    _questions.value?.push(JSON.parse(JSON.stringify(q)));
  })
});

watch(props, (newValue) => {

  if (!classHelpers.isDeepEqual(newValue.questions, _questions)) {
    _currentPage.value = 1
    _questions.value = [];

    //we need to do this so can edit them and bind them to fields
    props.questions.forEach((q) => {
      _questions.value?.push(JSON.parse(JSON.stringify(q)));
    });

    // console.log(_questions.value)
    // _questions.value.push(JSON.parse(JSON.stringify(newValue.questions)));
    // console.log(_questions.value);
  }
});

//component functions
function getPageQuestions(): iTestQuestion[] | undefined {
  let startIdx = _currentPage.value > 1 ? (_currentPage.value * _questionPageSize.value) - _questionPageSize.value : 0;
  let endIdx = startIdx + _questionPageSize.value;

  return _questions.value?.slice(startIdx, endIdx);
}

function onPageChanged(newPage: number): void {
  _currentPage.value = newPage;
}
</script>

<template>
  <div class="h-96 overflow-x-auto p-0">
    <table class="table table-md min-w-full">
      <thead>
      <tr>
        <th>
          <input type="checkbox" class="checkbox">
        </th>
        <th>Question</th>
        <th>Answer</th>
        <th>Type</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="question in _pagedQuestions">
        <th>
          <label>
            <input type="checkbox" class="checkbox">
          </label>
        </th>
        <td>
          {{ question.description }}
        </td>
        <td>
          {{ question.key }}
        </td>
        <td>
          {{ question.questionType }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center">
    <table-pager @page-changed="onPageChanged" :page-size="_questionPageSize" :total="_questions?.length"></table-pager>
  </div>
</template>

<style scoped>

</style>