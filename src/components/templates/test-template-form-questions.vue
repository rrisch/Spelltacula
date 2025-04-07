<script setup lang="ts">
import type {iTestQuestion} from "../../interfaces/itest-question.ts"
import {computed, onMounted, type PropType, reactive, ref, watch} from "vue";
import {classHelpers} from "../../classes/class-helper.ts";
import TablePager from "../common/table-pager.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {questionType} from "../../constants/test-question-type.ts";

//component constants
const _questions = ref<iTestQuestion[]>();
const _currentQuestions = ref<iTestQuestion[]>();
const _questionPageSize = ref<number>(10);  //default the page size to 10
const _currentPage = ref<number>(1);
const _isTableHeaderChecked = ref<boolean>(false);
const _selectedQuestions = ref<string[]>([]);
const _shadowSelectedQuestion = ref<iTestQuestion | undefined>(undefined);

const _currentQuestionId = reactive({id: "0"});
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
  }
});

watch(_isTableHeaderChecked, (newVal) => {
  _isTableHeaderChecked.value = newVal;
  _selectedQuestions.value = [];

  if (_isTableHeaderChecked.value) {
    _questions.value?.forEach((q) => {
      _selectedQuestions.value.push(q.id);
    });
  }
})


//component functions
function getPageQuestions(): iTestQuestion[] | undefined {
  let startIdx = _currentPage.value > 1 ? (_currentPage.value * _questionPageSize.value) - _questionPageSize.value : 0;
  let endIdx = startIdx + _questionPageSize.value;

  return _questions.value?.slice(startIdx, endIdx);
}

function onPageChanged(newPage: number): void {
  _currentPage.value = newPage;
}

function onQuestionSelected(question: iTestQuestion): void {
  if (!question) return;

  _currentQuestionId.id = question.id;
  _shadowSelectedQuestion.value = JSON.parse(JSON.stringify(question));
}

function isQuestionSelected(id: string): boolean {
  if (!id || id == "") return false;

  return _selectedQuestions.value.find((x) => {
    return x == id;
  }) != undefined;
}

function onQuestionCheckboxClicked(id: string): void {
  if (!id || id == "") return;

  if (isQuestionSelected(id)) {
    let idx = _selectedQuestions.value.indexOf((id));
    if (idx > -1) {
      _selectedQuestions.value.splice(idx, 1);
      return;
    }
  }

  //just push it (real good)
  _selectedQuestions.value.push(id);
}

function onEditCancel(question: iTestQuestion): void {
  _currentQuestionId.id = "0";

  if (!question) return;

question = JSON.parse(JSON.stringify(_shadowSelectedQuestion.value));

  console.log(question);
  _shadowSelectedQuestion.value = undefined;
}
function onSaveClick():void{
  _currentQuestionId.id="0";
}
</script>

<template>
  <div class="p-0 min-h-[92%] max-h-[92%]">
    <div class="p-1 flex">
      <div class="min-h-10 max-h-10 flex-grow">{{
          _selectedQuestions.length == 0 ? '' : `${_selectedQuestions.length} questions selected`
        }}
      </div>
      <button title="Close" v-if="_selectedQuestions.length > 0" class="btn btn-square btn-ghost">
        <font-awesome-icon class="deleteButton" size="md" :icon="['fas','trash']"></font-awesome-icon>
      </button>
    </div>
    <table class="table xs:table-xs 2xl:table-md table-sm min-w-full flex-1">
      <thead>
      <tr>
        <th class="w-[5%]">
          <input type="checkbox" v-model="_isTableHeaderChecked" class="checkbox checkbox-xs">
        </th>
        <th class="w-[14%]">Type</th>
        <th>Question</th>
        <th class="w-[30%]">Answer</th>
        <th class="w-[15%]"></th>
      </tr>
      </thead>
    </table>
    <div class="overflow-x-auto min-h-[70%] max-h-[70%] ">
      <table class="table xs:table-xs 2xl:table-md table-sm min-w-full">
        <tbody>
        <tr @click="onQuestionSelected(question)" class="hover:bg-base-300 hover:cursor-pointer"
            v-for="question in _pagedQuestions">
          <th class="w-[5%]">
            <label v-if="_currentQuestionId.id == question.id">
              <input type="checkbox" @click.prevent.stop="onQuestionCheckboxClicked(question.id)"
                     v-if="isQuestionSelected(question.id)" checked="checked" class="checkbox checkbox-xs">
              <input type="checkbox" @click.prevent.stop="onQuestionCheckboxClicked(question.id)"
                     v-if="!isQuestionSelected(question.id)" class="checkbox checkbox-xs">
            </label>
            <label v-if="_currentQuestionId.id  == question.id">
            </label>
          </th>
          <td class="w-[12%]">
            <span v-if="_currentQuestionId.id  != question.id">
            <font-awesome-icon v-if="question.questionType == questionType.spelling" :icon="['fas', 'spell-check']"
                               title="Spelling"/>
            <font-awesome-icon v-if="question.questionType == questionType.math" :icon="['fas', 'calculator']"
                               title="Math"/>
            <font-awesome-icon v-if="question.questionType == questionType.multiple" :icon="['fas', 'list-check']"
                               title="Multiple Choice"/>
            </span>

            <select v-model="question.questionType" class="select"
                    v-if="_currentQuestionId.id == question.id">
              <option disabled selected>Pick a type</option>
              <option :value="questionType.spelling">Spelling</option>
              <option :value="questionType.math">Math</option>
              <option :value="questionType.multiple">Multiple Choice</option>
            </select>
          </td>
          <td>
            <span v-if="_currentQuestionId.id != question.id">{{ question.description }}</span>
            <input v-if="_currentQuestionId.id == question.id" type="text"
                   v-model="question.description" class="input ml-0 flex-grow" placeholder="Question">
          </td>
          <td class="w-[30%]">
            <span v-if="_currentQuestionId.id != question.id">{{ question.key }}</span>
            <input v-if="_currentQuestionId.id == question.id" type="text"
                   v-model="question.key"
                   class="input ml-0" placeholder="Answer">
          </td>
          <td class="w-[15%]">
            <button v-if="_currentQuestionId.id  == question.id" title="Close" @click.prevent.stop="onSaveClick(question)"
                    class="btn btn-square btn-ghost">
              <font-awesome-icon :icon="['fas','check']"></font-awesome-icon>
            </button>
            <button v-if=" _currentQuestionId.id  == question.id" title="Close" @click.prevent.stop="onEditCancel(question)"
                    class="btn btn-square btn-ghost">
              <font-awesome-icon title="Cancel"
                                 :icon="['fas','xmark']"></font-awesome-icon>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-center">
      <table-pager @page-changed="onPageChanged" :page-size="_questionPageSize"
                   :total="_questions?.length"></table-pager>
    </div>
  </div>
</template>

<style scoped>
.deleteButton {
  color: var(--color-secondary);
}

.deleteButton:hover {
  color: var(--color-warning);
}
</style>