import KeyboardInput from "./KeyboardInput.js";
import MidiKeyboardInput from "./MidiKeyboardInput.js";

export default class InputEventHandler {
    constructor() {
        this.target;
        //Create two events: one for a key down event and one for a key up event
        this.inputEventDown = new CustomEvent('inputeventdown', {
            note: 0,
            velocity: 0,
            bubbles: true,
        });
        this.inputEventUp = new CustomEvent('inputeventup', {
            note: 0,
            bubbles: true,
        });
    }

    registerKeyboardEvents() {
        this.keyboardInput = new KeyboardInput(); //helps to transform the keyboard events into midi notes
        //Register all different events and let them bubble 
        document.addEventListener('keydown', (event) => { 
            //set values
            this.inputEventDown.note = this.keyboardInput.getNote(event.key);
            this.inputEventDown.velocity = this.keyboardInput.getVelocity();
            //bubble to target event
            event.target.dispatchEvent(this.inputEventDown);
        });

        document.addEventListener('keyup', (event) => {
            //set value
            this.inputEventUp.note = this.keyboardInput.getNote(event.key);
            //bubble to target event
            event.target.dispatchEvent(this.inputEventUp);
        });
    }

    registerMidiEvents(){
        this.midiKeyboardInput = new MidiKeyboardInput();
        
        this.midiKeyboardInput.setOnMidiMessage(() => {
            if(event.data[0] >> 4 == 9){ //9 = keydown             
                this.inputEventDown.note = event.data[1];
                this.inputEventDown.velocity = event.data[2];
                event.target.value = this.target;
                event.target.dispatchEvent(this.inputEventDown);
            }else if(event.data[0] >> 4 == 8){ // 8 = keyup
                this.inputEventUp.note = event.data[1];
                event.target.dispatchEvent(this.inputEventUp);
            }
        })
    }

    addDownEventBehaviour(func) {
        document.addEventListener('inputeventdown', (event) => {
            func(event);
        });
    }

    addUpEventBehaviour(func) {
        document.addEventListener('inputeventup', (event) => {
            func(event);
        });
    }
}