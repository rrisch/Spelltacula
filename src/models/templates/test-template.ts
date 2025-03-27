import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import {classHelpers} from "../../classes/class-helper.ts";

export default class TestTemplate {
   id: string;
    title: string = "";
    description: string = "";
    isCaseSensitive: boolean = false;
    questions: iTestQuestion[] = [];


    constructor(title: string, description: string, isCaseSensitive: boolean = false, questions: iTestQuestion[]=[]) {
        this.id=classHelpers.generateUUID();
        this.title = title;
        this.description = description;
        this.isCaseSensitive = isCaseSensitive;
        this.questions = questions;
    }

    public function save():boolean {

    }
}