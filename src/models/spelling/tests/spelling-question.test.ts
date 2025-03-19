import {expect, test} from 'vitest'
import {spellingQuestion} from "../spellingQuestion.ts";
import {testUtilities} from "../../../classes/test-util.ts";

test('Can create a new spelling question', () => {
    let questionAnswer = testUtilities.createRandomText(5);
    let question = new spellingQuestion(questionAnswer, questionAnswer);

    expect(question).not.toBeNull();
    expect(question.key).toEqual(questionAnswer);
    expect(question.description).toEqual(questionAnswer);
})