import {expect, test, vi,} from 'vitest'
import {spellingQuestion} from "../models/spelling/spellingQuestion.ts";
import {testUtilities} from "../classes/test-classes/test-util.ts";
import {mockSpeechSynthesisUtterance, textToSpeechUtil} from "../classes/text-to-speech-util.ts";

//mocks a window object that DOES NOT have the speechSynthesis functionality available
function setUpMockIncompatibleWindow() {
    vi.stubGlobal('window', {});
}

//mocks a window object that DOES have the speechSynthesis functionality available
function setupMockCompatibleBrowser() {
    //We have to mock the SpeechSynthesisUtterance object as well, Node does not know what it is and I cant find anything available
    vi.stubGlobal('SpeechSynthesisUtterance', mockSpeechSynthesisUtterance);

    vi.stubGlobal('window', {
        speechSynthesis: {
            speak: vi.fn(),
            cancel: vi.fn(),
            pause: vi.fn(),
            resume: vi.fn(),
            getVoices: vi.fn(() => []),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
            pending: false,
            speaking: false,
            paused: false
        }
    });
}

test('Can create a new spelling question', () => {
    let questionAnswer = testUtilities.createRandomText(5);
    let question = new spellingQuestion(questionAnswer, questionAnswer);

    expect(question).not.toBeNull();
    expect(question.key).toEqual(questionAnswer);
    expect(question.description).toEqual(questionAnswer);
})

test('Can handle when SpeechSynthesis is not available', () => {
    setUpMockIncompatibleWindow();
    const spy = vi.spyOn(console, 'error');
    textToSpeechUtil.speak(window, "This Should fail");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
})

test('Can speak words', () => {
    setupMockCompatibleBrowser();
    const spy = vi.spyOn(window.speechSynthesis, 'speak');
    textToSpeechUtil.speak(window, "test");
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    vi.resetAllMocks();
})