import type {iTestAnswer} from "../../interfaces/itest-answer.ts";
import type {iTestQuestion} from "../../interfaces/itest-question.ts";

export class spellingAnswer implements iTestAnswer {
    question: iTestQuestion;
    answer: string = "";

    constructor(testQuestion: iTestQuestion) {
        this.question = testQuestion;
    }

    setAnswer(answerValue: string): void {
        this.answer = answerValue.trim();
    }

    isCorrect(isStrict?: boolean): boolean {
        if (isStrict) return this.question.key === this.answer;

        return this.question.key.toLowerCase() === this.answer.toLowerCase();
    }
}