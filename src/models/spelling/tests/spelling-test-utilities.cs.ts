import {testUtilities} from "../../../classes/test-util.ts";
import {spellingQuestion} from "../spellingQuestion.ts";
import {spellingAnswer} from "../spellingAnswer.ts";

export class spellingTestUtilities {
    public static createSpellingQuestion(question?: string): spellingQuestion {
        let testQuestionText = question ? question : testUtilities.createRandomText(5);

        return new spellingQuestion(testQuestionText, testQuestionText);
    }

    public static createSpellingAnswer(question?: spellingQuestion): spellingAnswer {
        let testQuestion = question ? question : this.createSpellingQuestion();

        return new spellingAnswer(testQuestion);
    }
}