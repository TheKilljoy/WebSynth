import Effect from "./Effect.js";
import ReverbType from "./ReverbType.js";

const getImpulseBuffer = (audioContext, impulseURL) => {
    return fetch(impulseURL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
}

export default class ReverbAndDelay extends Effect{
    constructor(synthReverb, synthDelay, volumeNode, audioContext){
        super(volumeNode, audioContext);

        this.reverbType = null
        this.convolver = audioContext.createConvolver();
        this.initReverb();

        this.delay = audioContext.createDelay();
        this.delay.delayTime.value = 0.1;
        this.source = audioContext.createBufferSource();
        this.feedback = audioContext.createGain();
        this.feedback.gain.value = 0

        this.volume = audioContext.createGain();

        synthReverb.addEventListener('select', event => {
            this.reverbType = ReverbType.type(event.data);
            this.initReverb();
        })

        synthDelay.synthKnobTime.addEventListener('move', event => {
            this.delay.delayTime.value = event.data / 1000;
        });

        synthDelay.synthKnobDuration.addEventListener('move', event => {
            this.feedback.gain.value = event.data / 100;
            console.log(this.feedback.gain.value)
        });
    }

    apply(gainNode){
        this.delay.connect(this.feedback);
        this.feedback.connect(this.delay);

        if (this.reverbType == null) {
            this.volumeNode.connect(this.delay);

            if(gainNode == null)
            {
                return this.delay;
            }
            gainNode.connect(this.delay);
            return this.delay;
        } else {
            //feeding the feedbackloop with audio signal that has reverb already applied to it
            //apply reverb
            this.volumeNode.connect(this.convolver);
            this.convolver.connect(this.delay);

            this.convolver.connect(this.volume);
            this.delay.connect(this.volume);

            if(gainNode == null)
            {
                return this.volume;
            }
            gainNode.connect(this.volume);
            return this.volume;
        }
    }

    async initReverb(){
        if (this.reverbType != null) {
            this.convolver.buffer = await getImpulseBuffer(this.audioContext, this.reverbType);
        } else {
            this.convolver.buffer = null;
        }
    }

    getType(type){
        return (type === "ReverbAndDelay")
    }

    setDelayDuration(delayDuration){
        if(delayDuration > 1){
            delayDuration = 1.0;
        }
        this.feedback.gain.value = delayDuration;
    }

    setDelayTime(delayTime){
        this.delay.delayTime.value = delayTime;
    }
}
