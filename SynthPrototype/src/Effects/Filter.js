import Effect from "./Effect.js";
import SynthFilter from "../Components/SynthFilter.js";

export default class Filter extends Effect {

    constructor(synthFilter, volumeNode, audioContext) {
        super(volumeNode, audioContext)

        this.volumeNode = volumeNode
        this.biquad = audioContext.createBiquadFilter()
        this.biquad.type = "lowpass"

        this.cutoffFrequency = synthFilter.synthKnobCutoff.value * 200

        this.biquad.frequency.value = 0
        this.biquad.frequency.setValueAtTime(0, audioContext.currentTime)

        synthFilter.synthKnobCutoff.addEventListener('move', () => {
            this.cutoffFrequency = synthFilter.synthKnobCutoff.value * 200
            this.biquad.frequency.setValueAtTime(this.cutoffFrequency, audioContext.currentTime)
        });
    }

    apply(gainNode) {
        if(gainNode == null)
        {
            return this.biquad;
        }
        gainNode.connect(this.biquad);
        return this.biquad
    }

    getType(type) {
        return (type === "Filter")
    }

}
