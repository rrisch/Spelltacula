import type {iTestQuestion} from "./itest-question.ts";

export interface iTestAnswer {
    question: iTestQuestion;
    answer:string;
    setAnswer(answer:string):void;
    isCorrect(isStrict?:boolean):boolean;


}