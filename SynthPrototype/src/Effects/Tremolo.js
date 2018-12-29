import Effect from "./Effect.js";

//tremolo effect
//uses an lfo connected to the gain of the sound
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Tremolo extends Effect{
    constructor(frequency, range, waveType, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.frequency = frequency;
        this.range = range;
        this.waveType = waveType;
        this.lfo = audioContext.createOscillator();
        this.lfo.frequency.value = frequency;
        this.lfo.type = waveType;
        this.lfoRange = audioContext.createGain();
        this.lfoRange.gain.value = range;
        this.lfo.connect(this.lfoRange);
        this.lfo.start();
    }

    apply(){
        this.lfoRange.connect(this.volumeNode.gain);
    }

    getType(type){
        return (type === "Tremolo")
    }
}