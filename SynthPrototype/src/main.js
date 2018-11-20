import MidiToFreq from "./MidiToFreq.js";
import InputEventHandler from "./Inputs/InputEventHandler.js";


class SoundSetting {
    constructor() {
        this.oscillators = [];
        this.waveTypes = [];

    }
}

class Sound {
    constructor(oscillators, waveTypes) {
        this.oscillators = oscillators;
        var counter = 0;
        if (oscillators.length === waveTypes.length) {
            for (let oscillator of this.oscillators) {
                oscillator.type = waveTypes[counter++];
                oscillator.frequency.value = 0;
                oscillator.connect(ac.destination);
                oscillator.start();
            }
        }
    }

    remove() {
        for (let oscillator of this.oscillators) {
            oscillator.stop();
        }
    }

    setFrequency(freqVal) {
        for (let osc of this.oscillators) {
            osc.frequency.value = freqVal;
        }
    }

    setFrequencyAt(index, freqVal) {
        this.oscillators[index].frequency.value = freqVal;
    }

    setFrequencies(freqVals) {
        for (let i = 0; i < freqVals.length; ++i) {
            this.oscillators[i].frequency.value = freqVals[i];
        }
    }

    setVolumes(volumes) {
        for (let i = 0; i < volumes.length; ++i) {
            this.oscillators[i].velocity.value = volumes[i];
        }
    }
}

class Voices {
    constructor() {
        this.dictionary = {};
    }

    addVoice(velocity, midiVal) {
        if (typeof this.dictionary[midiVal] == 'undefined') {
            var s = new Sound(
                [ac.createOscillator(), ac.createOscillator(), ac.createOscillator(), ac.createOscillator()],
                ["sawtooth", "sine", "square", "triangle"]
            );
            s.setFrequencies([
                MidiToFreq.convert(midiVal),
                MidiToFreq.convert(midiVal + 12),
                MidiToFreq.convert(midiVal - 12),
                MidiToFreq.convert(midiVal + 24)
            ]);
            this.dictionary[midiVal] = s;

        }

    }

    removeVoice(midiVal) {
        if (typeof this.dictionary[midiVal] != 'undefined') {
            this.dictionary[midiVal].remove();
            delete this.dictionary[midiVal];
        }
    }


}


var ac = new AudioContext();
var voices = new Voices();
//var midi = new MidiKeyboardInput();

var inputEventHandler = new InputEventHandler();


inputEventHandler.registerKeyboardEvents();
inputEventHandler.registerMidiEvents();

inputEventHandler.addDownEventBehaviour(function (event) {
    console.log("v:"+ event.velocity+" n:"+event.note)
    voices.addVoice(event.velocity, event.note);
});
inputEventHandler.addUpEventBehaviour(function (event) {
    voices.removeVoice(event.note);
});