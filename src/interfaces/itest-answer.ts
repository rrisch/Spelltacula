export interface iTestAnswer {
    description:string;
    correctAnswer:string;
    answer:string;
    setAnswer(answer:string):void;
    isCorrect(isStrict?:boolean):boolean;
}