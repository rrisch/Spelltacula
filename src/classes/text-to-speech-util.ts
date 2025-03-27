export class mockSpeechSynthesisUtterance {
    textToSpeak:string="";
    constructor(text: string) {
      this.textToSpeak = text;
    }
}
export class textToSpeechUtil {

    public static speak(userWindow:Window,text:string):void{
        if ('speechSynthesis'  in userWindow) {
            let utterance = new SpeechSynthesisUtterance(text);
            let voice = window.speechSynthesis.getVoices();
            if (voice.length > 0){
                utterance.voice = window.speechSynthesis.getVoices()[0];
            }

            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            window.speechSynthesis.speak(utterance);
        }
        else{
            console.error('SpeechSynthesis isn\'t supported');
        }
    }
}