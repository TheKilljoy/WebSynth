import MidiToFreq from "./MidiToFreq.js";

//SoundFragment class contains everything a oscillator needs to be configured
export default class Soundfragment {
    constructor(synthSound, audiocontext) {
        this.audiocontext = audiocontext;
        this.oscNode = audiocontext.createOscillator();
        this.note = synthSound.synthOctave.value * 12; //Important! this defines how much the note is under or above the node played!
        this.oscNode.type = synthSound.synthOsc.value;
        this.volume = audiocontext.createGain();
        this.volume.gain.value = parseFloat(Math.pow(10, synthSound.synthKnobLevel.value / 20) / 100000)
        this.pitch = synthSound.synthKnobPitch.value
        this.oscNode.connect(this.volume);
    }
    //connects this volume node to another node (most probably the "Sound" volume node)
    //But can also be used for LFO effects
    connectSoundFragmentTo(connectTo) {
        this.volume.connect(connectTo);
    }

    //connect a node to the frequency of this oscillator
    connectToOscillatorFrequency(connector){
        connector.connect(this.oscNode.frequency);
    }

    //connect a node to the frequency of this oscillator
    connectToOscillatorGain(connector){
        connector.connect(this.volume.gain);
    }

    stop(time){
        this.oscNode.stop(this.audiocontext.currentTime + time);
    }

    start(){
        this.oscNode.start();
    }

    //
    setNote(note) {
        //Example: The user plays a midinote with value 72 and the note should be one octave higher, then "this.note" is 12.
        this.oscNode.frequency.value = MidiToFreq.convert(this.note + note) * Math.pow(1.0594630943592952645618252949463, this.pitch);
   }

    setFrequency(frequency){
        this.oscNode.frequency.value = frequency;
    }
}
