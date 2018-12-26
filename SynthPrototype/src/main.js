import InputEventHandler from "./Inputs/InputEventHandler.js";
import Voices from "./Sounds/Voices.js";
import SynthKnob from "./Components/SynthKnob.js"
import SynthModule from "./Components/SynthModule.js"
import SynthOsc from "./Components/SynthOsc.js"
import SynthOctave from "./Components/SynthOctave.js"

//create an audio context (needs to be into an singleton later)
var ac = new AudioContext();
//creates a voices object
var voices = new Voices(ac);
//sets the master volume lower, because at 1.0 it is really loud
voices.setVolume(0.2);

//create an InputEventHandler object
var inputEventHandler = new InputEventHandler();
//Register both, Keyboard and Midikeyboard events
inputEventHandler.registerKeyboardEvents();
inputEventHandler.registerMidiEvents();

//Register a function that is executed if a registered event (at the moment keyboard and midikeyboard events) is fired
//at buttonpress
inputEventHandler.addDownEventBehaviour(function (event) {
    voices.addVoice(event.velocity, event.note);
});
//at buttonrelease
inputEventHandler.addUpEventBehaviour(function (event) {
    voices.removeVoice(event.note);
});
