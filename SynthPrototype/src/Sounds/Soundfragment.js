import MidiToFreq from "./MidiToFreq.js";

//SoundFragment class contains everything a oscillator needs to be configured
export default class Soundfragment {
    constructor(octave, osc, pitch, audiocontext, levelKnob) {
        this.oscNode = audiocontext.createOscillator();
        this.note = octave.value * 12; //Important! this defines how much the note is under or above the node played!
        this.oscNode.type = osc.value;
        this.volume = audiocontext.createGain();
        this.volume.gain.value = parseFloat(levelKnob.value / 100)
        this.oscNode.frequency.value *= parseFloat(Math.pow(pitch.value, 1/12))
        this.pitch = pitch
        this.oscNode.connect(this.volume);
        //pitch.addEventListener('move', (event) => { this.oscNode.frequency.value *= Math.pow(event.data, 1/12); console.log(this.oscNode.frequency.value) })
        levelKnob.addEventListener('move', (event) => { this.volume.gain.value = event.data / 100 })
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
        this.oscNode.frequency.value = MidiToFreq.convert(this.note + note) * parseFloat(Math.pow(this.pitch.value, 1/12));
    }
}
