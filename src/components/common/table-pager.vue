<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

//vue const
const emit = defineEmits<{(event: 'pageChanged', pageNumber: number): void}>();
const props = defineProps({
  pageSize: {type: Number, required: true},
  total: {type: Number, required: true}
});

//exposed functions
defineExpose({getCurrentState,changeCurrentPage});

//component const
const currentPage = ref<number>(1);
const totalRecords = ref<number>(0);
const recordsPerPage = ref<number>(10);  //10 as fallback

const _totalPages = computed((): number => totalRecords.value == 0 ? 1 : Math.ceil(totalRecords.value / recordsPerPage.value));

//vue events
onMounted(() => {
  if (!props.total || !props.pageSize) return;

  currentPage.value = 1;
  totalRecords.value = props.total;
  recordsPerPage.value = props.pageSize;
});

watch(props, (newVal) => {
  if (newVal && newVal.total != totalRecords.value) {
    totalRecords.value = newVal.total;
    if (_totalPages.value < currentPage.value) currentPage.value = _totalPages.value;
  }
  if (newVal && newVal.pageSize != recordsPerPage.value) recordsPerPage.value = newVal.pageSize;
});

//component events
function changeCurrentPage(newPageValue: number,force?:boolean): void {
  if (!force && (newPageValue === currentPage.value || newPageValue < 1 || newPageValue > _totalPages.value)) return;

  currentPage.value = newPageValue;
  emit('pageChanged',currentPage.value);
}

function getCurrentState():{current:number, total:number}{
  return {current:currentPage.value,total:_totalPages.value};
}

</script>

<template>
  <div class="join">
    <button @click="changeCurrentPage(1)" :disabled="currentPage <= 1" class="join-item btn btn-square  btn-ghost">
      <font-awesome-icon :icon="['fas','angles-left']"></font-awesome-icon>
    </button>
    <button @click="changeCurrentPage(currentPage - 1)" :disabled="currentPage <= 1" class="join-item btn btn-square  btn-ghost">
      <font-awesome-icon :icon="['fas','less-than']"></font-awesome-icon>
    </button>
    <div  class="join-item btn btn-disabled btn-ghost">{{currentPage}} of {{_totalPages}}</div>
    <button @click="changeCurrentPage(currentPage + 1)" :disabled="currentPage >= _totalPages " class="join-item btn btn-square  btn-ghost">
      <font-awesome-icon :icon="['fas','greater-than']"></font-awesome-icon>
    </button>
    <button @click="changeCurrentPage(_totalPages)" :disabled="currentPage >= _totalPages " class="join-item btn btn-square  btn-ghost">
      <font-awesome-icon :icon="['fas','angles-right']"></font-awesome-icon>
    </button>
  </div>
</template>

<style scoped>

</style>