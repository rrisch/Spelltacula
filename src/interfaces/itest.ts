import type {iTestAnswer} from "./itest-answer.ts";

export interface iTest{
    id:string;
    startDate:Date;
    endDate:Date;
    testItems:iTestAnswer[];
    score:number;

    startTest():void;
    endTest():void;
    gradeTest():number;
    getNextQuestion():iTestAnswer;
}