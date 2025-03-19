import type {iTest} from "../../interfaces/itest.ts";
import type {iTestAnswer} from "../../interfaces/itest-answer.ts";
import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import {spellingAnswer} from "./spellingAnswer.ts";

export class spellingTest implements iTest {
    endDate: Date = new Date();
    id: string;
    score: number = 0;
    startDate: Date = new Date();
    testItems: iTestAnswer[];

    constructor(id: string) {
        this.id = id;
        this.testItems = [];
    }

    endTest(): void {
        this.endDate = new Date();
    }

    getNextQuestion(): iTestAnswer {
        let unAnsweredQuestions = this.testItems.filter((i: iTestAnswer) => i.answer.length == 0);
        let max = unAnsweredQuestions.length;
        return unAnsweredQuestions[(Math.floor(Math.random() * max) + 1) - 1];
    }

    gradeTest(): number {
        return 0;
    }

    startTest(): void {
        this.startDate = new Date();
    }

    populateTest(questions: iTestQuestion[]): boolean {
        if (questions.length < 1) {
            reportError(new RangeError("No spelling test questions found"));
            return false;
        }

        questions.forEach(question => {
            try {
                this.testItems.push(new spellingAnswer(question));
            } catch (e) {
                reportError(e);
                return false;
            }
        });

        return true;
    }

}