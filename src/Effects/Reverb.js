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
        this.reverbType = null
        this.convolver = audioContext.createConvolver();
        this.initReverb();

        synthReverb.addEventListener('select', event => {
            this.reverbType = ReverbType.type(event.data);
            this.initReverb();
        })
    }

    async initReverb(){
        if (this.reverbType != null) {
            this.convolver.buffer = await getImpulseBuffer(this.audioContext, this.reverbType);
        } else {
            this.convolver.buffer = null;
        }
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
