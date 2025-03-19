import {expect, test} from 'vitest'
import {spellingAnswer} from "../spellingAnswer";
import {testUtilities} from "../../../classes/test-util.ts";
import {spellingQuestion} from "../spellingQuestion.ts";
import {spellingTestUtilities} from "./spelling-test-utilities.cs.ts";

test('Can create a new spelling answer', () => {
    let testAnswer = spellingTestUtilities.createSpellingAnswer();

    expect(testAnswer).not.toBeNull();
    expect(testAnswer.question.key.length).toBeGreaterThan(0);
})

test('Can set the answer to the question', () => {
    let testAnswer = spellingTestUtilities.createSpellingAnswer();
    let testAnswerText = "Right Answer";

    testAnswer.setAnswer(testAnswerText);
    expect(testAnswer.answer).toEqual(testAnswerText);

    let newTestAnswerText = testUtilities.createRandomText(4);
    testAnswer.setAnswer(newTestAnswerText);
    expect(testAnswer.answer).toEqual(newTestAnswerText);
})

test('Correctly evaluates the answer to be correct', () => {
    let testAnswer = spellingTestUtilities.createSpellingAnswer();
    let testAnswerText = "Right Answer";
    let newTestQuestion = spellingTestUtilities.createSpellingQuestion("thunderdome");
    let newTestAnswer = spellingTestUtilities.createSpellingAnswer(newTestQuestion);


    //outright wrong
    testAnswer.setAnswer(testAnswerText);
    expect(testAnswer.isCorrect()).toBeFalsy();

    //wrong due to case
    testAnswer.setAnswer(testAnswer.answer.toUpperCase());
    expect(testAnswer.isCorrect(true)).toBeFalsy();

    //correct, mismatched case
    newTestAnswer.setAnswer(newTestQuestion.key.toUpperCase());
    expect(newTestAnswer.isCorrect()).toBeTruthy();

    //correct, enforce case
    newTestAnswer.setAnswer(newTestQuestion.key.toLowerCase());
    expect(newTestAnswer.isCorrect(true)).toBeTruthy();
})