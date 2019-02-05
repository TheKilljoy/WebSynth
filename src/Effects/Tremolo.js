import Effect from "./Effect.js";

//tremolo effect
//uses an lfo connected to the gain of the sound
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Tremolo extends Effect{
    constructor(synthVibrato, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.lfo = audioContext.createOscillator();
        this.lfo.frequency.value = 0;
        this.lfo.type = synthVibrato.synthOsc.value;
        this.lfoRange = audioContext.createGain();
        this.lfoRange.gain.value = 1;
        this.lfo.connect(this.lfoRange);
        this.lfo.start();
        this.soundfragments = []

        synthVibrato.synthKnobFrequency.addEventListener('move', event => {
            this.lfo.frequency.value = event.data;
        });

        synthVibrato.synthKnobStrength.addEventListener('move', event => {
            this.lfoRange.gain.value = event.data / 100;
        });

        synthVibrato.synthOsc.addEventListener('select', event => {
            this.lfo.type = event.data;
        });
    }

    apply(gainNode){
        this.soundfragments.forEach(soundFrgmnt => {
            soundFrgmnt.connectToOscillatorFrequency(this.lfoRange);
        });
        return gainNode;
    }

    getType(type){
        return (type === "Vibrato")
    }


    setSoundfragments(soundfragments){
        this.soundfragments = soundfragments;
    }
}