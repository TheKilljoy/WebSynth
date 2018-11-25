import MidiToFreq from "./MidiToFreq.js";

//SoundFragment class contains everything a oscillator needs to be configured
export default class Soundfragment {
    constructor(note, volume, type, audiocontext) {
        this.oscNode = audiocontext.createOscillator();
        this.note = note; //Important! this defines how much the note is under or above the node played!
        this.oscNode.type = type;
        this.volume = audiocontext.createGain();
        this.volume.gain.value = volume;
        this.oscNode.connect(this.volume);
    }
    //connects this volume node to another node (most probably the "Sound" volume node)
    //But can also be used for LFO effects
    connectSoundFragmentTo(connectTo) {
        this.volume.connect(connectTo);
    }

    start(){
        this.oscNode.start();
    }

    //
    setNote(note) {
        //Example: The user plays a midinote with value 72 and the note should be one octave higher, then "this.note" is 12.
        this.oscNode.frequency.value = MidiToFreq.convert(this.note + note);
    }
}