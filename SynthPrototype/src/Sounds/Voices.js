import Soundfragment from "./Soundfragment.js";
import Sound from "./Sound.js";
import ADSR from "./ADSR.js";

//this class contains several sounds (each key you press represents a specific sound with a specific note)
//and checks if that note is already played. if it is played it does nothing, if it isn't played yet it adds it
//to an dictioniary so it can later be removed again, when the key is released
export default class Voices {
    constructor(audiocontext) {
        this.audiocontext = audiocontext;
        this.dictionary = {};
        this.masterVolume = audiocontext.createGain();
        this.masterVolume.connect(audiocontext.destination);
    }

    //change the master volume
    setVolume(volume){
        this.masterVolume.gain.value = volume;
    }

    //adds a sound if it isn't pressed yet. if it is already added then it does nothing
    addVoice(velocity, note) {
        if (typeof this.dictionary[note] == 'undefined') {
            ///////////////////this area is later extracted from the website /////////////////////
            var soundFrgmnt = new Soundfragment(12, 0.5, "triangle", this.audiocontext); 
            var soundFrgmnt2 = new Soundfragment(0, 1, "sine", this.audiocontext);
            var soundFrgmnt3 = new Soundfragment(24, 0.2, "triangle", this.audiocontext);
            var soundfragments = [soundFrgmnt, soundFrgmnt2, soundFrgmnt3];
            var adsr = new ADSR(0.1, 0.5, 0, 0.01);
            //////////////////////////////////////////////////////////////////////////////////////
            var s = new Sound(note, soundfragments, adsr, this.audiocontext);
            this.dictionary[note] = s;
            s.connectSoundTo(this.masterVolume);
            s.start(); //needs to be called before anything happens! see "sound.js"
            s.onPress(note, velocity);
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