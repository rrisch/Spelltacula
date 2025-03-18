import {questionType} from "../constants/test-question-type.ts";

export interface iTestQuestion {
    description: string;
    key: string;
    questionType: questionType;
    options?: string[];
}