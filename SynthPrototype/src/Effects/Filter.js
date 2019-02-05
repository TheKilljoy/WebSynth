import Effect from "./Effect.js";
import SynthFilter from "../Components/SynthFilter.js";

export default class Filter extends Effect {

    constructor(synthFilter, volumeNode, audioContext) {
        super(volumeNode, audioContext)
        this.volumeNode = volumeNode
        this.biquad = audioContext.createBiquadFilter()
        this.biquad.type = "highpass"

        this.cutoffFrequency = synthFilter.synthKnobCutoff.value * 200

        this.biquad.frequency.value = 0
        this.biquad.frequency.setValueAtTime(0, audioContext.currentTime)

        synthFilter.synthKnobCutoff.addEventListener('move', event => {
            this.cutoffFrequency = event.data
            //this.biquad.frequency.value = event.data
            this.biquad.frequency.setValueAtTime(this.cutoffFrequency, audioContext.currentTime)
            console.log(event.data)
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
