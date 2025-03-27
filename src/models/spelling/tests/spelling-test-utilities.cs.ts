import {testUtilities} from "../../../classes/test-classes/test-util.ts";
import {spellingQuestion} from "../spellingQuestion.ts";
import {spellingAnswer} from "../spellingAnswer.ts";
import {spellingTest} from "../spelling-test.ts";
import {classHelpers} from "../../../classes/class-helper.ts";

export class spellingTestUtilities {
    public static createSpellingQuestion(question?: string): spellingQuestion {
        let testQuestionText = question ? question : testUtilities.createRandomText(5);

        return new spellingQuestion(testQuestionText, testQuestionText);
    }

    public static createSpellingAnswer(question?: spellingQuestion): spellingAnswer {
        let testQuestion = question ? question : this.createSpellingQuestion();

        return new spellingAnswer(testQuestion);
    }

    public static createDefinedSpellingTest(questions: string[], answers: string[]): spellingTest {
        let test: spellingTest = new spellingTest(classHelpers.generateUUID());

        if (questions == null) throw new RangeError("No questions specified");
        if (answers == null || answers.length != questions.length) throw new RangeError("No answers specified or number of answers do not match number of questions");

        for (let i = 0; i < questions.length; i++) {
            let answer: spellingAnswer = new spellingAnswer(new spellingQuestion(questions[i], questions[i]));
            answer.answer = answers[i];
            test.testItems.push(answer);
        }

        return test;
    }

    public static generateSpellingTest(numberOfQuestions?: number): spellingTest {
        let test: spellingTest = new spellingTest(classHelpers.generateUUID());

        for (let i = 0; i < (numberOfQuestions ? numberOfQuestions : 5); i++) {
            test.testItems.push(new spellingAnswer(new spellingQuestion(testUtilities.createRandomText(5), "")));
        }

        return test;
    }
}