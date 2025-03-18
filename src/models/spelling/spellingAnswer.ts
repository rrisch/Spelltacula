import type {iTestAnswer} from "../../interfaces/itest-answer.ts";

export class spellingAnswer implements iTestAnswer{
    description:string ="";
    correctAnswer:string ="";
    answer:string ="";

    constructor(description:string, correctAnswer:string) {
        this.description = description;
        this.correctAnswer = correctAnswer;
    }

    setAnswer(answer:string):void {
        this.answer = answer.trim();
    }

    isCorrect(isStrict:boolean):boolean {
        if (isStrict) return this.correctAnswer === this.answer;

        return this.correctAnswer.toLowerCase() === this.answer.toLowerCase();
    }
}