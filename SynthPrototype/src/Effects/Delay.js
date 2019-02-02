import Effect from "./Effect.js";

//Delay class delays a incoming sound. 
//The delay starts after x seconds (delayTime) and repeats while getting quiter over time (delayDuration)
//So the delay class has two properties DelayTime in seconds and DelayDuration between 0 and 1
export default class Delay extends Effect{
    constructor(delayTime, delayDuration, volumeNode, audioContext){
        super(volumeNode, audioContext);
        this.delay = audioContext.createDelay();
        this.delay.delayTime.value = delayTime; // the time in seconds after which the first delay starts
        this.source = audioContext.createBufferSource();
        this.feedback = audioContext.createGain();
        if(delayDuration > 1){
            delayDuration = 1.0;
        }
        this.feedback.gain.value = delayDuration; // 0 = no feedback, 1 = repeating "forever"
    }
    apply(gainNode){
        this.delay.connect(this.feedback);
        this.feedback.connect(this.delay);
        this.volumeNode.connect(this.delay);

        if(gainNode == null)
        {
            return this.delay;
        }
        gainNode.connect(this.delay);
        return this.delay;
    }
    
    getType(type){
        return (type === "Delay")
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