import type {iTestAnswer} from "./itest-answer.ts";
import type {iTestQuestion} from "./itest-question.ts";

export interface iTest{
    id:string;
    startDate:Date;
    endDate:Date;
    testItems:iTestAnswer[];
    score:number;

    populateTest(questions:iTestQuestion[]):boolean;
    startTest():void;
    endTest():void;
    gradeTest():number;
    getNextQuestion():iTestAnswer;

}