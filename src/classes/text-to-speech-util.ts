export class textToSpeechUtil {

    public static speak(userWindow:Window,text:string):void{
        if ('speechSynthesis'  in userWindow) {
            let utterance = new SpeechSynthesisUtterance(text);

            utterance.voice = window.speechSynthesis.getVoices()[0];
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            window.speechSynthesis.speak(utterance);
        }
        else{
            console.log('SpeechSynthesis isn\'t supported');
        }
    }
}