import Effect from "./Effect.js";

//vibrato sound effect
//uses an lfo connected to the frequency of the oscillators
//has to parameters to change: frequency and range.
//range defines how "strong" the effect is and "frequency" how fast
export default class Vibrato extends Effect{
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
        this.soundfragments = []
    }

    apply(){
        this.soundfragments.forEach(soundFrgmnt => {
            soundFrgmnt.connectToOscillatorFrequency(this.lfoRange);
        });
    }

    getType(type){
        return (type === "Vibrato")
    }


    setSoundfragments(soundfragments){
        this.soundfragments = soundfragments;
    }
}