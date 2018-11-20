var midiAccess;
var isDone = false;

export default class MidiKeyboardInput
{
    constructor()
    {
        
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess().then(
                this.midiSuccess,
                this.midiFailure
            );
        } else {
            console.log("Browser doesn't support Midi Access. Try Google Chrome.");
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