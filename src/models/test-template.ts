import type  {iTestQuestion} from "../interfaces/itest-question.ts";

export class TestTemplate {
    title: string="";
    description: string="";
    isCaseSensitive: boolean = false;
    questions: iTestQuestion[]=[];
}