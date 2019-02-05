import Effect from "./Effect.js";
import SynthFilter from "../Components/SynthFilter.js";

export default class Filter extends Effect {

    constructor(synthFilter, volumeNode, audioContext) {
        super(volumeNode, audioContext)
        this.biquad = audioContext.createBiquadFilter()
        this.biquad.type = "lowpass"

        synthFilter.synthKnobCutoff.addEventListener('move', event => {
            this.biquad.frequency.setValueAtTime(event.data, audioContext.currentTime)
        });

        synthFilter.synthKnobQ.addEventListener('move', event => {
            this.biquad.Q.setValueAtTime(event.data, audioContext.currentTime)
        });
    }

    apply(gainNode) {
        this.volumeNode.connect(this.biquad);

        if(gainNode == null)
        {
            return this.biquad;
        }
        gainNode.connect(this.biquad);
        return this.biquad;
    }

    getType(type) {
        return (type === "Filter")
    }

}
