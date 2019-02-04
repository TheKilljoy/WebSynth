var midiAccess;
var isDone = false;

//this class registers midievents to a custom function
//acts as "interface" for the inputeventhandler
export default class MidiKeyboardInput
{
    //check if midi is supported, if yes do "this.midiSuccess", if not do "this.midiFailure"
    constructor()
    {

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then( //a javascript promise, look it up if you don't know what it does
                this.midiSuccess,
                this.midiFailure
            );
        } else {
            // console.log("Browser doesn't support Midi Access. Try Google Chrome.");
        }
    }

    midiSuccess(midi)
    {
        console.log("midi is working");
            midiAccess = midi;
            isDone =  true;
         //for (var input of midiAccess.inputs.values()) {
             //input.onmidimessage = function(){console.log("midi")};
        // }
    }

    midiFailure() {
        console.log("Browser doesn't support Midi Access. Try Google Chrome.");
    }

    //this method waits a second before it executes itself, because we have to wait until the promise is executed as "midiAccess"
    //is not initialized before "midiSuccess" is executed
    //after waiting it sets the function "func" given to be executed when a midimessage event is fired
    setOnMidiMessage(func){
        if(!isDone){ //not a good solution, but you have to wait until midi is loaded before setting events
            setTimeout(function(){
                for (var input of midiAccess.inputs.values()) {
                    input.onmidimessage = func;
                }
            }, 1000)
            isDone = true;
        };
    }
}
