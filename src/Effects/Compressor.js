import Effect from "./Effect.js";

export default class Compressor extends Effect{

    //threshold -100 to 0
    //knee 0 to 40
    //ratio 1 to 20
    constructor(synthCompressor, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.compressor = audioContext.createDynamicsCompressor();
        this.compressor.threshold.value = 0; //Is a k-rate AudioParam representing the decibel value above which the compression will start taking effect.
        this.compressor.knee.value = 0;           //Is a k-rate AudioParam containing a decibel value representing the range above the threshold where the curve smoothly transitions to the compressed portion.
        this.compressor.ratio.value = 1;         //Is a k-rate AudioParam representing the amount of change, in dB, needed in the input for a 1 dB change in the output.
        this.compressor.attack.value = 0;       //Is a k-rate AudioParam representing the amount of time, in seconds, required to reduce the gain by 10 dB.
        this.compressor.release.value = 0;      //Is a k-rate AudioParam representing the amount of time, in seconds, required to increase the gain by 10 dB.

        synthCompressor.synthKnobThreshold.addEventListener('move', event => {
            this.compressor.threshold.value = event.data
        })

        synthCompressor.synthKnobKnee.addEventListener('move', event => {
            this.compressor.knee.value = event.data
        })

        synthCompressor.synthKnobRatio.addEventListener('move', event => {
            this.compressor.ratio.value = event.data
        })

        synthCompressor.synthKnobAttack.addEventListener('move', event => {
            this.compressor.attack.value = event.data / 1000
        })

        synthCompressor.synthKnobRelease.addEventListener('move', event => {
            this.compressor.release.value = event.data / 1000
            console.log(this.compressor.reduction)
        })
    }

    apply(gainNode){
        this.volumeNode.connect(this.compressor);

        if(gainNode == null)
        {
            return this.volumeNode;
        }
        gainNode.connect(this.compressor);
        return this.compressor;
    }

    getType(type){
        return (type === "Compressor")
    }
}