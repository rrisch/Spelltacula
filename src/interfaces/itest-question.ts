import {questionType} from "../constants/test-question-type.ts";

export interface iTestQuestion {
    id: string,
    description: string;
    key: string;
    questionType: questionType;
    options?: string[];
}