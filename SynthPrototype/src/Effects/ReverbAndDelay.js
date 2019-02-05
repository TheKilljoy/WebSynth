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

        this.reverbType = ReverbType.type(synthReverb.value);
        this.convolver = audioContext.createConvolver();
        this.initReverb();

        this.delay = audioContext.createDelay();
        this.delay.delayTime.value = 0; // the time in seconds after which the first delay starts
        this.source = audioContext.createBufferSource();
        this.feedback = audioContext.createGain();

        this.delayDuration = 0
        this.feedback.gain.value = this.delayDuration; // 0 = no feedback, 1 = repeating "forever"

        this.volume = audioContext.createGain();

        // ADDED

        synthReverb.addEventListener('select', event => {
            this.reverbType = ReverbType.type(event.data);
            this.initReverb();
        })

        synthDelay.synthKnobTime.addEventListener('move', event => {
            this.delay.delayTime.value = event.data;
        });

        synthDelay.synthKnobDuration.addEventListener('move', event => {
            this.delayDuration = event.data / 100;
            this.feedback.gain.value = this.delayDuration;
        });
    }
    apply(gainNode){
        //feedback loop
        this.delay.connect(this.feedback);
        this.feedback.connect(this.delay);
        //feeding the feedbackloop with audio signal that has reverb already applied to it
        //apply reverb
        this.volumeNode.connect(this.convolver);
        this.convolver.connect(this.delay);
        //connect everything to destination

        // this.convolver.connect(this.audioContext.destination);
        // this.delay.connect(this.audioContext.destination);

        this.convolver.connect(this.volume);
        this.delay.connect(this.volume);

        if(gainNode == null)
        {
            return this.volume;
        }
        gainNode.connect(this.volume);
        return this.volume;
    }

    async initReverb(){
        this.convolver.buffer = await getImpulseBuffer(this.audioContext, this.reverbType);
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
