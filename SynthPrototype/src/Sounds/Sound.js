//Contains SoundFragments and a ADSR setting that make up that specific sound
export default class Sound {
    constructor(note, soundfragments, adsr, effectChain, audiocontext) {
        this.audiocontext = audiocontext;
        this.soundfragments = soundfragments;
        this.adsr = adsr;
        this.volume = audiocontext.createGain();
        this.volume.gain.value = 0;
        this.effectChain = effectChain
        for (let soundfragment of this.soundfragments) {
            soundfragment.connectSoundFragmentTo(this.volume);
        }
    }
    //each soundfragment needs to be started before it does anything! important to call
    start(){
        for (let soundfragment of this.soundfragments){
            soundfragment.start();
        }
    }

    //Makes a sound depending on the note and the velocity. Takes the ADSR settings into account
    onPress(note, velocity) {
        //Set the frequency of each soundfragment
        for (let soundfragment of this.soundfragments) {
            soundfragment.setNote(note);
        }
        var now = this.audiocontext.currentTime;
        //Do the Attack Delay Sustain stuff
        var volumeForPress = velocity/127;
        //Apply all effects on sound
        this.effectChain.applyEffects(this.audiocontext);
        this.volume.gain.cancelScheduledValues(0);
        this.volume.gain.setValueAtTime(0, now);
        this.volume.gain.linearRampToValueAtTime(volumeForPress, now + this.adsr.attack);
        this.volume.gain.linearRampToValueAtTime(this.adsr.sustain * volumeForPress, now + this.adsr.attack + this.adsr.delay);
    }
    //Stops the sound considering the ADSR settings
    onRelease() {
        var now = this.audiocontext.currentTime;
        //Do the Release stuff
       //this.effectChain.disableEffects();
        this.volume.gain.cancelScheduledValues(0);
        this.volume.gain.setValueAtTime(this.volume.gain.value, now);
        this.volume.gain.linearRampToValueAtTime(0, now + this.adsr.release);
        for (let soundfragment of this.soundfragments) {
            soundfragment.stop(this.adsr.release);
        }

    }
    //connects this this gain node to another node (probably the master volume of the voices node)
    //but can also be used for LFO effects
    connectSoundTo(connectTo) {
        this.volume.connect(connectTo);
    }
}
