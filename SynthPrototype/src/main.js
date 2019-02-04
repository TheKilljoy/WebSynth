import InputEventHandler from "./Inputs/InputEventHandler.js";
import Voices from "./Sounds/Voices.js";
import SynthKnob from "./Components/SynthKnob.js"
import SynthModule from "./Components/SynthModule.js"
import SynthOsc from "./Components/SynthOsc.js"
import SynthOctave from "./Components/SynthOctave.js"
import SynthSound from "./Components/SynthSound.js"
import SynthFilter from "./Components/SynthFilter.js"
import SynthADSR from "./Components/SynthADSR.js"
import SynthDelay from "./Components/SynthDelay.js"
import SynthReverb from "./Components/SynthReverb.js"

var valueAnalyse;

//create an audio context (needs to be into an singleton later)
var ac = new AudioContext();
//creates a voices object
var voices = new Voices(ac);
//sets the master volume lower, because at 1.0 it is really loud
voices.setVolume(1.0);

setVoices(voices);

//create an InputEventHandler object
var inputEventHandler = new InputEventHandler();
//Register both, Keyboard and Midikeyboard events
inputEventHandler.registerKeyboardEvents();
inputEventHandler.registerMidiEvents();



//Register a function that is executed if a registered event (at the moment keyboard and midikeyboard events) is fired
//at buttonpress
inputEventHandler.addDownEventBehaviour(function (event) {
    voices.addVoice(event.velocity, event.note);
    spawnCircle();
});
//at buttonrelease
inputEventHandler.addUpEventBehaviour(function (event) {
    voices.removeVoice(event.note);
});



document.querySelector('#add-sound').onclick = function() {
    console.log("HELLO");
    document.body.append(new SynthSound())
}
