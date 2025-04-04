import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import {questionType} from "../../constants/test-question-type.ts";
import {textToSpeechUtil} from "../../classes/text-to-speech-util.ts";
import {classHelpers} from "../../classes/class-helper.ts";

export class spellingQuestion implements iTestQuestion {
    id: string="";
    key: string = "";
    description: string = "";
    questionType: questionType = questionType.spelling;

    constructor(key: string, description: string) {
        this.id = classHelpers.generateUUID();
        this.key = key;
        this.description = description;
    }

    speakWord(window: Window): void {
        textToSpeechUtil.speak(window, this.key);
    }
}