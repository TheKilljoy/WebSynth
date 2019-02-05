import Effect from "./Effect.js";

//vibrato sound effect
//uses an lfo connected to the frequency of the oscillators
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Vibrato extends Effect{

    constructor(synthTremolo, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.lfo = audioContext.createOscillator();
        this.lfoRange = audioContext.createGain();
        this.lfoRange.gain.value = 1;

        this.lfo.frequency.value = 0;
        this.lfo.type = synthTremolo.synthOsc.value;

        this.lfo.connect(this.lfoRange);
        this.lfo.start();

        synthTremolo.synthKnobFrequency.addEventListener('move', event => {
            this.lfo.frequency.value = event.data;
        });

        synthTremolo.synthOsc.addEventListener('select', event => {
            this.lfo.type = event.data;
        });
    }

    apply(gainNode){
        this.lfoRange.connect(this.volumeNode.gain);
        return gainNode;
    }

    getType(type){
        return (type === "Tremolo")
    }
}