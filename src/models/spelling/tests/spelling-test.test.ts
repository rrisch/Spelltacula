import {expect, test} from 'vitest'
import {spellingQuestion} from "../spellingQuestion.ts";
import {testUtilities} from "../../../classes/test-util.ts";
import {spellingAnswer} from "../spellingAnswer.ts";
import {spellingTest} from "../spelling-test.ts";

test('Can create a new spelling test', () => {
    let sut = new spellingTest(testUtilities.generateUUID());

    expect(sut).not.toBeNull();
    expect(sut.id).not.toEqual("");

})