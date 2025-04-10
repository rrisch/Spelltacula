import type {iTestAnswer} from "./itest-answer.ts";
import type {iTestQuestion} from "./itest-question.ts";

export interface iTest {
    id: string;
    title: string;
    description: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    testItems: iTestAnswer[];
    score: number;

    populateTest(questions: iTestQuestion[]): boolean;

    startTest(): void;

    endTest(): void;

    gradeTest(): number;

    getNextQuestion(): iTestAnswer;

}