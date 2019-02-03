import Effect from "./Effect.js";

//vibrato sound effect
//uses an lfo connected to the frequency of the oscillators
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Vibrato extends Effect{
    constructor(synthVibrato, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.lfo = audioContext.createOscillator();
        this.lfo.frequency.value = synthVibrato.synthKnobFrequency.value;
        this.lfo.type = synthVibrato.synthOsc.value;
        this.lfoRange = audioContext.createGain();
        this.lfoRange.gain.value = 1;
        this.lfo.connect(this.lfoRange);
        this.lfo.start();
        this.soundfragments = []
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