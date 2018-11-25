//ADSR class contains ADSR settings
export default class ADSR {
    constructor(a, d, s, r) {
        this.attack = a;
        this.delay = d;
        this.sustain = s;
        this.release = r;
    }
}