import Soundfragment from "./Soundfragment.js";
import Sound from "./Sound.js";
import ADSR from "./ADSR.js";

import EffectChain from "../Effects/EffectChain.js";
import Delay from "../Effects/Delay.js";
import Tremolo from "../Effects/Tremolo.js";
import Vibrato from "../Effects/Vibrato.js";
import Compressor from "../Effects/Compressor.js";
import Reverb from "../Effects/Reverb.js";
import ReverbType from "../Effects/ReverbType.js";
import ReverbAndDelay from "../Effects/ReverbAndDelay.js";
import Filter from "../Effects/Filter.js";

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

        //PRECOMPRESSION!!!!
        //prevents oscillators from adding up and clipping when many keys are pressed
        //needs to be configurable!
        this.precompressor = audiocontext.createDynamicsCompressor();
        this.precompressor.threshold.value = -50; //Is a k-rate AudioParam representing the decibel value above which the compression will start taking effect.
        this.precompressor.knee.value = 20;           //Is a k-rate AudioParam containing a decibel value representing the range above the threshold where the curve smoothly transitions to the compressed portion.
        this.precompressor.ratio.value = 2;         //Is a k-rate AudioParam representing the amount of change, in dB, needed in the input for a 1 dB change in the output.
        this.precompressor.attack.value = 0;       //Is a k-rate AudioParam representing the amount of time, in seconds, required to reduce the gain by 10 dB.
        this.precompressor.release.value = 0.25;     //Is a k-rate AudioParam representing the amount of time, in seconds, required to increase the gain by 10 dB.
        this.masterVolume.connect(this.precompressor);
        this.precompressor.connect(audiocontext.destination);

        this.synthFilter = document.querySelector('synth-filter')
        this.synthDelay = document.querySelector('synth-delay')
        this.synthReverb = document.querySelector('synth-reverb')
        this.synthTremolo = document.querySelector('synth-tremolo')
        this.synthVibrato = document.querySelector('synth-vibrato')

        //create the effect chain once inside the voices class (later needs to be created by the website)
        this.effectChain = new EffectChain([
            new Filter(this.synthFilter, this.masterVolume, this.audiocontext),
            new Reverb(this.synthReverb, this.masterVolume, this.audiocontext),
            new Delay(this.synthDelay, this.masterVolume, this.audiocontext),
            new ReverbAndDelay(ReverbType.type("SmallHexagon1"), 1, 0.5, this.masterVolume, this.audiocontext),
            new Vibrato(this.synthTremolo, this.masterVolume, this.audiocontext),
            new Tremolo(this.synthVibrato, this.masterVolume, this.audiocontext),
            new Compressor(-40, 20, 2, 0.0, 0.25, this.masterVolume, this.audiocontext)
        ]);


        //example for deactivating an effect - effects are switched on by creation, so if
        //the line is not commented out they are deactivated
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Filter"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Reverb"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Delay"));
        this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("ReverbAndDelay"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Vibrato"));
        //this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Tremolo"));
        this.effectChain.switchEffectOnOff(this.effectChain.getIndexOfEffect("Compressor"));
    }



    //change the master volume
    setVolume(volume){
        this.masterVolume.gain.value = volume;
    }

    //adds a sound if it isn't pressed yet. if it is already added then it does nothing
    addVoice(velocity, note) {
        if (typeof this.dictionary[note] == 'undefined') {

            let soundfragmentElements = document.querySelectorAll('synth-sound')
            let soundfragments = []

            for (let element of soundfragmentElements) {
                soundfragments.push(new Soundfragment(element, this.audiocontext))
            }

            this.soundfragments = soundfragments

            let adsrElement = document.querySelector('synth-adsr')
            var adsr = new ADSR(adsrElement);
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
