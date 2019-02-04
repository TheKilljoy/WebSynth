import Effect from "./Effect.js";
import SynthFilter from "../Components/SynthFilter.js";

export default class Filter extends Effect {

    constructor(synthFilter, volumeNode, audioContext) {
        super(volumeNode, audioContext)
        this.cutoffFrequency = synthFilter.synthKnobCutoff.value * 200
        // console.log(this.cutoffFrequency);
        this.volumeNode = volumeNode
        this.biquad = audioContext.createBiquadFilter()
        this.biquad.type = "lowshelf"
        this.biquad.frequency.value = 0
        this.biquad.frequency.setValueAtTime(0, audioContext.currentTime)
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
