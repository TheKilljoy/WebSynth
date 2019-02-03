import Effect from "./Effect.js";

//tremolo effect
//uses an lfo connected to the gain of the sound
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Tremolo extends Effect{
    constructor(synthTremolo, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.lfo = audioContext.createOscillator();
        this.lfo.frequency.value = synthTremolo.synthKnobFrequency.value;
        this.lfo.type = synthTremolo.synthOsc.value;
        this.lfoRange = audioContext.createGain();
        this.lfoRange.gain.value = 1;
        this.lfo.connect(this.lfoRange);
        this.lfo.start();
    }

    apply(gainNode){
        this.lfoRange.connect(this.volumeNode.gain);
        return gainNode;
    }

    getType(type){
        return (type === "Tremolo")
    }
}