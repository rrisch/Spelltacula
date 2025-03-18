import type {iTestAnswer} from "../interfaces/itest-answer.ts";

export class test{
    startTime:Date = new Date();
    endTime:Date =new Date();
responses:iTestAnswer[];
score: number =0;

constructor(responses:iTestAnswer[]){
    this.responses=responses;
}
startTest(){
    this.startTime=new Date();
}
endTest(){
    this.endTime=new Date();
    this.grade();
}
private grade():void{
    this.score = (this.responses.length / this.responses.filter((i) => i.isCorrect()).length) * 100;
}
    private getNextQuestion(min: number, max: number): iTestAnswer | undefined {
    let unAnsweredQuestiongs =this.responses.filter((i) => i.answer.length == 0);

    if (unAnsweredQuestiongs.length <= 1) return undefined;
    min = Math.ceil(0);
        max = Math.floor(unAnsweredQuestiongs.length -1);

        return unAnsweredQuestiongs[ Math.floor(Math.random() * (max - min + 1)) + min];
    }
}