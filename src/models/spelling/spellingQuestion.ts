import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import { questionType} from "../../constants/test-question-type.ts";


export class spellingQuestion implements iTestQuestion{
    key: string="";
    description: string="";
    questionType:questionType = questionType.spelling;

    constructor(key: string, description: string){
        this.key = key;
        this.description = description;
    }

    speakWord():void{

    }
}