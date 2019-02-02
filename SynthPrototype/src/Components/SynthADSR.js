export default class SynthADSR extends HTMLElement {
    constructor() {
        super()

        const shadowRoot = this.attachShadow({mode: 'open'}).innerHTML = this.template()

        this.synthKnobAttack = this.shadowRoot.querySelectorAll('synth-knob')[0]
        this.synthKnobDecay = this.shadowRoot.querySelectorAll('synth-knob')[1]
        this.synthKnobSustain = this.shadowRoot.querySelectorAll('synth-knob')[2]
        this.synthKnobRelease = this.shadowRoot.querySelectorAll('synth-knob')[3]
    }

    template() {
        const html = String.raw

        return html`
        <synth-module>
            <synth-knob>Attack</synth-knob>
            <synth-knob>Decay</synth-knob>
            <synth-knob>Sustain</synth-knob>
            <synth-knob>Release</synth-knob>
        </synth-module>
        `
    }
}

customElements.define('synth-adsr', SynthADSR)
