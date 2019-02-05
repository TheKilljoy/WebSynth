import SynthADSR from "../Components/SynthADSR.js"

//ADSR class contains ADSR settings
export default class ADSR {
    constructor(synthADSR) {
        this.attack = synthADSR.synthKnobAttack.value / 1000;
        this.delay = synthADSR.synthKnobDecay.value / 1000;
        this.sustain = synthADSR.synthKnobSustain.value / 100;
        this.release = synthADSR.synthKnobRelease.value / 1000;
    }
}
