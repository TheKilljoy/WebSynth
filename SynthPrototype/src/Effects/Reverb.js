import Effect from "./Effect.js";

const getImpulseBuffer = (audioContext, impulseURL) => {
    return fetch(impulseURL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
}

export default class Reverb extends Effect{
    constructor(reverbType, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.reverbType = reverbType;
         this.convolver = audioContext.createConvolver();
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
