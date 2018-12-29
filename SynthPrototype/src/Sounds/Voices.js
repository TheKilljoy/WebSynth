import Soundfragment from "./Soundfragment.js";
import Sound from "./Sound.js";
import ADSR from "./ADSR.js";

import EffectChain from "../Effects/EffectChain.js";
import Delay from "../Effects/Delay.js";
import Tremolo from "../Effects/Tremolo.js";
import Vibrato from "../Effects/Vibrato.js";

//this class contains several sounds (each key you press represents a specific sound with a specific note)
//and checks if that note is already played. if it is played it does nothing, if it isn't played yet it adds it
//to an dictioniary so it can later be removed again, when the key is released
export default class Voices {
    constructor(audiocontext) {
        this.audiocontext = audiocontext;
        this.dictionary = {};
        this.masterVolume = audiocontext.createGain();
        this.masterVolume.connect(audiocontext.destination);
        this.soundfragments = [];
        
        //create the effect chain once inside the voices class (later needs to be created by the website)
        this.effectChain = new EffectChain([
            new Delay(1, 0.2, this.masterVolume, this.audiocontext),
            new Vibrato(5, 100, "sine", this.masterVolume, this.audiocontext),
            new Tremolo(2, 1, "sine", this.masterVolume, this.audiocontext)
        ]);

        //example for deactivating an effect
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Delay"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Vibrato"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Tremolo"));
    }



    //change the master volume
    setVolume(volume){
        this.masterVolume.gain.value = volume;
    }

    //adds a sound if it isn't pressed yet. if it is already added then it does nothing
    addVoice(velocity, note) {
        if (typeof this.dictionary[note] == 'undefined') {
            ///////////////////this area is later extracted from the website /////////////////////
            var soundFrgmnt = new Soundfragment(
                document.querySelectorAll('synth-sound')[0],
                this.audiocontext
            );

            var soundFrgmnt2 = new Soundfragment(
                document.querySelectorAll('synth-sound')[1],
                this.audiocontext
            );

            var soundFrgmnt3 = new Soundfragment(
                document.querySelectorAll('synth-sound')[2],
                this.audiocontext
            );

            this.soundfragments = [soundFrgmnt, soundFrgmnt2, soundFrgmnt3];
            var adsr = new ADSR(0.1, 0.5, 1, 0.01);
            //////////////////////////////////////////////////////////////////////////////////////
            //the vibrato effect needs the frequency of the oscillatorNode of the soundfragments
            //therefore after we created the soundfragments we need to give the effect those soundfragments
            this.effectChain.getEffectByType("Vibrato").setSoundfragments(this.soundfragments);

            var s = new Sound(note, this.soundfragments, adsr, this.effectChain, this.audiocontext);
            this.dictionary[note] = s;
            s.connectSoundTo(this.masterVolume);
            s.start(); //needs to be called before anything happens! see "sound.js"
            s.onPress(note, velocity);
            //apply all effects on the sound
            //this.effectChain.applyEffects();
        }

    }
    //removes a sound if it isn't played anymore
    removeVoice(note) {
        if (typeof this.dictionary[note] != 'undefined') {
            this.dictionary[note].onRelease();
            delete this.dictionary[note];
        }
    }
}
