const sentences = "Ladies and gentlemen, this is a test of the evacuation system; you do not need to leave the building.";
const utter = new SpeechSynthesisUtterance(sentences);
let lastCharIndex = 0;
const onSpeechEvent = (event) => {
    console.log(`${event.name || "start/stop"}: ${sentences.substring(lastCharIndex, event.charIndex)} (${event.elapsedTime}ms)`);
    lastCharIndex = event.charIndex;
};
utter.onboundary = onSpeechEvent;
utter.onend = onSpeechEvent;
utter.onstart = onSpeechEvent;
window.speechSynthesis.speak(utter);
