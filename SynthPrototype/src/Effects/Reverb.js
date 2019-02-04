import Effect from "./Effect.js";
import ReverbType from "./ReverbType.js";

const getImpulseBuffer = (audioContext, impulseURL) => {
    return fetch(impulseURL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
}

export default class Reverb extends Effect{
    constructor(synthReverb, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.reverbType =  ReverbType.type(synthReverb.value);
        this.convolver = audioContext.createConvolver();
        //console.log(this.reverbType)
        this.initReverb();

    }

    async initReverb(){
        this.convolver.buffer = await getImpulseBuffer(this.audioContext, this.reverbType);
    }

    apply(gainNode){
        this.volumeNode.connect(this.convolver);

        if(gainNode == null)
        {
            return this.convolver;
        }
        gainNode.connect(this.convolver);
        return this.convolver;

    }

    getType(type){
        return (type === "Reverb")
    }

}
