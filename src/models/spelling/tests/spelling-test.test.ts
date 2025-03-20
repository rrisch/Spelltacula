import {expect, test} from 'vitest'
import {spellingQuestion} from "../spellingQuestion.ts";
import {testUtilities} from "../../../classes/test-util.ts";
import {spellingTest} from "../spelling-test.ts";
import {spellingTestUtilities} from "./spelling-test-utilities.cs.ts";

test('Can create a new spelling test', () => {
    let sut = new spellingTest(testUtilities.generateUUID());

    expect(sut).not.toBeNull();
    expect(sut.id).not.toEqual("");
    expect(sut.testItems.length).toEqual(0);
})

test('Can populate a spelling test', () => {
    let sut = new spellingTest(testUtilities.generateUUID());
    let questions: spellingQuestion[] = [];

    for (let i = 0; i < 5; i++) {
        questions.push(new spellingQuestion(testUtilities.createRandomText(5), ""));
    }

    if (sut.populateTest(questions)) {
        expect(sut.testItems.length).equal(questions.length);
    }
})

test('Can start and stop the test', () => {
    let sut = spellingTestUtilities.generateSpellingTest(10);
    let startDate;
    let endDate;

    sut.startTest();
    startDate = sut.startDate;
    console.log(startDate);

    for (let i = 0; i < 105; i++) {
    }

    sut.endTest();
    endDate = sut.endDate;
    console.log(endDate);
    expect(startDate).not.toEqual(endDate);


})

test('Can get the next question', () => {
    let sut = spellingTestUtilities.generateSpellingTest(10);

    expect(sut.testItems.length).toBe(10);

    let nextQuestion = sut.getNextQuestion();
    expect(nextQuestion).not.toBeNull();
})

test('Can Gracefully handles when there are no more questions', () => {
    let sut = spellingTestUtilities.generateSpellingTest(10);
    let nextQuestion;
    for (let i = 0; i < sut.testItems.length - 1; i++) {
        nextQuestion = sut.getNextQuestion();

        if (i == sut.testItems.length - 1) {
            expect(nextQuestion.question.description).toBeNull();
        } else {
            expect(nextQuestion.question.description).not.toBeNull();
        }
    }
})

test('Can correctly grade tests', () => {
    let perfectTestAnswers = {
        questions: ['Cat', 'Dog', 'Apple', 'Orange'],
        answers: ['Cat', 'Dog', 'Apple', 'Orange']
    };
    let decentTestAnswers = {
        questions: ['Cat', 'Dog', 'Apple', 'Orange'],
        answers: ['Cat', 'Dog', 'Apple', 'Oranje']
    }
    let barelyTestAnswers = {
        questions: ['Cat', 'Dog', 'Apple', 'Orange'],
        answers: ['Cat', 'Dog', 'Appel', 'OranJe'],
    }
    let failTestAnswers = {
        questions: ['Cat', 'Dog', 'Apple', 'Orange'],
        answers: ['Cat', 'Doge', 'Appel', 'Oranje']
    }

    //trump test
    let sut = spellingTestUtilities.createDefinedSpellingTest(perfectTestAnswers.questions, perfectTestAnswers.answers);
    expect(sut.gradeTest()).toEqual(100);

    let sut2 = spellingTestUtilities.createDefinedSpellingTest(decentTestAnswers.questions, decentTestAnswers.answers);
    expect(sut2.gradeTest()).toEqual(75);

    let sut3 = spellingTestUtilities.createDefinedSpellingTest(barelyTestAnswers.questions, barelyTestAnswers.answers);
    expect(sut3.gradeTest()).toEqual(50);

    let sut4 = spellingTestUtilities.createDefinedSpellingTest(failTestAnswers.questions, failTestAnswers.answers);
    expect(sut4.gradeTest()).toEqual(25);

})