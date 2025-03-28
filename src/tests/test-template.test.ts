import {expect, test} from 'vitest'
import testTemplate from "../models/templates/test-template.ts";
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";
import {TestTemplateStorageUtility} from "../classes/test-template-storage-provider.ts";


test('Can create a new Test Template', () => {
    let sut = new testTemplate("Test Template", "Test Description");

    expect(sut).not.toBeNull();
    expect(sut.id.length).toBeGreaterThan(0);
    expect(sut.title).toEqual("Test Template");
    expect(sut.description).toEqual("Test Description");
    expect(sut.isCaseSensitive).toBeFalsy();
    expect(sut.questions.length).toEqual(0);

    //add the optional params
    sut.isCaseSensitive = true;
    for (let i = 0; i < 3; i++) {
        sut.questions.push(
            new spellingQuestion(`Answer ${i}`, `Description ${i}`)
        )
    }

    expect(sut.isCaseSensitive).toBeTruthy();
    expect(sut.questions.length).not.toEqual(0);
})

test('Can validate a test template', () => {
    let sut = new testTemplate("", "");
    expect(sut.isValid()).toBeFalsy();

    //add title
    sut.title = "Test Template";
    expect(sut.isValid()).toBeFalsy();

    //add Description
    sut.description = "Test Description";
    expect(sut.isValid()).toBeTruthy();
})

test('Can insert a new template', () => {
    let sut = new testTemplate("Test Template", "Test Description", true);

    for (let i = 0; i < 3; i++) {
        sut.questions.push(new spellingQuestion("Test Template", "Test Description"));
    }

    expect(sut.save()).toBeTruthy();

    let result = TestTemplateStorageUtility.findTestTemplate(sut.id, localStorage);
    expect(result).not.toBeUndefined();
    expect(result?.id).toEqual(sut.id);
    expect(result?.description).toEqual(sut.description);
    expect(result?.isCaseSensitive).toEqual(sut.isCaseSensitive);
    expect(result?.questions).toEqual(sut.questions);
});

test('Can update an existing Template', () => {
    let sut = new testTemplate("Test Template", "Test Description", true);

    for (let i = 0; i < 3; i++) {
        sut.questions.push(new spellingQuestion("Test Template", "Test Description"));
    }

    sut.save();
    sut.title = "Updated Title";
    sut.description = "Updated Description";
    sut.isCaseSensitive = false;
    sut.questions.push(new spellingQuestion("Test Template", "Test Description"))
    sut.save();

    let result = TestTemplateStorageUtility.findTestTemplate(sut.id, localStorage);

    expect(result).not.toBeUndefined();
    expect(result?.id).toEqual(sut.id);
    expect(result?.description).toEqual("Updated Description");
    expect(result?.isCaseSensitive).toEqual(false);
    expect(result?.questions).toEqual(sut.questions);

})

test('Can delete an template', () => {
    let sut = new testTemplate("Test Template", "Test Description");

    expect(sut.save()).toBeTruthy;

    expect(sut.delete()).toBeTruthy();
})