import KeyboardInput from "./KeyboardInput.js";
import MidiKeyboardInput from "./MidiKeyboardInput.js";

//this class handles all different kinds of inputs to offer a common interface
export default class InputEventHandler {
    //create a custom event with custom properties. needs to be extended for e.q. "bends" (changing the played notes by a fraction of a note (cents))
    constructor() {
        this.target;
        //Create two events: one for a key down event and one for a key up event
        this.inputEventDown = new CustomEvent('inputeventdown', {
            note: 0,
            velocity: 0,
            bubbles: true, //needs to be true for it to reach it's destination
        });
        this.inputEventUp = new CustomEvent('inputeventup', {
            note: 0,
            bubbles: true, //needs to be true for it to reach it's destination
        });
    }
    //Register keyboardevents "keydown" and "keyup".
    //If a keyboard event is fired extract the information and 
    //give it to the custom event object. finally fires the custom event
    registerKeyboardEvents() {
        this.keyboardInput = new KeyboardInput(); //helps to transform the keyboard events into midi notes
        //Register all different events and let them bubble 
        document.addEventListener('keydown', (event) => { 
            //set values
            this.inputEventDown.note = this.keyboardInput.getNote(event.key);
            this.inputEventDown.velocity = this.keyboardInput.getVelocity();
            //bubble to target event
            event.target.dispatchEvent(this.inputEventDown); //fires custom event
        });

        document.addEventListener('keyup', (event) => {
            //set value
            this.inputEventUp.note = this.keyboardInput.getNote(event.key);
            //bubble to target event
            event.target.dispatchEvent(this.inputEventUp); //fires custom event
        });
    }

    //extracts the midi-event information and sends it to the custom event object
    //finally fires the custom event
    registerMidiEvents(){
        this.midiKeyboardInput = new MidiKeyboardInput(); //do all the midi registration stuff 
        //this lambda function is mapped to be executed if a midi-event is fired
        this.midiKeyboardInput.setOnMidiMessage(() => {
            if(event.data[0] >> 4 == 9){ //9 = keydown             
                this.inputEventDown.note = event.data[1];
                this.inputEventDown.velocity = event.data[2];
                document.dispatchEvent(this.inputEventDown); //fire custom event
            }else if(event.data[0] >> 4 == 8){ // 8 = keyup
                this.inputEventUp.note = event.data[1];
                document.dispatchEvent(this.inputEventUp); //fire custom event
            }
        })
    }

    //register a function to  be executed if this custom event is fired. 
    //the "event" object has the "note" and "velocity" properties defined while
    //creating the custom event in the constructor of this class
    addDownEventBehaviour(func) {
        document.addEventListener('inputeventdown', (event) => {
            func(event);
        });
    }
    //register a function to  be executed if this custom event is fired. 
    addUpEventBehaviour(func) {
        document.addEventListener('inputeventup', (event) => {
            func(event);
        });
    }
}