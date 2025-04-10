import type {iTest} from "../../interfaces/itest.ts";
import type {iTestAnswer} from "../../interfaces/itest-answer.ts";
import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import {spellingAnswer} from "./spellingAnswer.ts";
import {classHelpers} from "../../classes/class-helper.ts";

export class spellingTest implements iTest {
    endDate: Date | undefined = undefined;
    id: string;
    title: string;
    description: string;
    score: number = 0;
    startDate: Date | undefined = undefined;
    testItems: iTestAnswer[];

    constructor(id?: string, title?: string, description?: string) {
        this.id = id ? id : classHelpers.generateUUID();
        this.title = title ? title : "";
        this.description = description ? description : "";
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
        this.score = (this.testItems.filter((i: iTestAnswer) => i.isCorrect()).length / this.testItems.length) * 100;
        return this.score;
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