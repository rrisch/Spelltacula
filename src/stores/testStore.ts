import {defineStore} from "pinia";
import {ref} from "vue";
import type {iTest} from "../interfaces/itest.ts";


export const useTestStore = defineStore('test', () => {
    const  currentTest = ref<iTest | undefined>(undefined);

    function setCurrentTest(newValue:iTest){
        if(!newValue)return;
        currentTest.value = newValue;
    }

    return {currentTest,setCurrentTest };
})