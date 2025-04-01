import type {iTestQuestion} from "../../interfaces/itest-question.ts";
import {classHelpers} from "../../classes/class-helper.ts";
import {TestTemplateStorageUtility} from "../../classes/test-template-storage-provider.ts";

export default class testTemplate {
    id: string;
    title: string = "";
    description: string = "";
    isCaseSensitive: boolean = false;
    questions: iTestQuestion[] = [];


    constructor(title: string, description: string, isCaseSensitive: boolean = false, questions: iTestQuestion[] = []) {
        this.id = classHelpers.generateUUID();
        this.title = title;
        this.description = description;
        this.isCaseSensitive = isCaseSensitive;
        this.questions = questions;
    }

    isValid(): boolean {
        if (!this.id || !this.title || !this.description) return false;
        return !(this.id.length == 0 || this.title.length == 0 || this.description.length == 0);
    }

    save(): boolean {
        if (!this.isValid()) return false;

        let result: testTemplate | undefined;

        if (TestTemplateStorageUtility.findTestTemplate(this.id, localStorage)) {
            //existing
            result = TestTemplateStorageUtility.updateTestTemplate(this, localStorage);
        } else {
            //new
            result = TestTemplateStorageUtility.insertTestTemplate(this, localStorage);
        }

        return result != undefined;
    }

    delete(): boolean {
        if (!this.id || this.id.length == 0) return false;

        return TestTemplateStorageUtility.deleteTestTemplate(this.id, localStorage);
    }
}