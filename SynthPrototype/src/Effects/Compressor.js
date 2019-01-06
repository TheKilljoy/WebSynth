import Effect from "./Effect.js";

export default class Compressor extends Effect{

    //threshold -100 to 0
    //knee 0 to 40
    //ratio 1 to 20
    constructor(threshold, knee, ratio, attack, release, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.compressor = audioContext.createDynamicsCompressor();
        this.compressor.threshold.value = threshold; //Is a k-rate AudioParam representing the decibel value above which the compression will start taking effect.
        this.compressor.knee.value = knee;           //Is a k-rate AudioParam containing a decibel value representing the range above the threshold where the curve smoothly transitions to the compressed portion.
        this.compressor.ratio.value = ratio;         //Is a k-rate AudioParam representing the amount of change, in dB, needed in the input for a 1 dB change in the output.
        this.compressor.attack.value = attack;       //Is a k-rate AudioParam representing the amount of time, in seconds, required to reduce the gain by 10 dB.
        this.compressor.release.value = release;     //Is a k-rate AudioParam representing the amount of time, in seconds, required to increase the gain by 10 dB.
    }

    apply(){
        this.volumeNode.connect(this.compressor);
        this.compressor.connect(this.audioContext.destination);
    }

    getType(type){
        return (type === "Tremolo")
    }
}